"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK, ease } from "@/lib/motion";
import { SectionIntro } from "@/components/animation/SectionIntro";
import { Reveal } from "@/components/animation/Reveal";
import { ReportPreview } from "@/components/product/ReportPreview";

const facts = [
  {
    k: "3–5",
    title: "rubric points per question",
    body: "Each judged demonstrated, partial or missed, with a note on why.",
  },
  {
    k: "0",
    title: "points for our mistakes",
    body: "Empty answers and AI failures are marked “not assessed” and left out of every average. Never a zero.",
  },
  {
    k: "3",
    title: "separate lenses",
    body: "Accuracy for content, communication for clarity, delivery for pace and fillers. Delivery isn't a confidence score.",
  },
];

export function Evaluation() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // The report opens out of a narrow slit, like the interview resolving into results.
        gsap.fromTo(
          "[data-report]",
          { clipPath: "inset(18% 22% 18% 22% round 28px)", scale: 0.92 },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-report]", start: "top 92%", end: "top 35%", scrub: 0.6 },
          },
        );

        const tl = gsap.timeline({
          defaults: { ease: ease.out },
          scrollTrigger: { trigger: "[data-report]", start: "top 55%", once: true },
        });

        const arcs = gsap.utils.toArray<SVGCircleElement>("[data-ring-arc]");
        arcs.forEach((arc, i) => {
          const c = 2 * Math.PI * 44;
          const v = Number(arc.dataset.value);
          tl.fromTo(arc, { strokeDashoffset: c }, { strokeDashoffset: c * (1 - v / 100), duration: 1.6 }, i * 0.12);
        });
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el, i) => {
          const obj = { v: 0 };
          const target = Number(el.dataset.count);
          tl.to(obj, { v: target, duration: 1.6, onUpdate: () => (el.textContent = String(Math.round(obj.v))) }, i * 0.12);
        });
        tl.from("[data-rubric]", { x: -16, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.3)
          .from("[data-skill-bar]", { scaleX: 0, duration: 1.4, stagger: 0.12 }, 0.5)
          .from("[data-report-item]:last-child > *", { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.12 }, 0.9);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="eval-title" className="relative py-28 sm:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[800px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(12,59,46,0.55),transparent)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div id="eval-title">
          <SectionIntro
            index="03"
            eyebrow="The report"
            title={
              <>
                Every answer <span className="italic text-ember">reveals</span> something.
              </>
            }
            lede="A single score can't tell you what to study. The report breaks every answer into the points an interviewer would listen for, then shows what you covered, what was half there and what never came up."
          />
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div data-report>
            <ReportPreview />
          </div>

          <Reveal className="space-y-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] lg:mt-10">
            {facts.map((f) => (
              <div key={f.title} data-reveal className="bg-night p-7">
                <p className="font-serif text-5xl text-ember">{f.k}</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-mist">{f.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
