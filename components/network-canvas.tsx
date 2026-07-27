"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * A WebGL field whose motion represents what the page is about.
 *
 *   mesh    peers drifting and linking — the network itself
 *   escrow  nodes orbiting a held centre — funds locked while a trade runs
 *   layers  nodes in bands sliding past each other — the protocol stack
 *
 * All three share one renderer and differ only in how nodes are placed and
 * stepped, so a variant costs nothing extra. Nodes are tinted along the brand
 * gradient (blue to teal) by depth.
 *
 * Cost control, because this sits above the fold on the most-indexed page:
 *   - imported dynamically, so three.js is its own chunk and never delays
 *     first paint or the LCP heading
 *   - only mounts once scrolled into view, pauses offscreen and on tab hide
 *   - renders exactly one static frame under prefers-reduced-motion
 *   - node count scales down on small viewports
 */

const LINK_DISTANCE = 130;
const CURSOR_RADIUS = 170;
const LEAN = 0.16;
const DRIFT = 0.28;

/** Max line segments we allocate room for; excess pairs are simply skipped. */
const MAX_SEGMENTS = 400;

const DOT_BLUE = new THREE.Color("#58a6ff");
const DOT_TEAL = new THREE.Color("#00b098");
const LINE_COLOR = new THREE.Color("#00b098");

export type FieldVariant = "mesh" | "escrow" | "layers";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
  /** Orbit parameters, used by the escrow variant. */
  angle: number;
  radius: number;
  speed: number;
  /** Band index, used by the layers variant. */
  band: number;
};

function nodeCount(width: number) {
  if (width < 640) return 14;
  if (width < 1024) return 22;
  return 32;
}

