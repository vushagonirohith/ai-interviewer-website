"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MOTION_OK, ease } from "@/lib/motion";
import { SectionIntro } from "@/components/animation/SectionIntro";
import { Reveal } from "@/components/animation/Reveal";

const principles = [
  {
    title: "Our failure is never your score",
    body: "If the AI or the network fails, the answer is marked not assessed and left out. If an interview fails to start on our side, you get the slot back.",
  },
  {
    title: "Fixed rules decide the numbers",
    body: "The AI judges each rubric point. Accuracy, skill levels, readiness and speech tips come from fixed, tested rules, not a model's mood.",
  },
  {
    title: "Your resume is read, then dropped",
    body: "PDFs are processed in memory and never stored. Contact details are removed before any text reaches an AI service.",
  },
  {
    title: "No content in our error logs",
    body: "Diagnostics never include transcripts, resume text, tokens or email addresses. Word timings are used once and never saved.",
  },
  {
    title: "Your text is data, not instructions",
    body: "Resumes, job descriptions and answers are fenced off in every prompt, so pasted text can't rewrite how you're assessed.",
  },
  {
    title: "Delete everything, in the app",
    body: "One action removes your login and every interview, resume, job target and skill record with it.",
  },
];

export function Trust() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Principles arrive in the groups that scroll in together; each number
        // decodes as its card lands, like a rule being checked off.
        gsap.set("[data-principle]", { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch("[data-principle]", {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: ease.out, stagger: 0.1 });
            batch.forEach((el, i) => {
              const n = el.querySelector<HTMLElement>("[data-principle-n]")!;
              gsap.to(n, {
                duration: 0.8,
                delay: 0.15 + i * 0.1,
                scrambleText: { text: n.dataset.principleN!, chars: "0123456789", speed: 0.5 },
              });
            });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Honest by design" className="relative border-y border-white/[0.07] bg-ink-950 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionIntro
              index="06"
              variant="focus"
              eyebrow="Trust"
              title={
                <>
                  Honest <span data-emph className="italic text-ember">by design.</span>
                </>
              }
              lede="Feedback is only worth acting on if you can trust it. These rules hold everywhere in the product."
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-fog">
                Questions and scoring use Google Gemini; speech uses Deepgram. Feedback is AI-assisted and can be
                wrong.{" "}
                <Link href="/privacy" className="text-cream underline decoration-white/30 underline-offset-4 hover:decoration-ember">
                  Privacy at a glance
                </Link>
              </p>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.title} data-principle className="bg-ink-950 p-7">
                <span data-principle-n={String(i + 1).padStart(2, "0")} className="font-mono text-xs text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
