"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK, ease } from "@/lib/motion";

/**
 * Fades and lifts content in as it enters the viewport. Children marked with
 * `data-reveal` animate in sequence; otherwise the wrapper animates as one.
 */
export function Reveal({
  children,
  className = "",
  y = 36,
  stagger = 0.09,
  delay = 0,
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = ref.current!;
        const items = el.querySelectorAll("[data-reveal]");
        gsap.from(items.length ? items : el, {
          y,
          autoAlpha: 0,
          duration: 1,
          ease: ease.out,
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