export function NetworkCanvas({
  className,
  variant = "mesh",
}: {
  className?: string;
  variant?: FieldVariant;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mounted = hostRef.current;
    if (!mounted) return;
    // Explicitly typed so the closures below (which are hoisted) do not lose
    // the null-narrowing done here.
    const host: HTMLDivElement = mounted;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const cursorEnabled = finePointer && !reduceMotion;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      // No WebGL: the CSS dotted grid behind this is the fallback.
      return;
    }

    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    // Pixel-space orthographic camera: one world unit is one CSS pixel.
    const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -100, 100);

    let width = 1;
    let height = 1;
    let nodes: Node[] = [];

    // --- Nodes ---------------------------------------------------------
    const dotGeometry = new THREE.BufferGeometry();
    const dotMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uScale: { value: 1 } },
      vertexShader: `
        attribute float size;
        attribute vec3 tint;
        attribute float alpha;
        varying vec3 vTint;
        varying float vAlpha;
        uniform float uScale;
        void main() {
          vTint = tint;
          vAlpha = alpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uScale;
        }
      `,
      fragmentShader: `
        varying vec3 vTint;
        varying float vAlpha;
        void main() {
          // Soft round dot with a slightly hot centre.
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float edge = smoothstep(0.5, 0.12, d);
          gl_FragColor = vec4(vTint, edge * vAlpha);
        }
      `,
    });
    const points = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(points);

    // --- Links ---------------------------------------------------------
    const linePositions = new Float32Array(MAX_SEGMENTS * 2 * 3);
    const lineAlphas = new Float32Array(MAX_SEGMENTS * 2);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    lineGeometry.setAttribute(
      "alpha",
      new THREE.BufferAttribute(lineAlphas, 1),
    );
    const lineMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      uniforms: { uColor: { value: LINE_COLOR } },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() { gl_FragColor = vec4(uColor, vAlpha); }
      `,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const cursor = { x: -9999, y: -9999, active: false };

    function buildNodes() {
      const count = nodeCount(width);
      const bands = 4;
      nodes = Array.from({ length: count }, (_, index) => {
        const band = index % bands;
        return {
          x: Math.random() * width,
          // The layers variant seeds nodes onto evenly spaced bands.
          y:
            variant === "layers"
              ? ((band + 0.5) / bands) * height + (Math.random() - 0.5) * 18
              : Math.random() * height,
          vx: (Math.random() - 0.5) * DRIFT,
          vy: (Math.random() - 0.5) * DRIFT,
          depth: Math.random(),
          angle: Math.random() * Math.PI * 2,
          radius: 0.18 + Math.random() * 0.32,
          // Alternating direction keeps the orbit from looking like a dial.
          speed: (0.0016 + Math.random() * 0.0022) * (index % 2 ? 1 : -1),
          band,
        };
      });

      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const tints = new Float32Array(count * 3);
      const alphas = new Float32Array(count);
      const colour = new THREE.Color();

      for (let i = 0; i < count; i++) {
        const node = nodes[i];
        sizes[i] = 3 + node.depth * 4;
        alphas[i] = 0.35 + node.depth * 0.4;
        // Depth reads as the brand gradient: near nodes blue, far nodes teal.
        colour.copy(DOT_TEAL).lerp(DOT_BLUE, node.depth);
        tints[i * 3] = colour.r;
        tints[i * 3 + 1] = colour.g;
        tints[i * 3 + 2] = colour.b;
      }

      dotGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      dotGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      dotGeometry.setAttribute("tint", new THREE.BufferAttribute(tints, 3));
      dotGeometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    }

    function resize(rescatter: boolean) {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      renderer.setSize(width, height, false);
      camera.left = 0;
      camera.right = width;
      camera.top = 0;
      camera.bottom = height;
      camera.updateProjectionMatrix();
      dotMaterial.uniforms.uScale.value = renderer.getPixelRatio();

      if (rescatter || nodes.length !== nodeCount(width)) {
        buildNodes();
      } else {
        for (const node of nodes) {
          node.x = Math.min(node.x, width);
          node.y = Math.min(node.y, height);
        }
      }
    }

    function step() {
      if (variant === "escrow") return stepEscrow();
      if (variant === "layers") return stepLayers();

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) {
          node.x = 0;
          node.vx *= -1;
        } else if (node.x > width) {
          node.x = width;
          node.vx *= -1;
        }
        if (node.y < 0) {
          node.y = 0;
          node.vy *= -1;
        } else if (node.y > height) {
          node.y = height;
          node.vy *= -1;
        }

        if (cursor.active) {
          const dx = cursor.x - node.x;
          const dy = cursor.y - node.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_RADIUS && dist > 0.01) {
            const force = (1 - dist / CURSOR_RADIUS) * LEAN;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
          }
        }
      }
    }

    /** Funds held at a centre while participants circle it. */
    function stepEscrow() {
      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height);
      for (const node of nodes) {
        node.angle += node.speed;
        const r = node.radius * scale * (0.75 + node.depth * 0.5);
        node.x = cx + Math.cos(node.angle) * r * 1.35;
        node.y = cy + Math.sin(node.angle) * r;

        if (cursor.active) {
          // The cursor pulls the orbit open rather than dragging nodes.
          const dx = node.x - cursor.x;
          const dy = node.y - cursor.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_RADIUS && dist > 0.01) {
            const force = (1 - dist / CURSOR_RADIUS) * LEAN * 6;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
          }
        }
      }
    }

    /** Protocol layers: bands sliding past one another. */
    function stepLayers() {
      const bands = 4;
      for (const node of nodes) {
        const direction = node.band % 2 === 0 ? 1 : -1;
        node.x += direction * (0.18 + node.depth * 0.22);
        if (node.x > width + 20) node.x = -20;
        if (node.x < -20) node.x = width + 20;

        const target = ((node.band + 0.5) / bands) * height;
        // Ease back to the band so a resize does not scatter them.
        node.y += (target - node.y) * 0.05;
      }
    }

    function syncGeometry() {
      const position = dotGeometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      for (let i = 0; i < nodes.length; i++) {
        position.setXYZ(i, nodes[i].x, nodes[i].y, 0);
      }
      position.needsUpdate = true;

      // Links are drawn only around the cursor, so the field stays calm at
      // rest and costs nothing on touch devices.
      let segment = 0;
      if (cursor.active) {
        const near: Node[] = [];
        for (const node of nodes) {
          const dist = Math.hypot(node.x - cursor.x, node.y - cursor.y);
          if (dist >= CURSOR_RADIUS) continue;
          near.push(node);
          if (segment < MAX_SEGMENTS) {
            const alpha = 0.5 * (1 - dist / CURSOR_RADIUS);
            writeSegment(segment++, node.x, node.y, cursor.x, cursor.y, alpha);
          }
        }
        for (let i = 0; i < near.length && segment < MAX_SEGMENTS; i++) {
          for (let j = i + 1; j < near.length && segment < MAX_SEGMENTS; j++) {
            const a = near[i];
            const b = near[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist >= LINK_DISTANCE) continue;
            const alpha = 0.4 * (1 - dist / LINK_DISTANCE);
            writeSegment(segment++, a.x, a.y, b.x, b.y, alpha);
          }
        }
      }

      lineGeometry.setDrawRange(0, segment * 2);
      lineGeometry.getAttribute("position").needsUpdate = true;
      lineGeometry.getAttribute("alpha").needsUpdate = true;
    }

    function writeSegment(
      index: number,
      ax: number,
      ay: number,
      bx: number,
      by: number,
      alpha: number,
    ) {
      const offset = index * 6;
      linePositions[offset] = ax;
      linePositions[offset + 1] = ay;
      linePositions[offset + 2] = 0;
      linePositions[offset + 3] = bx;
      linePositions[offset + 4] = by;
      linePositions[offset + 5] = 0;
      lineAlphas[index * 2] = alpha;
      lineAlphas[index * 2 + 1] = alpha;
    }

    function draw() {
      syncGeometry();
      renderer.render(scene, camera);
    }

    let rafId = 0;
    let running = false;
    let onscreen = true;
    let visible = !document.hidden;

    function loop() {
      step();
      draw();
      rafId = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduceMotion || !onscreen || !visible) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }

    resize(true);
    draw(); // one frame always, which is also the reduced-motion end state

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize(false);
        if (!running) draw();
      }, 150);
    }
    window.addEventListener("resize", onResize);

    function onPointerMove(event: PointerEvent) {
      const rect = host.getBoundingClientRect();
      cursor.x = event.clientX - rect.left;
      cursor.y = event.clientY - rect.top;
      cursor.active = true;
    }
    function onPointerOut() {
      cursor.active = false;
      cursor.x = -9999;
      cursor.y = -9999;
    }
    if (cursorEnabled) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerout", onPointerOut, { passive: true });
    }

    function onVisibility() {
      visible = !document.hidden;
      if (visible) start();
      else stop();
    }
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onscreen = entry.isIntersecting;
          if (onscreen) start();
          else stop();
        }
      },
      { threshold: 0 },
    );
    observer.observe(host);

    start();

    return () => {
      stop();
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (cursorEnabled) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerout", onPointerOut);
      }
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();

      dotGeometry.dispose();
      dotMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    />
  );
}
