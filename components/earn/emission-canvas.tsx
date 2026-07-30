"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * The reward model as a picture: one epoch's emission, dividing.
 *
 * A hairline band across the top carries a *fixed* number of particles. They
 * detach, fall, and are absorbed by the nodes below in proportion to each
 * node's weight; on absorption a particle respawns on the band. The particle
 * count never changes, which is the entire point — emission per epoch is
 * fixed, so a node earning more is always a node taking a larger share of
 * the same pool rather than one causing more to exist. Any hero that showed
 * the field growing would be illustrating a protocol this one is not.
 *
 * The second thing it encodes is attenuation. A node's brightness is its
 * quality multiplier, which is a product of three fractions each at most 1.0,
 * so nodes range from full blue down through dimmed teal and nothing is ever
 * brighter than the band that feeds it.
 *
 * Cost control, matching `network-canvas.tsx` because this sits above the
 * fold and three.js is the largest thing this route ships:
 *   - imported dynamically by `emission-field.tsx`, and only once the hero
 *     has actually intersected the viewport, so the chunk never loads on a
 *     route that has no hero to draw
 *   - pauses when scrolled out of view and when the tab is hidden
 *   - under prefers-reduced-motion, draws one composed still frame with the
 *     particles spread along their paths — a photograph of the flow, not a
 *     slowed-down version of it
 *   - particle and node counts scale down on small viewports
 *   - falls through to the CSS dotted grid behind it when WebGL is absent
 */

/** Fixed emission: the particle budget, which is never added to. */
function particleCount(width: number) {
  if (width < 640) return 44;
  if (width < 1024) return 78;
  return 120;
}

function nodeCount(width: number) {
  if (width < 640) return 7;
  if (width < 1024) return 10;
  return 14;
}

/* Brand gradient. Blue is a node at full quality, teal one attenuated by the
   multipliers — the same depth-to-hue mapping the network field uses, re-keyed
   so hue carries a quantity rather than distance. */
const FULL = new THREE.Color("#8ec4ff");
const ATTENUATED = new THREE.Color("#00b098");
const BAND = new THREE.Color("#0070f8");

type Particle = {
  /** Progress along its path, 0 at the band and 1 at its target node. */
  t: number;
  speed: number;
  /** Index into `nodes`. */
  target: number;
  /** Where on the band it left from — inside its target's own segment. */
  originX: number;
};

/**
 * Where in the canvas the diagram is drawn.
 *
 * The hero's text occupies a 680px measure on the start side and the shared
 * dotted grid already shifts to `start-1/2` on large viewports; a full-bleed
 * diagram would sit half-underneath the headline and read as wallpaper. On a
 * wide screen this puts it in the empty half instead, where it can be the
 * memorable element rather than a texture. Narrow screens have no empty half,
 * so it spans the width and sits behind the text at low contrast, which is
 * how every other hero on this site behaves.
 */
type Region = { x0: number; x1: number; bandY: number; y0: number; y1: number };

function regionFor(width: number, height: number): Region {
  const wide = width >= 1024;
  return {
    x0: wide ? width * 0.5 : width * 0.06,
    x1: wide ? width * 0.97 : width * 0.94,
    bandY: height * 0.15,
    y0: height * 0.66,
    y1: height * 0.84,
  };
}

type EmissionNode = {
  x: number;
  y: number;
  /** Share of the pool this node draws, summing to 1 across all nodes. */
  weight: number;
  /** Quality multiplier in 0..1 — drives hue and brightness, never size. */
  quality: number;
  /** Its slice of the band, as fractions of the band's length. */
  segmentStart: number;
  segmentEnd: number;
};

