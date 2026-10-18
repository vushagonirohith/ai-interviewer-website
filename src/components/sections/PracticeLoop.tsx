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
      // Desktop: the three stages open in order, each one's data arriving with it.
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        const stages = gsap.utils.toArray<HTMLElement>("[data-stage]");
        const tl = gsap.timeline({
          defaults: { ease: ease.out },
          scrollTrigger: { trigger: "[data-stages]", start: "top 72%", once: true },
        });
        tl.from("[data-handoff]", { autoAlpha: 0, y: -14, duration: 0.8 })
          .fromTo("[data-handoff-line]", { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.6, ease: ease.inOut }, "-=0.3");
        stages.forEach((stage, i) => {
          const at = 0.75 + i * 0.45;
          tl.fromTo(
            stage,
            { clipPath: "inset(0% 0% 100% 0% round 24px)", y: 36 },
            { clipPath: "inset(0% 0% 0% 0% round 24px)", y: 0, duration: 1.1, clearProps: "clipPath" },
            at,
          ).from(stage.querySelector("[data-stage-dot]"), { scale: 0, duration: 0.7, ease: "back.out(3)" }, at + 0.25);
        });
        tl.from("[data-gap-bar]", { scaleX: 0, duration: 1.1 }, 1.1)
          .from("[data-gap-badge]", { scale: 0.6, autoAlpha: 0, duration: 0.6, ease: "back.out(2.5)" }, 1.5)
          .from("[data-focus-item]", { x: -14, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 1.5)
          .from("[data-level-bar]", { scaleX: 0, duration: 1.2, stagger: 0.2 }, 1.95);
      });

      // Smaller screens: stages are stacked, so each reveals as it scrolls in.
      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((stage) => {
          const tl = gsap.timeline({
            defaults: { ease: ease.out },
            scrollTrigger: { trigger: stage, start: "top 82%", once: true },
          });
          tl.from(stage, { y: 50, autoAlpha: 0, duration: 1 }).from(
            stage.querySelectorAll("[data-gap-bar], [data-level-bar]"),
            { scaleX: 0, duration: 1.1, stagger: 0.15 },
            0.3,
          );
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
          variant="words"
          eyebrow="How it works"
          title={
            <>
              Turn weaknesses <span data-emph className="italic text-ember">into practice.</span>
            </>
          }
          lede="Feedback is only useful if it changes what you do next. Every report points at a skill, every skill has a practice path, and every new answer updates the picture."
        />

        <div data-stages className="relative mt-16 lg:mt-20">
          {/* Where the report left off: its biggest opportunity becomes stage one. */}
          <div className="hidden pl-[1.85rem] lg:block">
            <p data-handoff className="flex items-center gap-3 text-sm">
              <span className="rounded-full border border-ember/30 bg-ember/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#ff8a64]">
                From your report
              </span>
              <span className="text-mist">Resizing and load factor</span>
            </p>
            <svg aria-hidden viewBox="0 0 2 40" className="ml-[0.95rem] h-10 w-0.5 overflow-visible">
              <path data-handoff-line d="M1 0 V40" stroke="var(--color-ember)" strokeWidth="1.5" strokeOpacity="0.7" />
            </svg>
          </div>

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
                  <span
                    data-gap-badge
                    className="rounded-full bg-ember-deep/15 px-2 py-0.5 text-[0.68rem] font-semibold text-[#ff8a64]"
                  >
                    Gap
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <div data-gap-bar className="h-full w-[38%] origin-left rounded-full bg-ember-deep" />
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
                    data-focus-item
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
        <span data-stage-dot className={`size-2 rounded-full ${color}`} />
      </span>
      <div>
        <p className="font-mono text-[0.65rem] text-fog">{n}</p>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      </div>
    </div>
  );
}
