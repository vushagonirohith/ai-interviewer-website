"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK, ease } from "@/lib/motion";
import { SectionIntro } from "@/components/animation/SectionIntro";
import { ReportPreview } from "@/components/product/ReportPreview";
import { Sheet } from "@/components/animation/Sheet";

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
        // Verdicts land one by one: the dot pops, the line slides in, the label follows.
        tl.from("[data-rubric]", { x: -16, autoAlpha: 0, duration: 0.8, stagger: 0.16 }, 0.3)
          .from("[data-rubric-dot]", { scale: 0, duration: 0.6, ease: "back.out(3)", stagger: 0.16 }, 0.35)
          .from("[data-rubric-verdict]", { autoAlpha: 0, x: 10, duration: 0.6, stagger: 0.16 }, 0.5)
          // The missed point flashes once: that's the one to work on.
          .fromTo(
            "[data-rubric][data-verdict=missed]",
            { backgroundColor: "rgba(255,107,61,0)" },
            { backgroundColor: "rgba(255,107,61,0.14)", duration: 0.45, ease: ease.soft, yoyo: true, repeat: 1 },
            1.2,
          )
          .from("[data-skill-bar]", { scaleX: 0, duration: 1.4, stagger: 0.12 }, 0.7)
          .from("[data-report-item]:last-child > *", { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.12 }, 1.1)
          // ...and the report hands off to practice.
          .fromTo(
            "[data-opportunity]",
            { boxShadow: "0 0 0 0 rgba(255,107,61,0)" },
            { boxShadow: "0 0 0 1px rgba(255,107,61,0.55), 0 18px 50px -12px rgba(255,107,61,0.45)", duration: 0.8, ease: ease.soft },
            1.9,
          )
          .to("[data-opp-arrow]", { x: 5, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 3 }, 2.1);

        // The headline numbers rise out of their own masks as the column comes in.
        gsap.from("[data-fact]", {
          autoAlpha: 0,
          y: 24,
          duration: 1,
          ease: ease.out,
          stagger: 0.14,
          scrollTrigger: { trigger: "[data-facts]", start: "top 80%", once: true },
        });
        gsap.from("[data-fact-k]", {
          yPercent: 110,
          duration: 1.2,
          ease: ease.out,
          stagger: 0.14,
          delay: 0.1,
          scrollTrigger: { trigger: "[data-facts]", start: "top 80%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="eval-title" className="surface-light relative isolate py-28 sm:py-36">
      <Sheet className="sheet-cream" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div id="eval-title">
          <SectionIntro
            index="03"
            eyebrow="The report"
            title={
              <>
                Every answer{" "}
                <span data-emph className="italic text-ember">
                  reveals
                </span>{" "}
                something.
              </>
            }
            lede="A single score can't tell you what to study. The report breaks every answer into the points an interviewer would listen for, then shows what you covered, what was half there and what never came up."
          />
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div data-report className="min-w-0">
            <ReportPreview />
          </div>

          <div
            data-facts
            className="space-y-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] lg:mt-10"
          >
            {facts.map((f) => (
              <div key={f.title} data-fact className="bg-surface p-7">
                <p className="overflow-hidden font-serif text-5xl text-ember">
                  <span data-fact-k className="inline-block">
                    {f.k}
                  </span>
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-mist">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
