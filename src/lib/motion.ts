// Shared motion language. Every animated component runs its motion inside
// gsap.matchMedia(MOTION_OK) so visitors who prefer reduced motion get the
// final, fully visible state with no movement.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED = "(prefers-reduced-motion: reduce)";
export const DESKTOP = "(min-width: 1024px)";

export const ease = {
  out: "expo.out",
  inOut: "power3.inOut",
  soft: "power2.out",
} as const;

export const duration = {
  fast: 0.5,
  base: 0.9,
  slow: 1.3,
} as const;
