import type { Metadata } from "next";
import { PageShell, Prose } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { links, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${site.name} exists, what it believes and what it will never promise.`,
};

const promises = [
  "Guaranteed job offers or interview success",
  "A perfectly accurate assessment of every skill",
  "Confidence or personality scores",
  "Verification that a resume claim is true",
  "A hiring probability for a job description",
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title={
        <>
          An interview should teach you something, <span className="italic text-ember">not just test you.</span>
        </>
      }
      lede={`${site.name} is a voice-first interview coach for software engineering candidates, built for students, fresh graduates and early-career developers who don't have a mentor to run mock interviews with them.`}
    >
      <Prose>
        <section className="space-y-4">
          <h2>Why it exists</h2>
          <p>
            Most candidates prepare by reading and solving problems. Then the real interview asks them to explain, out
            loud, under follow-up questions, and that is a different skill. Mock interviews help, but they&apos;re hard
            to come by, and the feedback is often a vague impression rather than a list of what to fix.
          </p>
          <p>
            We built a product that connects practice to measurable learning: spoken interviews, rubric-based feedback
            on every answer, a skill profile built from evidence, and practice that targets what that evidence says is
            weak.
          </p>
        </section>

        <section className="space-y-4">
          <h2>What we believe</h2>
          <ul className="list-none">
            <li>
              <strong>Evidence over impressions.</strong> A skill is demonstrated, partly demonstrated, or not yet
              assessed. Untested never means weak.
            </li>
            <li>
              <strong>Honesty about uncertainty.</strong> Every level comes with a confidence label, and confidence only
              grows with repeated evidence.
            </li>
            <li>
              <strong>Practice that leads somewhere.</strong> The aim isn&apos;t more sessions; it&apos;s knowing what
              to work on next and seeing whether it improved.
            </li>
            <li>
              <strong>Privacy by default.</strong> Resumes are read in memory and dropped, contact details are removed
              before AI processing, and you can delete everything from the app.
            </li>
          </ul>
        </section>

        <section className="space-y-5">
          <h2>What we&apos;ll never promise</h2>
          <ul className="grid list-none gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
            {promises.map((p) => (
              <li key={p} className="flex items-start gap-3 bg-night p-5">
                <span aria-hidden className="mt-0.5 text-ember">
                  ✕
                </span>
                {p}
              </li>
            ))}
          </ul>
          <p>Trust is part of the product. Every claim on this site describes what the app actually does today.</p>
        </section>

        <section className="space-y-4">
          <h2>Where we are</h2>
          <p>
            The Android app is in closed beta. Right now we&apos;re focused on proving that the experience is reliable
            on real phones and that the feedback is accurate enough to act on, before opening it to everyone.
          </p>
          <div className="pt-4">
            <Button href={links.beta}>Join the closed beta</Button>
          </div>
        </section>
      </Prose>
    </PageShell>
  );
}
