"use client";

import { Fragment, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DESKTOP, MOTION_OK, ease } from "@/lib/motion";
import { InterviewPanel } from "@/components/product/InterviewPanel";
import { SectionIntro } from "@/components/animation/SectionIntro";
import { SplitHeading } from "@/components/animation/SplitHeading";
import { Reveal } from "@/components/animation/Reveal";
import { Sheet } from "@/components/animation/Sheet";
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
    label: "Every point is scored",
    body: "Your answer is checked against the points an interviewer listens for. Each one is demonstrated, partial or missed, with a reason.",
  },
  {
    label: "It follows up when it matters",
    body: "Correct but incomplete? It probes the weak point. Unclear? It asks you to clarify. Like a real interviewer, it doesn't always just move on.",
  },
];

const hints = ["Interviewer is asking…", "Listening · release to send", "Scoring 4 rubric points…", "Follow-up · hold to answer"];
const orbStates: OrbState[] = ["speaking", "listening", "thinking", "speaking"];

const q1 = "Why is an index on a large table not always used by the query planner?";
const q2 = "Good. How would you check which plan the database actually chose?";

type Verdict = "demonstrated" | "partial" | "missed";

// `hit` links a phrase to the rubric point it earned (index into `rubric`).
const transcript: { t: string; hit?: number }[] = [
  { t: "If the query returns" },
  { t: "most of the rows,", hit: 0 },
  { t: "a full scan can be" },
  { t: "cheaper", hit: 2 },
  { t: "than jumping through the index. Also, if you" },
  { t: "wrap the column in a function,", hit: 1 },
  { t: "the index can't be used." },
];

const rubric: { point: string; verdict: Verdict }[] = [
  { point: "Low selectivity makes a full scan cheaper", verdict: "demonstrated" },
  { point: "A function on the column hides the index", verdict: "demonstrated" },
  { point: "The planner chooses by estimated cost", verdict: "partial" },
  { point: "Implicit type casts can block it too", verdict: "missed" },
];

const verdictStyle: Record<Verdict, { label: string; dot: string; text: string }> = {
  demonstrated: { label: "Demonstrated", dot: "bg-sage", text: "text-sage" },
  partial: { label: "Partial", dot: "bg-honey", text: "text-honey" },
  missed: { label: "Missed", dot: "bg-ember-deep", text: "text-[#ff8a64]" },
};

const words = (s: string) =>
  s.split(" ").map((w, i) => (
    <span key={i} data-w>
      {w}{" "}
    </span>
  ));

function Transcript() {
  return (
    <>
      {transcript.map((seg, i) => (
        <Fragment key={i}>
          {seg.hit === undefined ? (
            words(seg.t)
          ) : (
            <span data-hit={seg.hit} className={`hit ${rubric[seg.hit].verdict === "partial" ? "hit--partial" : ""}`}>
              {words(seg.t)}
            </span>
          )}{" "}
        </Fragment>
      ))}
    </>
  );
}

