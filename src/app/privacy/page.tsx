import type { Metadata } from "next";
import { PageShell, Prose } from "@/components/layout/PageShell";
import { links, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy at a glance",
  description: `How ${site.name} handles your answers, resume and account data.`,
};

const processors = [
  { name: "Supabase", use: "Sign-in and the database that stores your account and interview history" },
  { name: "Google Gemini", use: "Writing questions, judging answers, reading resumes and job descriptions" },
  { name: "Deepgram", use: "Turning your speech into text, and the interviewer's voice" },
  { name: "Brevo", use: "Sending sign-up and password reset codes by email" },
  { name: "Render", use: "Hosting the server the app talks to" },
  { name: "Sentry", use: "Error reports, stripped of transcripts, resume text, tokens and emails" },
];

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacy"
      title={
        <>
          Privacy <span className="italic text-ember">at a glance.</span>
        </>
      }
      lede="A plain-language summary of how your data is handled. The full privacy policy is the authoritative version."
    >
      <p className="mt-6">
        <a
          href={links.fullPrivacyPolicy}
          className="text-cream underline decoration-white/30 underline-offset-4 hover:decoration-ember"
        >
          Read the full privacy policy →
        </a>
      </p>

      <Prose>
        <section className="space-y-4">
          <h2>What we keep</h2>
          <ul className="list-disc pl-5 marker:text-ember">
            <li>Your account: name, email and profile choices.</li>
            <li>Your interviews: the questions, the text of your answers, scores, feedback and computed speech metrics.</li>
            <li>Your skill evidence and ratings, rebuilt from scored answers.</li>
            <li>The resume and job details you review and approve, as structured text. Never the original file.</li>
            <li>Daily usage counts, deleted after seven days.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2>What we don&apos;t keep</h2>
          <ul className="list-disc pl-5 marker:text-ember">
            <li>Resume PDFs. They are read in memory and dropped.</li>
            <li>Word-by-word timings from your speech. They are used once for the speech report, then discarded.</li>
            <li>Emails, phone numbers and links from your resume or job text. They are removed before any AI processing.</li>
          </ul>
        </section>

        <section className="space-y-5">
          <h2>Who processes it</h2>
          <p>To run the product, some data is processed by these third-party services:</p>
          <ul className="list-none divide-y divide-white/[0.07] rounded-3xl border border-white/[0.07]">
            {processors.map((p) => (
              <li key={p.name} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6">
                <strong className="w-36 flex-none">{p.name}</strong>
                <span>{p.use}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2>Deleting your account</h2>
          <p>
            In the app, open the account menu and choose <strong>Delete account</strong>. Your login and every
            interview, resume, job target and skill record are removed together. Without the app, email{" "}
            <a href={links.contact} className="text-cream underline decoration-white/30 underline-offset-4">
              {site.contactEmail}
            </a>{" "}
            from your account&apos;s address and we&apos;ll delete it within seven days.
          </p>
        </section>

        <section className="space-y-4">
          <h2>About AI feedback</h2>
          <p>
            Scores and feedback are AI-assisted and can be wrong. They describe a practice session, not your ability as
            a whole, and are never a prediction of whether you&apos;ll be hired.
          </p>
        </section>
      </Prose>
    </PageShell>
  );
}
