import Link from "next/link";
import { links, navLinks, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-night">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div className="max-w-xs">
          <Wordmark />
          <p className="mt-4 text-sm leading-relaxed text-mist">
            A voice-first interview coach for software engineering candidates. Android first, in closed beta.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-fog">{site.tagline}</p>
        </div>

        <FooterCol title="Product">
          {navLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Trust">
          <FooterLink href="/privacy">Privacy at a glance</FooterLink>
          <FooterLink href={links.fullPrivacyPolicy}>Full privacy policy</FooterLink>
          <FooterLink href={links.deleteAccount}>Delete your account</FooterLink>
        </FooterCol>

        <FooterCol title="Contact">
          <FooterLink href={links.beta}>Join the closed beta</FooterLink>
          <FooterLink href={links.contact}>{site.contactEmail}</FooterLink>
        </FooterCol>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/[0.07] px-4 py-6 text-xs text-fog sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <p>
          © {new Date().getFullYear()} {site.name}. A practice tool, not a hiring assessment.
        </p>
        <p>Feedback is AI-assisted and can be imperfect.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "text-sm text-mist transition-colors hover:text-cream break-words";
  return (
    <li>
      {href.startsWith("/") ? (
        <Link href={href} className={cls}>
          {children}
        </Link>
      ) : (
        <a href={href} className={cls}>
          {children}
        </a>
      )}
    </li>
  );
}
