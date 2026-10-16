"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MOTION_OK } from "@/lib/motion";
import { Reveal } from "@/components/animation/Reveal";

const truths = [
  {
    title: "Reading isn't rehearsing.",
    body: "Notes and videos build knowledge. They don't train you to explain it on the spot, in your own words.",
  },
  {
    title: "Practice without feedback is guesswork.",
    body: "If nobody tells you which points you missed, the next attempt quietly repeats the same gaps.",
  },
  {
    title: "One score hides the story.",
    body: "“That went badly” isn't a plan. You need to know which skill is weak, and how sure anyone is.",
  },
];

export function Problem() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-problem-text]", { type: "words", wordsClass: "will-change-[opacity]" });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-problem-text]",
              start: "top 78%",
              end: "bottom 42%",
              scrub: true,
            },
          },
        );
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="problem-title" className="relative py-28 sm:py-36 lg:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-ember">01</span>
          <span aria-hidden className="h-px w-8 bg-white/20" />
          The problem
        </p>

        <h2
          id="problem-title"
          data-problem-text
          className="mt-8 max-w-6xl font-serif text-[2.5rem] leading-[1.05] tracking-[-0.01em] text-balance sm:text-6xl lg:text-[5.4rem]"
        >
          Knowing the answer is one thing. Saying it out loud, clearly, while someone asks{" "}
          <em className="text-ember">&ldquo;and why?&rdquo;</em> is another.
        </h2>

        <Reveal className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-3">
          {truths.map((t, i) => (
            <div key={t.title} data-reveal className="bg-night p-7 sm:p-9">
              <span className="font-mono text-xs text-fog">0{i + 1}</span>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{t.title}</h3>
              <p className="mt-3 leading-relaxed text-mist">{t.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
