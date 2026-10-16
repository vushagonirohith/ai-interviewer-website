"use client";

import { createElement, useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MOTION_OK, ease } from "@/lib/motion";

/** Heading whose lines rise out of a mask as it scrolls into view. */
export function SplitHeading({
  as = "h2",
  children,
  className = "",
  start = "top 85%",
}: {
  as?: "h1" | "h2" | "h3" | "p";
  children: ReactNode;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(ref.current!, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.15,
              ease: ease.out,
              stagger: 0.09,
              scrollTrigger: { trigger: ref.current, start, once: true },
            });
          },
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return createElement(as, { ref, className }, children);
}
