import { ScoreRing } from "./ScoreRing";

type Verdict = "demonstrated" | "partial" | "missed";

const rubric: { point: string; verdict: Verdict; note: string }[] = [
  { point: "Colliding keys share a bucket and are chained", verdict: "demonstrated", note: "Clear and correct" },
  { point: "Lookup compares hashCode, then equals()", verdict: "demonstrated", note: "Named both steps" },
  { point: "Long chains become balanced trees (Java 8+)", verdict: "partial", note: "Mentioned, no threshold" },
  { point: "Load factor triggers a resize and rehash", verdict: "missed", note: "Not covered" },
];

const verdictStyle: Record<Verdict, { label: string; dot: string; text: string }> = {
  demonstrated: { label: "Demonstrated", dot: "bg-sage", text: "text-sage" },
  partial: { label: "Partial", dot: "bg-honey", text: "text-honey" },
  missed: { label: "Missed", dot: "bg-ember-deep", text: "text-[#ff8a64]" },
};

const skills = [
  { name: "HashMap internals", subject: "Java", color: "var(--color-java)", level: 58, confidence: "Medium" },
  { name: "SQL joins", subject: "SQL", color: "var(--color-sql)", level: 74, confidence: "High" },
  { name: "Process scheduling", subject: "OS", color: "var(--color-os)", level: 41, confidence: "Low" },
];

/** A sample report. Values are illustrative and labelled as such. */
export function ReportPreview() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-ink-900/90 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-7">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">Interview report</p>
          <p className="mt-1 text-sm text-cream/90">Practice · 6 questions · Java, SQL, OS</p>
        </div>
        <span className="rounded-full border border-honey/30 bg-honey/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-honey">
          Illustrative example
        </span>
      </div>

      <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[auto_1fr]">
        <div data-report-item className="flex justify-around gap-4 lg:flex-col lg:justify-start lg:gap-6">
          <ScoreRing value={72} label="Accuracy" color="var(--color-sage)" size={96} />
          <ScoreRing value={81} label="Communication" color="var(--color-honey)" size={96} />
          <ScoreRing value={64} label="Delivery" color="var(--color-ember)" size={96} />
        </div>

        <div className="min-w-0 space-y-6">
          <div data-report-item>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mist">Question 3 · rubric</p>
            <p className="mt-2 text-[0.95rem] text-cream">
              How does a HashMap handle two keys that land in the same bucket?
            </p>
            <ul className="mt-4 divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              {rubric.map((r) => {
                const v = verdictStyle[r.verdict];
                return (
                  <li data-rubric key={r.point} className="flex items-start gap-3 px-4 py-3">
                    <span className={`mt-1.5 size-2 flex-none rounded-full ${v.dot}`} aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-cream/90">{r.point}</p>
                      <p className="mt-0.5 text-xs text-fog">{r.note}</p>
                    </div>
                    <span className={`flex-none text-[0.7rem] font-semibold uppercase tracking-[0.1em] ${v.text}`}>
                      {v.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div data-report-item>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mist">Skills measured</p>
            <ul className="mt-3 space-y-3">
              {skills.map((s) => (
                <li key={s.name}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="truncate">
                      <span className="mr-2 font-mono text-[0.65rem] uppercase tracking-[0.12em]" style={{ color: s.color }}>
                        {s.subject}
                      </span>
                      {s.name}
                    </span>
                    <span className="flex-none text-xs text-fog">
                      Level {s.level} · {s.confidence} confidence
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      data-skill-bar
                      className="h-full origin-left rounded-full"
                      style={{ width: `${s.level}%`, background: s.color }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div data-report-item className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-sage/25 bg-sage/[0.07] p-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-sage">What went well</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/85">
                You explained collisions step by step, in the order the lookup actually happens.
              </p>
            </div>
            <div className="rounded-2xl border border-ember/30 bg-ember/[0.08] p-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#ff8a64]">Biggest opportunity</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/85">
                Resizing and load factor. <span className="font-semibold text-ember">Practise this skill →</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
