"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK, ease } from "@/lib/motion";
import { SectionIntro } from "@/components/animation/SectionIntro";
import { Reveal } from "@/components/animation/Reveal";

const tabs = [
  { id: "modes", label: "Interview modes" },
  { id: "resume", label: "Resume Defense" },
  { id: "job", label: "Job readiness" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const modes = [
  { name: "Quick", q: "5", note: "A short daily session. The easiest way in." },
  { name: "Practice", q: "6", note: "Feedback after every answer, while it's fresh." },
  { name: "Real", q: "12", note: "Full length, two warm-up questions, no hints." },
  { name: "Topic", q: "8", note: "One subject only, from Java to networks." },
  { name: "Weak areas", q: "5", note: "Built from your lowest-rated skills." },
  { name: "Job practice", q: "6", note: "From a saved job's approved requirements." },
  { name: "Resume Defense", q: "≤9", note: "Questions about the work on your resume." },
  { name: "Pressure", q: "8", note: "90-second timer, rising difficulty, no hints." },
];

const subjects = [
  { name: "Java", color: "var(--color-java)" },
  { name: "Python", color: "var(--color-python)" },
  { name: "SQL", color: "var(--color-sql)" },
  { name: "DSA", color: "var(--color-dsa)" },
  { name: "OOP", color: "var(--color-oop)" },
  { name: "DBMS", color: "var(--color-dbms)" },
  { name: "OS", color: "var(--color-os)" },
  { name: "Networks", color: "var(--color-networks)" },
];

const resumeSteps = [
  { t: "Upload", b: "Your PDF is read in memory and dropped. Emails, phone numbers and links are removed before any AI sees the text." },
  { t: "Review", b: "Projects, experience and claims are extracted. Edit or remove anything before you approve it." },
  { t: "Defend", b: "Up to three threads, each an opening question and up to two follow-ups on what you built and why." },
];

const verdicts = [
  { label: "Well defended", cls: "border-sage/30 bg-sage/10 text-sage", item: "Payment retry service · reduced failures by 30%" },
  { label: "Partly defended", cls: "border-honey/30 bg-honey/10 text-honey", item: "Migrated reporting to PostgreSQL" },
  { label: "Needs more preparation", cls: "border-ember/30 bg-ember/10 text-[#ff8a64]", item: "Kafka event pipeline" },
];

const requirements = [
  { req: "Strong Java and collections", tag: "Must-have", status: "Ready", cls: "text-sage", dot: "bg-sage" },
  { req: "SQL and query optimisation", tag: "Must-have", status: "Developing", cls: "text-honey", dot: "bg-honey" },
  { req: "Operating system fundamentals", tag: "Nice-to-have", status: "Gap", cls: "text-[#ff8a64]", dot: "bg-ember-deep" },
  { req: "REST API design", tag: "Must-have", status: "Early evidence", cls: "text-mist", dot: "bg-mist" },
  { req: "Data structures", tag: "Must-have", status: "No evidence yet", cls: "text-fog", dot: "bg-fog" },
  { req: "Experience with Kubernetes", tag: "Nice-to-have", status: "Not measured yet", cls: "text-fog", dot: "border border-fog bg-transparent" },
];

export function RolePreparation() {
  const [active, setActive] = useState<TabId>("modes");
  const root = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const first = useRef(true);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-tabpanel] [data-tab-item]", {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          ease: ease.out,
          stagger: 0.05,
        });
      });
    },
    { scope: root, dependencies: [active] },
  );

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={root} id="prepare" aria-label="Prepare for your role" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionIntro
          index="05"
          eyebrow="Features"
          title={
            <>
              Prepare for the role <span className="italic text-ember">you actually want.</span>
            </>
          }
          lede="General practice gets you started. Then bring your own resume and the job description you're aiming for, and the practice follows."
        />

        <Reveal className="mt-14">
          <div
            role="tablist"
            aria-label="Preparation features"
            className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1"
          >
            {tabs.map((t, i) => {
              const selected = active === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(t.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-5 ${
                    selected ? "bg-cream text-night" : "text-mist hover:text-cream"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          data-tabpanel
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          className="mt-10 min-h-[520px]"
        >
          {active === "modes" && <ModesPanel />}
          {active === "resume" && <ResumePanel />}
          {active === "job" && <JobPanel />}
        </div>
      </div>
    </section>
  );
}

function ModesPanel() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 xl:grid-cols-4">
        {modes.map((m) => (
          <li key={m.name} data-tab-item className="group bg-night p-6 transition-colors duration-300 hover:bg-ink-900">
            <p className="font-serif text-5xl text-cream/90 transition-colors group-hover:text-ember">{m.q}</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-fog">questions</p>
            <h3 className="mt-6 font-semibold tracking-tight">{m.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-mist">{m.note}</p>
          </li>
        ))}
      </ul>
      <div data-tab-item className="rounded-3xl border border-white/[0.07] bg-ink-900/60 p-6">
        <p className="eyebrow">Subjects today</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {subjects.map((s) => (
            <li
              key={s.name}
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm"
            >
              <span className="size-2 rounded-full" style={{ background: s.color }} />
              {s.name}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-mist">
          Eight subjects and 75 individual skills, each tracked separately. Every mode, including Pressure, uses one of
          your daily interview starts. Continuing a saved interview never does.
        </p>
      </div>
    </div>
  );
}

function ResumePanel() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <ol className="space-y-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07]">
        {resumeSteps.map((s, i) => (
          <li key={s.t} data-tab-item className="flex gap-5 bg-night p-6">
            <span className="font-mono text-xs text-ember">0{i + 1}</span>
            <div>
              <h3 className="font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mist">{s.b}</p>
            </div>
          </li>
        ))}
      </ol>
      <div data-tab-item className="rounded-3xl border border-white/[0.07] bg-ink-900/60 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">Credibility report</p>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-honey">Example</span>
        </div>
        <ul className="mt-6 space-y-3">
          {verdicts.map((v) => (
            <li key={v.label} className="rounded-2xl border border-white/[0.07] bg-night/60 p-4">
              <p className="text-sm text-cream/90">{v.item}</p>
              <span className={`mt-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${v.cls}`}>
                {v.label}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-mist">
          Verdicts describe how well you explained the work, not whether your resume is true. It&apos;s preparation,
          not a background check.
        </p>
      </div>
    </div>
  );
}

function JobPanel() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <div data-tab-item className="rounded-3xl border border-white/[0.07] bg-ink-900/60 p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.07] pb-5">
          <div>
            <p className="eyebrow">Backend Engineer · Junior</p>
            <p className="mt-2 text-sm text-mist">6 approved requirements · 4 must-haves</p>
          </div>
          <div className="text-right">
            <p className="font-serif text-4xl">
              59<span className="text-lg text-fog"> /100</span>
            </p>
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-honey">Provisional · example</p>
          </div>
        </div>
        <ul className="mt-2 divide-y divide-white/[0.06]">
          {requirements.map((r) => (
            <li key={r.req} className="flex items-center gap-3 py-3.5">
              <span className={`size-2 flex-none rounded-full ${r.dot}`} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{r.req}</p>
                <p className="text-[0.68rem] uppercase tracking-[0.1em] text-fog">{r.tag}</p>
              </div>
              <span className={`flex-none text-xs font-semibold ${r.cls}`}>{r.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-6">
        <div data-tab-item>
          <h3 className="text-xl font-semibold tracking-tight">Untested isn&apos;t weak.</h3>
          <p className="mt-2 leading-relaxed text-mist">
            A requirement you haven&apos;t been asked about yet shows as no evidence, not as a gap. Readiness only
            counts skills measured with real confidence.
          </p>
        </div>
        <div data-tab-item>
          <h3 className="text-xl font-semibold tracking-tight">Never a hiring probability.</h3>
          <p className="mt-2 leading-relaxed text-mist">
            The score compares your measured skills with the requirements you approved. Must-haves count double, and
            the score is withheld until enough of them are measured.
          </p>
        </div>
        <div data-tab-item>
          <h3 className="text-xl font-semibold tracking-tight">Before and after.</h3>
          <p className="mt-2 leading-relaxed text-mist">
            Practise against the job, then see what changed and why, compared with a saved baseline.
          </p>
        </div>
      </div>
    </div>
  );
}
