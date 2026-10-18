"use client";

import { createElement, useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MOTION_OK, ease, wipe } from "@/lib/motion";

/**
 * How the plain text of a heading arrives:
 * - "rise":  whole lines lift out of a mask. Calm, editorial.
 * - "words": words tip up out of their lines one after another. Energetic.
 * - "focus": words sharpen out of a blur. Quiet, for trust and closing moments.
 */
export type HeadingVariant = "rise" | "words" | "focus";

/**
 * Heading revealed as it scrolls into view. Any descendant marked `data-emph`
 * is held back and wiped in as a second beat once the rest has landed, so the
 * key phrase is read last and remembered.
 */
export function SplitHeading({
  as = "h2",
  variant = "rise",
  children,
  className = "",
  start = "top 85%",
  id,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  variant?: HeadingVariant;
  children: ReactNode;
  className?: string;
  start?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = ref.current!;
        // autoSplit re-runs onSplit when fonts load or the width changes. Once
        // the reveal has played, later re-splits must not replay it.
        let played = false;
        const split = SplitText.create(el, {
          type: "lines,words",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            if (played) return;
            const emph = self.words.filter((w) => w.closest("[data-emph]"));
            const plain = self.words.filter((w) => !emph.includes(w));
            const tl = gsap.timeline({
              scrollTrigger: { trigger: el, start, once: true },
              onStart: () => void (played = true),
            });

            if (variant === "rise") {
              tl.from(self.lines, { yPercent: 115, duration: 1.15, ease: ease.out, stagger: 0.09 });
            } else if (variant === "words") {
              tl.from(plain, {
                yPercent: 120,
                rotate: 7,
                transformOrigin: "0% 100%",
                duration: 1,
                ease: ease.out,
                stagger: 0.04,
              });
            } else {
              tl.from(plain, {
                autoAlpha: 0,
                y: 14,
                filter: "blur(12px)",
                duration: 1.2,
                ease: ease.soft,
                stagger: 0.06,
                clearProps: "filter",
              });
            }

            if (emph.length) {
              tl.fromTo(
                emph,
                { clipPath: wipe.hidden },
                { clipPath: wipe.shown, duration: 0.9, ease: ease.wipe, stagger: 0.14, clearProps: "clipPath" },
                variant === "rise" ? "-=0.5" : "-=0.35",
              );
            }
            return tl;
          },
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return createElement(as, { ref, className, id }, children);
}
