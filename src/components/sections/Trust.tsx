import Link from "next/link";
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
  return (
    <section aria-label="Honest by design" className="relative border-y border-white/[0.07] bg-ink-950 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionIntro
              index="06"
              eyebrow="Trust"
              title={
                <>
                  Honest <span className="italic text-ember">by design.</span>
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

          <Reveal className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2" stagger={0.07}>
            {principles.map((p, i) => (
              <div key={p.title} data-reveal className="bg-ink-950 p-7">
                <span className="font-mono text-xs text-ember">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">{p.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
