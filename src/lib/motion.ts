// Shared motion language. Every animated component runs its motion inside
// gsap.matchMedia(MOTION_OK) so visitors who prefer reduced motion get the
// final, fully visible state with no movement.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED = "(prefers-reduced-motion: reduce)";
export const DESKTOP = "(min-width: 1024px)";
// Hover-capable mouse or trackpad: pointer-driven effects stay off touch screens.
export const POINTER_FINE = "(hover: hover) and (pointer: fine)";

export const ease = {
  out: "expo.out",
  inOut: "power3.inOut",
  soft: "power2.out",
  // Emphasis wipes: slow start, decisive finish.
  wipe: "power4.inOut",
  // Pieces settling into place.
  build: "power4.out",
} as const;

export const duration = {
  fast: 0.5,
  base: 0.9,
  slow: 1.3,
} as const;

// Clip-path insets used for left-to-right wipes. Negative edges leave room
// for italic overhang and descenders so glyphs are never shaved.
export const wipe = {
  hidden: "inset(-20% 105% -25% -6%)",
  shown: "inset(-20% -8% -25% -6%)",
} as const;
