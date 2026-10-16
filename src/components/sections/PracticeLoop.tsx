"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DESKTOP, MOTION_OK, ease } from "@/lib/motion";
import { SectionIntro } from "@/components/animation/SectionIntro";

const progression = [
  { label: "Interview 1", level: 38, confidence: "Low", color: "bg-ember-deep" },
  { label: "Interview 3", level: 54, confidence: "Medium", color: "bg-honey" },
  { label: "Interview 6", level: 71, confidence: "High", color: "bg-sage" },
];

export function PracticeLoop() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-stage]", {
          y: 60,
          autoAlpha: 0,
          duration: 1.1,
          ease: ease.out,
          stagger: 0.18,
          scrollTrigger: { trigger: "[data-stages]", start: "top 75%", once: true },
        });
        gsap.from("[data-level-bar]", {
          scaleX: 0,
          duration: 1.2,
          ease: ease.out,
          stagger: 0.2,
          scrollTrigger: { trigger: "[data-levels]", start: "top 85%", once: true },
        });
      });
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        gsap.fromTo(
          "[data-loop-path]",
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            ease: "none",
            scrollTrigger: { trigger: "[data-stages]", start: "top 70%", end: "bottom 55%", scrub: 0.8 },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="loop" aria-label="The practice loop" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionIntro
          index="04"
          eyebrow="How it works"
          title={
            <>
              Turn weaknesses <span className="italic text-ember">into practice.</span>
            </>
          }
          lede="Feedback is only useful if it changes what you do next. Every report points at a skill, every skill has a practice path, and every new answer updates the picture."
        />

        <div data-stages className="relative mt-20">

          <ol className="relative grid gap-6 lg:grid-cols-3 lg:gap-8">
            <li data-stage className="rounded-3xl border border-white/[0.08] bg-ink-900/80 p-7 backdrop-blur">
              <StageHead n="01" title="Spot the gap" color="bg-ember-deep" />
              <p className="mt-4 leading-relaxed text-mist">
                Your skill profile shows each measured skill, its level, and how much evidence stands behind it.
              </p>
              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-night/60 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    <span className="mr-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-java">Java</span>
                    HashMap resizing
                  </span>
                  <span className="rounded-full bg-ember-deep/15 px-2 py-0.5 text-[0.68rem] font-semibold text-[#ff8a64]">
                    Gap
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <div className="h-full w-[38%] rounded-full bg-ember-deep" />
                </div>
                <p className="mt-2 text-xs text-fog">Level 38 · low confidence, early evidence</p>
              </div>
            </li>

            <li data-stage className="rounded-3xl border border-white/[0.08] bg-ink-900/80 p-7 backdrop-blur">
              <StageHead n="02" title="Practise that skill" color="bg-honey" />
              <p className="mt-4 leading-relaxed text-mist">
                Weak-areas mode builds a short interview from your lowest-rated skills. No need to repeat a whole
                session to fix one topic.
              </p>
              <div className="mt-6 space-y-2">
                {["Targets your weakest skills", "5 focused questions", "Follow-ups on the same skill"].map((t) => (
                  <p
                    key={t}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-night/60 px-4 py-2.5 text-sm"
                  >
                    <span className="size-1.5 rounded-full bg-honey" />
                    {t}
                  </p>
                ))}
              </div>
            </li>

            <li data-stage className="rounded-3xl border border-white/[0.08] bg-ink-900/80 p-7 backdrop-blur">
              <StageHead n="03" title="Measure again" color="bg-sage" />
              <p className="mt-4 leading-relaxed text-mist">
                Levels are rebuilt from every scored point. Confidence only grows with repeated evidence, and fades
                again if you stop practising.
              </p>
              <div data-levels className="mt-6 space-y-3 rounded-2xl border border-white/[0.07] bg-night/60 p-4">
                {progression.map((p) => (
                  <div key={p.label}>
                    <div className="flex justify-between text-xs">
                      <span className="text-mist">{p.label}</span>
                      <span className="text-fog">
                        {p.level} · {p.confidence}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                      <div
                        data-level-bar
                        className={`h-full origin-left rounded-full ${p.color}`}
                        style={{ width: `${p.level}%` }}
                      />
                    </div>
                  </div>
                ))}
                <p className="pt-1 text-[0.68rem] uppercase tracking-[0.12em] text-fog">Illustrative progression</p>
              </div>
            </li>
          </ol>

          <div className="relative mt-4 flex h-24 items-end justify-center lg:mt-0 lg:h-28">
            <svg
              aria-hidden
              viewBox="0 0 1200 110"
              preserveAspectRatio="none"
              className="absolute inset-0 hidden size-full lg:block"
            >
              <defs>
                <linearGradient id="loopGrad" x1="1" x2="0">
                  <stop offset="0" stopColor="#6d9773" />
                  <stop offset="0.5" stopColor="#e9a93b" />
                  <stop offset="1" stopColor="#d9481c" />
                </linearGradient>
              </defs>
              <path
                data-loop-path
                d="M 1000 0 C 1000 70, 960 96, 860 96 L 340 96 C 240 96, 200 70, 200 0"
                fill="none"
                stroke="url(#loopGrad)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <p className="relative flex items-center gap-3 bg-night px-4 font-mono text-xs uppercase tracking-[0.18em] text-fog lg:translate-y-[-2px]">
              <span aria-hidden className="text-ember">
                ↻
              </span>
              Then repeat, with a clearer picture each time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageHead({ n, title, color }: { n: string; title: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative grid size-9 place-items-center rounded-full border border-white/15 bg-night">
        <span className={`size-2 rounded-full ${color}`} />
      </span>
      <div>
        <p className="font-mono text-[0.65rem] text-fog">{n}</p>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      </div>
    </div>
  );
}