export function EmissionCanvas({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mounted = hostRef.current;
    if (!mounted) return;
    // Explicitly typed so the hoisted closures below keep the null-narrowing.
    const host: HTMLDivElement = mounted;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      // No WebGL: the dotted grid painted behind this is the fallback.
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
    let region: Region = regionFor(1, 1);
    let particles: Particle[] = [];
    let nodes: EmissionNode[] = [];

    /* One shader serves both point clouds: a soft round dot with a hot
       centre, tinted and faded per vertex. `uScale` carries device pixel
       ratio, because gl_PointSize is in device pixels while everything else
       here is in CSS pixels. */
    function dotMaterial() {
      return new THREE.ShaderMaterial({
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
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float edge = smoothstep(0.5, 0.1, d);
            gl_FragColor = vec4(vTint, edge * vAlpha);
          }
        `,
      });
    }

    const grainGeometry = new THREE.BufferGeometry();
    const grainMaterial = dotMaterial();
    scene.add(new THREE.Points(grainGeometry, grainMaterial));

    const nodeGeometry = new THREE.BufferGeometry();
    const nodeMaterial = dotMaterial();
    scene.add(new THREE.Points(nodeGeometry, nodeMaterial));

    /* The band itself: a hairline, drawn as one segment, standing for the
       epoch's pool before it is divided. */
    const bandPositions = new Float32Array(6);
    const bandGeometry = new THREE.BufferGeometry();
    bandGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(bandPositions, 3),
    );
    const bandMaterial = new THREE.LineBasicMaterial({
      color: BAND,
      transparent: true,
      opacity: 0.75,
    });
    scene.add(new THREE.LineSegments(bandGeometry, bandMaterial));

    function build() {
      const count = nodeCount(width);
      region = regionFor(width, height);
      const span = region.x1 - region.x0;

      /* Weights are drawn once and then fixed. They are decorative — this
         canvas is aria-hidden and reads no protocol state — but they are
         shaped like real ones: a long tail of small nodes and a few larger,
         which is what a stake distribution looks like. */
      const raw = Array.from(
        { length: count },
        () => 0.15 + Math.random() ** 2,
      );
      const total = raw.reduce((sum, w) => sum + w, 0);

      /*
       * The band is partitioned, not sampled. Each node owns a contiguous
       * slice of it whose length is its weight, and its particles can only
       * come from that slice — so a heavier node is fed by a wider piece of
       * the same fixed line, and the picture divides rather than multiplies.
       * Nodes sit under the centre of their own slice, which turns each
       * stream into a visible fan from a segment to a point.
       */
      let cursor = 0;
      nodes = raw.map((w) => {
        const weight = w / total;
        const segmentStart = cursor;
        cursor += weight;
        return {
          x: region.x0 + (segmentStart + weight / 2) * span,
          // A shallow row rather than a cloud: these are destinations, and a
          // node scattered over a third of the hero reads as more emission.
          y: region.y0 + Math.random() * (region.y1 - region.y0),
          weight,
          // Quality is a product of three factors each at most 1.0, so the
          // realistic spread is skewed toward the top without reaching it.
          quality: 0.28 + Math.random() ** 1.6 * 0.72,
          segmentStart,
          segmentEnd: cursor,
        };
      });

      const nodePositions = new Float32Array(count * 3);
      const nodeSizes = new Float32Array(count);
      const nodeTints = new Float32Array(count * 3);
      const nodeAlphas = new Float32Array(count);
      const colour = new THREE.Color();

      for (let i = 0; i < count; i++) {
        const node = nodes[i];
        nodePositions[i * 3] = node.x;
        nodePositions[i * 3 + 1] = node.y;
        // Size carries stake, brightness carries quality: two factors, two
        // channels, so neither is mistaken for the other.
        nodeSizes[i] = 7 + node.weight * count * 7;
        nodeAlphas[i] = 0.45 + node.quality * 0.5;
        colour.copy(ATTENUATED).lerp(FULL, node.quality);
        nodeTints[i * 3] = colour.r;
        nodeTints[i * 3 + 1] = colour.g;
        nodeTints[i * 3 + 2] = colour.b;
      }

      nodeGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(nodePositions, 3),
      );
      nodeGeometry.setAttribute(
        "size",
        new THREE.BufferAttribute(nodeSizes, 1),
      );
      nodeGeometry.setAttribute(
        "tint",
        new THREE.BufferAttribute(nodeTints, 3),
      );
      nodeGeometry.setAttribute(
        "alpha",
        new THREE.BufferAttribute(nodeAlphas, 1),
      );

      const grains = particleCount(width);
      particles = Array.from({ length: grains }, (_, index) => ({
        // Spread across the whole path at build time. That is what makes the
        // reduced-motion still frame a composition rather than a row of dots
        // waiting on the band.
        t: (index + 0.5) / grains,
        speed: 0.0028 + Math.random() * 0.0032,
        ...spawn(),
      }));

      const grainPositions = new Float32Array(grains * 3);
      const grainSizes = new Float32Array(grains);
      const grainTints = new Float32Array(grains * 3);
      const grainAlphas = new Float32Array(grains);
      for (let i = 0; i < grains; i++) {
        grainSizes[i] = 2.6 + Math.random() * 2.2;
        grainAlphas[i] = 0;
        grainTints[i * 3] = BAND.r;
        grainTints[i * 3 + 1] = BAND.g;
        grainTints[i * 3 + 2] = BAND.b;
      }
      grainGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(grainPositions, 3),
      );
      grainGeometry.setAttribute(
        "size",
        new THREE.BufferAttribute(grainSizes, 1),
      );
      grainGeometry.setAttribute(
        "tint",
        new THREE.BufferAttribute(grainTints, 3),
      );
      grainGeometry.setAttribute(
        "alpha",
        new THREE.BufferAttribute(grainAlphas, 1),
      );

      bandPositions[0] = region.x0;
      bandPositions[1] = region.bandY;
      bandPositions[3] = region.x1;
      bandPositions[4] = region.bandY;
      bandGeometry.getAttribute("position").needsUpdate = true;
    }

    /**
     * Picks a point on the band uniformly and returns both where it is and
     * which node owns it.
     *
     * One roll for both is the whole trick. Because the segments partition
     * the band exactly, a uniform position lands in a node's slice with
     * probability equal to its weight — so proportional allocation falls out
     * of the geometry instead of being imposed on top of it, and the two can
     * never drift apart.
     */
    function spawn(): { target: number; originX: number } {
      const roll = Math.random();
      const span = region.x1 - region.x0;
      for (let i = 0; i < nodes.length; i++) {
        if (roll < nodes[i].segmentEnd || i === nodes.length - 1) {
          return { target: i, originX: region.x0 + roll * span };
        }
      }
      return { target: 0, originX: region.x0 };
    }

    function resize(rebuild: boolean) {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      renderer.setSize(width, height, false);
      camera.left = 0;
      camera.right = width;
      camera.top = 0;
      camera.bottom = height;
      camera.updateProjectionMatrix();
      const scale = renderer.getPixelRatio();
      grainMaterial.uniforms.uScale.value = scale;
      nodeMaterial.uniforms.uScale.value = scale;

      if (rebuild || particles.length !== particleCount(width)) build();
    }

    function step() {
      for (const particle of particles) {
        particle.t += particle.speed;
        if (particle.t < 1) continue;
        // Absorbed. It respawns on the band immediately, so the budget in
        // flight is constant — nothing is created and nothing is destroyed.
        particle.t -= 1;
        Object.assign(particle, spawn());
      }
    }

    function syncGeometry() {
      const position = grainGeometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      const alpha = grainGeometry.getAttribute(
        "alpha",
      ) as THREE.BufferAttribute;
      const tint = grainGeometry.getAttribute("tint") as THREE.BufferAttribute;
      const colour = new THREE.Color();

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const node = nodes[particle.target];
        if (!node) continue;

        // Ease-in so particles hang on the band and then commit, which reads
        // as allocation rather than rainfall.
        const t = particle.t * particle.t * (3 - 2 * particle.t);
        const x = particle.originX + (node.x - particle.originX) * t;
        const y = region.bandY + (node.y - region.bandY) * t;
        position.setXYZ(i, x, y, 0);

        // Fades in off the band and out into the node, so neither endpoint
        // has a hard edge.
        alpha.setX(i, Math.sin(particle.t * Math.PI) * 0.95);
        // Takes the node's hue as it approaches: the emission is undivided
        // and uniform until it is claimed by something with a quality.
        colour
          .copy(BAND)
          .lerp(new THREE.Color().copy(ATTENUATED).lerp(FULL, node.quality), t);
        tint.setXYZ(i, colour.r, colour.g, colour.b);
      }

      position.needsUpdate = true;
      alpha.needsUpdate = true;
      tint.needsUpdate = true;
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
    draw(); // The still frame, which is also the reduced-motion end state.

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize(true);
        if (!running) draw();
      }, 150);
    }
    window.addEventListener("resize", onResize);

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
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();

      grainGeometry.dispose();
      grainMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      bandGeometry.dispose();
      bandMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    />
  );
}
