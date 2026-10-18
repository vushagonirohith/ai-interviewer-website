"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK } from "@/lib/motion";

/**
 * A section's coloured surface, drawn as a layer behind its content. As the
 * section scrolls in, the surface rises as an inset, rounded sheet and widens
 * to full bleed, so a change of colour reads as a new page being laid down.
 * Only this layer is clipped, never the content (pinned scenes stay safe).
 * The parent section needs `relative isolate`.
 */
export function Sheet({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(0% 3.5% 0% 3.5% round 56px 56px 0px 0px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)",
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 20%", scrub: true },
        },
      );
    });
  });

  return <div ref={ref} aria-hidden className={`absolute inset-0 -z-10 ${className}`} />;
}
