"use client";

import dynamic from "next/dynamic";
import type { FieldVariant } from "./network-canvas";

/**
 * Loads the WebGL field as its own chunk. `ssr: false` keeps three.js out of
 * the server render and off the critical path, so the LCP element stays the
 * hero heading rather than a canvas.
 */
const NetworkCanvas = dynamic(
  () => import("./network-canvas").then((m) => m.NetworkCanvas),
  { ssr: false },
);

export function NetworkField({
  className,
  variant = "mesh",
}: {
  className?: string;
  variant?: FieldVariant;
}) {
  return <NetworkCanvas className={className} variant={variant} />;
}
