"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DESKTOP, MOTION_OK, ease } from "@/lib/motion";
import { InterviewPanel } from "@/components/product/InterviewPanel";
import { SectionIntro } from "@/components/animation/SectionIntro";
import { Reveal } from "@/components/animation/Reveal";
import type { OrbState } from "@/components/product/VoiceOrb";

const steps = [
  {
    label: "The interviewer asks, aloud",
    body: "Spoken questions, set to your level and aimed at the skills that most need testing. The next one is prepared while you answer.",
  },
  {
    label: "You answer the way you would in the room",
    body: "Hold to speak. Your words appear live, and your pace, pauses and filler words feed a separate speech report.",
  },
  {
    label: "It follows up when it matters",
    body: "Correct but incomplete? It probes. Unclear? It asks you to clarify. Like a real interviewer, it doesn't always just move on.",
  },
];

const q1 = "Why is an index on a large table not always used by the query planner?";
const transcript =
  "If the query returns most of the rows, a full scan can be cheaper than jumping through the index. Also, if you wrap the column in a function, the index can't be used.";
const q2 = "Good. How would you check which plan the database actually chose?";

const words = (s: string) => s.split(" ").map((w, i) => <span key={i}>{w} </span>);

export function InterviewDemo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        const orb = "[data-demo-panel] [data-orb]";
        const wave = "[data-demo-panel] [data-wave]";
        const stepEls = gsap.utils.toArray<HTMLElement>("[data-step]");

        gsap.set(stepEls.slice(1), { opacity: 0.28 });
        gsap.set("[data-d-ans], [data-d-eval], [data-d-follow]", { autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-demo-pin]",
            start: "top top",
            end: "+=280%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        tl.addLabel("ask")
          .fromTo("[data-d-q1] span", { opacity: 0.1 }, { opacity: 1, stagger: 0.08, duration: 0.3 })
          .to("[data-step-fill]", { scaleY: 1 / 3, duration: 1.4 }, "ask")
          // --- answer ---
          .addLabel("answer", "+=0.3")
          .set(orb, { attr: { "data-state": "listening" } }, "answer")
          .set(wave, { attr: { "data-active": "true" } }, "answer")
          .to(stepEls[0], { opacity: 0.28, duration: 0.3 }, "answer")
          .to(stepEls[1], { opacity: 1, duration: 0.3 }, "answer")
          .to("[data-d-ans]", { autoAlpha: 1, duration: 0.3 }, "answer")
          .fromTo("[data-d-ans] [data-words] span", { opacity: 0 }, { opacity: 1, stagger: 0.06, duration: 0.2 }, "answer")
          .to("[data-step-fill]", { scaleY: 2 / 3, duration: 2 }, "answer")
          .set(orb, { attr: { "data-state": "thinking" } })
          .set(wave, { attr: { "data-active": "false" } }, "<")
          .to("[data-d-eval]", { autoAlpha: 1, duration: 0.3 }, "<")
          .fromTo("[data-d-eval] [data-pip]", { scaleX: 0 }, { scaleX: 1, stagger: 0.15, duration: 0.25, ease: ease.soft })
          // --- follow-up ---
          .addLabel("follow", "+=0.3")
          .to(["[data-d-q1]", "[data-d-ans]", "[data-d-eval]"], { autoAlpha: 0, y: -24, duration: 0.5 }, "follow")
          .set(orb, { attr: { "data-state": "speaking" } }, "follow+=0.3")
          .to(stepEls[1], { opacity: 0.28, duration: 0.3 }, "follow")
          .to(stepEls[2], { opacity: 1, duration: 0.3 }, "follow")
          .fromTo("[data-d-follow]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "follow+=0.3")
          .fromTo("[data-d-follow] [data-words] span", { opacity: 0.1 }, { opacity: 1, stagger: 0.08, duration: 0.3 }, "<0.2")
          .to("[data-step-fill]", { scaleY: 1, duration: 1.4 }, "follow")
          .to("[data-demo-panel] [data-progress]", { scaleX: 0.58, duration: 1 }, "follow")
          .to({}, { duration: 0.6 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="interview" aria-label="The interview" className="relative">
      {/* ---------- Desktop: one pinned, scroll-driven scene ---------- */}
      <div data-demo-pin className="relative hidden min-h-screen items-center overflow-hidden lg:flex">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute right-[8%] top-1/2 h-[680px] w-[680px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(19,74,58,0.5),transparent)]" />
        </div>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_minmax(0,500px)] items-center gap-20 px-10 py-24">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-ember">02</span>
              <span aria-hidden className="h-px w-8 bg-white/20" />
              The interview
            </p>
            <h2 id="demo-title" className="mt-6 font-serif text-[4.5rem] leading-[1.02] tracking-[-0.01em]">
              A real conversation, <span className="italic text-mist">not a quiz.</span>
            </h2>

            <ol className="relative mt-14 space-y-9 pl-10">
              <span aria-hidden className="absolute bottom-1 left-[5px] top-1 w-px bg-white/10" />
              <span
                aria-hidden
                data-step-fill
                className="absolute bottom-1 left-[5px] top-1 w-px origin-top scale-y-0 bg-gradient-to-b from-ember to-honey"
              />
              {steps.map((s, i) => (
                <li key={s.label} data-step className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-10 top-1.5 grid size-[11px] place-items-center rounded-full border border-white/25 bg-night"
                  />
                  <p className="font-mono text-xs text-ember">0{i + 1}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">{s.label}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-mist">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div data-demo-panel>
            <InterviewPanel mode="Real interview" counter="Q 5 / 12" progress={0.4} hint="Hold to answer">
              <div className="relative min-h-[260px]">
                <div data-d-q1>
                  <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ember/90">
                    DBMS · Indexing · Medium
                  </p>
                  <p className="mt-3 text-center font-serif text-[1.7rem] leading-[1.2] text-balance">{words(q1)}</p>
                </div>
                <div data-d-ans className="mt-5 rounded-2xl border border-sage/20 bg-sage/[0.07] px-4 py-3">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-sage">You · live transcript</p>
                  <p data-words className="mt-1.5 text-sm leading-relaxed text-cream/85">
                    {words(transcript)}
                  </p>
                </div>
                <div data-d-eval className="mt-3 flex items-center gap-3">
                  <span className="text-xs text-mist">Scoring 4 rubric points</span>
                  <span className="flex flex-1 gap-1.5">
                    {["bg-sage", "bg-sage", "bg-honey", "bg-white/20"].map((c, i) => (
                      <span key={i} data-pip className={`h-1.5 flex-1 origin-left rounded-full ${c}`} />
                    ))}
                  </span>
                </div>
                <div data-d-follow className="absolute inset-x-0 top-0">
                  <p className="flex justify-center">
                    <span className="rounded-full border border-honey/30 bg-honey/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-honey">
                      Follow-up · correct but incomplete
                    </span>
                  </p>
                  <p data-words className="mt-4 text-center font-serif text-[1.7rem] leading-[1.2] text-balance">
                    {words(q2)}
                  </p>
                  <p className="mt-5 text-center text-xs text-fog">Same skill, one level deeper.</p>
                </div>
              </div>
            </InterviewPanel>
          </div>
        </div>
      </div>

      {/* ---------- Mobile and tablet: natural scrolling panels ---------- */}
      <div className="px-4 py-24 sm:px-6 lg:hidden">
        <SectionIntro
          index="02"
          eyebrow="The interview"
          title={
            <>
              A real conversation, <span className="italic text-mist">not a quiz.</span>
            </>
          }
        />
        <div className="mx-auto mt-14 max-w-md space-y-14">
          {steps.map((s, i) => {
            const states: OrbState[] = ["speaking", "listening", "speaking"];
            return (
              <Reveal key={s.label}>
                <p data-reveal className="font-mono text-xs text-ember">
                  0{i + 1}
                </p>
                <h3 data-reveal className="mt-1 text-xl font-semibold tracking-tight">
                  {s.label}
                </h3>
                <p data-reveal className="mt-2 leading-relaxed text-mist">
                  {s.body}
                </p>
                <div data-reveal className="mt-6">
                  <InterviewPanel
                    mode="Real interview"
                    counter={i === 2 ? "Q 5 / 12 · follow-up" : "Q 5 / 12"}
                    progress={0.4 + i * 0.08}
                    orbState={states[i]}
                    waveActive={i === 1}
                    hint={i === 1 ? "Listening · release to send" : "Hold to answer"}
                  >
                    {i === 0 && <p className="text-center font-serif text-2xl leading-snug text-balance">{q1}</p>}
                    {i === 1 && (
                      <div className="rounded-2xl border border-sage/20 bg-sage/[0.07] px-4 py-3">
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-sage">You · live transcript</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-cream/85">{transcript}</p>
                      </div>
                    )}
                    {i === 2 && (
                      <>
                        <p className="flex justify-center">
                          <span className="rounded-full border border-honey/30 bg-honey/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-honey">
                            Follow-up
                          </span>
                        </p>
                        <p className="mt-4 text-center font-serif text-2xl leading-snug text-balance">{q2}</p>
                      </>
                    )}
                  </InterviewPanel>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