function RubricRows() {
  return (
    <ul className="space-y-1.5">
      {rubric.map((r) => {
        const v = verdictStyle[r.verdict];
        return (
          <li
            key={r.point}
            data-d-row
            data-verdict={r.verdict}
            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2"
          >
            <span aria-hidden className={`size-1.5 flex-none rounded-full ${v.dot}`} />
            <span className="min-w-0 flex-1 text-[0.8rem] leading-snug text-cream/90">{r.point}</span>
            <span className={`flex-none text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${v.text}`}>{v.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

function FollowUpBadge({ long = false }: { long?: boolean }) {
  return (
    <span className="rounded-full border border-honey/30 bg-honey/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-honey">
      {long ? "Follow-up · probing a partial point" : "Follow-up"}
    </span>
  );
}

export function InterviewDemo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        const q = gsap.utils.selector(root);
        const orb = "[data-demo-panel] [data-orb]";
        const wave = "[data-demo-panel] [data-wave]";
        const stepEls = q("[data-step]");
        const bodies = q("[data-step-body]");
        const dots = q("[data-step-dot]");
        const hintEls = q("[data-hint-i]");
        const rows = q("[data-d-row]");
        const q1El = q("[data-d-q1]")[0];

        const dot = {
          idle: { backgroundColor: "#0c3b2e", borderColor: "rgba(246,241,234,0.25)", scale: 1, boxShadow: "0 0 0 0 rgba(255,107,61,0)" },
          active: { backgroundColor: "#ff6b3d", borderColor: "#ff6b3d", scale: 1.3, boxShadow: "0 0 18px 2px rgba(255,107,61,0.55)" },
          done: { backgroundColor: "rgba(255,107,61,0.4)", borderColor: "rgba(255,107,61,0.5)", scale: 1, boxShadow: "0 0 0 0 rgba(255,107,61,0)" },
        };

        gsap.set(stepEls.slice(1), { opacity: 0.32 });
        gsap.set(bodies.slice(1), { height: 0, autoAlpha: 0 });
        gsap.set(dots, dot.idle);
        gsap.set(dots[0], dot.active);
        gsap.set(hintEls.slice(1), { autoAlpha: 0 });
        gsap.set("[data-counter-i='1']", { autoAlpha: 0 });
        gsap.set("[data-d-ans], [data-d-follow]", { autoAlpha: 0 });
        gsap.set(rows, { autoAlpha: 0, x: -14 });
        gsap.set("[data-demo-panel] [data-hit]", { backgroundSize: "0% 42%" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-demo-pin]",
            start: "top top",
            end: "+=420%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        // Hand focus from one step to the next, on the left and in the panel.
        const focus = (from: number, to: number, at: string) =>
          tl
            .to(stepEls[from], { opacity: 0.32, duration: 0.4 }, at)
            .to(bodies[from], { height: 0, autoAlpha: 0, duration: 0.5, ease: ease.inOut }, at)
            .to(dots[from], { ...dot.done, duration: 0.4 }, at)
            .to(stepEls[to], { opacity: 1, duration: 0.4 }, at)
            .to(bodies[to], { height: "auto", autoAlpha: 1, duration: 0.5, ease: ease.inOut }, at)
            .to(dots[to], { ...dot.active, duration: 0.4 }, at)
            .to(hintEls[from], { autoAlpha: 0, duration: 0.2 }, at)
            .to(hintEls[to], { autoAlpha: 1, duration: 0.2 }, at)
            .set(orb, { attr: { "data-state": orbStates[to] } }, at)
            .set(wave, { attr: { "data-active": String(to === 1) } }, at);

        // 1 · Ask
        tl.addLabel("ask")
          .fromTo("[data-d-q1] [data-w]", { opacity: 0.1 }, { opacity: 1, stagger: 0.08, duration: 0.3 }, "ask")
          .to("[data-step-fill]", { scaleY: 0.25, duration: 1.2 }, "ask");

        // 2 · Answer: the transcript builds word by word.
        tl.addLabel("answer", "+=0.3").to("[data-d-ans]", { autoAlpha: 1, duration: 0.3 }, "answer");
        focus(0, 1, "answer");
        tl.fromTo("[data-d-ans] [data-w]", { opacity: 0 }, { opacity: 1, stagger: 0.05, duration: 0.2 }, "answer")
          .to("[data-step-fill]", { scaleY: 0.5, duration: 1.8 }, "answer");

        // 3 · Score: the question gives way, each rubric point lands and marks
        // the words that earned it.
        tl.addLabel("score", "+=0.3")
          .to(q1El, { autoAlpha: 0, duration: 0.4 }, "score")
          .to("[data-d-track]", { y: () => -(q1El.offsetHeight + 14), duration: 0.6, ease: ease.inOut }, "score");
        focus(1, 2, "score");
        rows.forEach((row, i) => {
          const at = `score+=${0.55 + i * 0.5}`;
          tl.to(row, { autoAlpha: 1, x: 0, duration: 0.35, ease: ease.soft }, at);
          const hit = q(`[data-demo-panel] [data-hit="${i}"]`);
          if (hit.length) tl.to(hit, { backgroundSize: "100% 42%", duration: 0.45, ease: ease.inOut }, at);
        });
        tl.to("[data-step-fill]", { scaleY: 0.75, duration: 2.4 }, "score");

        // 4 · Follow-up: everything but the partial point steps back. That
        // point is what the next question probes.
        const partial = rows.filter((r) => r.dataset.verdict === "partial");
        const others = rows.filter((r) => r.dataset.verdict !== "partial");
        tl.addLabel("follow", "+=0.4")
          .to(["[data-d-ans]", ...others], { autoAlpha: 0.12, duration: 0.4 }, "follow")
          .to(
            partial,
            { borderColor: "rgba(233,169,59,0.45)", backgroundColor: "rgba(233,169,59,0.1)", scale: 1.03, duration: 0.4 },
            "follow",
          )
          .to("[data-d-track]", { autoAlpha: 0, y: "-=36", duration: 0.5, ease: ease.inOut }, "follow+=0.8")
          .to("[data-counter-i='0']", { autoAlpha: 0, duration: 0.2 }, "follow+=0.9")
          .to("[data-counter-i='1']", { autoAlpha: 1, duration: 0.2 }, "follow+=0.9")
          .fromTo("[data-d-follow]", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: ease.soft }, "follow+=1")
          .fromTo("[data-d-follow] [data-w]", { opacity: 0.1 }, { opacity: 1, stagger: 0.08, duration: 0.3 }, "follow+=1.2");
        focus(2, 3, "follow+=0.9");
        tl.to("[data-step-fill]", { scaleY: 1, duration: 1.8 }, "follow").to({}, { duration: 0.8 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="interview" aria-label="The interview" className="surface-pine relative isolate">
      <Sheet className="sheet-pine" />
      {/* ---------- Desktop: one pinned, scroll-driven scene ---------- */}
      <div data-demo-pin className="relative hidden min-h-screen items-center overflow-hidden lg:flex">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_minmax(0,500px)] items-center gap-20 px-10 py-16">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-ember">02</span>
              <span aria-hidden className="h-px w-8 bg-white/20" />
              The interview
            </p>
            <SplitHeading
              variant="words"
              id="demo-title"
              className="mt-6 font-serif text-[4.25rem] leading-[1.02] tracking-[-0.01em] text-balance"
            >
              A real conversation, <span data-emph className="italic text-mist">not a quiz.</span>
            </SplitHeading>

            <ol className="relative mt-12 space-y-6 pl-10">
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
                    data-step-dot
                    className="absolute -left-10 top-1.5 size-[11px] rounded-full border border-white/25 bg-surface"
                  />
                  <p className="font-mono text-xs text-ember">0{i + 1}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">{s.label}</h3>
                  <div data-step-body className="overflow-hidden">
                    <p className="max-w-md pt-2 leading-relaxed text-mist">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div data-demo-panel>
            <InterviewPanel
              mode="Real interview"
              counter={
                <>
                  <span data-counter-i="0">Q 5 / 12</span>
                  <span data-counter-i="1" className="invisible absolute right-0 top-0 whitespace-nowrap">
                    Q 5 / 12 · follow-up
                  </span>
                </>
              }
              progress={0.4}
              hint={
                <span className="relative block h-[1.25em]">
                  {hints.map((h, i) => (
                    <span key={h} data-hint-i={i} className={`absolute inset-0 whitespace-nowrap ${i ? "invisible" : ""}`}>
                      {h}
                    </span>
                  ))}
                </span>
              }
            >
              <div className="relative h-[292px] overflow-hidden">
                <div data-d-track>
                  <div data-d-q1>
                    <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ember/90">
                      DBMS · Indexing · Medium
                    </p>
                    <p className="mt-3 text-center font-serif text-[1.7rem] leading-[1.2] text-balance">{words(q1)}</p>
                  </div>
                  <div data-d-ans className="mt-5 rounded-2xl border border-sage/20 bg-sage/[0.07] px-4 py-3">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-sage">You · live transcript</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream/85">
                      <Transcript />
                    </p>
                  </div>
                  <div className="mt-3">
                    <RubricRows />
                  </div>
                </div>
                <div data-d-follow className="absolute inset-x-0 top-6">
                  <p className="flex justify-center">
                    <FollowUpBadge long />
                  </p>
                  <p className="mt-5 text-center font-serif text-[1.7rem] leading-[1.2] text-balance">{words(q2)}</p>
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
          variant="words"
          title={
            <>
              A real conversation, <span data-emph className="italic text-mist">not a quiz.</span>
            </>
          }
        />
        <div className="mx-auto mt-14 max-w-md space-y-14">
          {steps.map((s, i) => (
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
                  counter={i === 3 ? "Q 5 / 12 · follow-up" : "Q 5 / 12"}
                  progress={0.4}
                  orbState={orbStates[i]}
                  waveActive={i === 1}
                  hint={hints[i]}
                >
                  {i === 0 && <p className="text-center font-serif text-2xl leading-snug text-balance">{q1}</p>}
                  {(i === 1 || i === 2) && (
                    <div className="rounded-2xl border border-sage/20 bg-sage/[0.07] px-4 py-3">
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-sage">You · live transcript</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-cream/85">
                        {i === 2 ? <Transcript /> : transcript.map((t) => t.t).join(" ")}
                      </p>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="mt-3">
                      <RubricRows />
                    </div>
                  )}
                  {i === 3 && (
                    <>
                      <p className="flex justify-center">
                        <FollowUpBadge />
                      </p>
                      <p className="mt-4 text-center font-serif text-2xl leading-snug text-balance">{q2}</p>
                    </>
                  )}
                </InterviewPanel>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
