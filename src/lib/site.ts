// Single source of truth for brand and outbound links.
// The public product name is still undecided: change `name` here and every
// page, the metadata and the footer pick it up.
export const site = {
  name: "AI Interviewer",
  shortName: "Interviewer",
  tagline: "Practice. Understand. Improve. Repeat.",
  description:
    "A voice-first AI interview coach for software engineering candidates. Answer real technical questions aloud, get rubric-based feedback on every answer, and track the skills that need work.",
  url: "https://ai-interviewer.example",
  contactEmail: "vushagonirohith@gmail.com",
} as const;

export const links = {
  beta: `mailto:${site.contactEmail}?subject=${encodeURIComponent(
    `${site.name} closed beta`,
  )}&body=${encodeURIComponent(
    "Hi, I'd like to join the closed beta.\n\nWhat I'm preparing for:\nMy Android phone:\n",
  )}`,
  contact: `mailto:${site.contactEmail}`,
  // Existing policy pages hosted from the ai-interviewer-site repository.
  fullPrivacyPolicy: "https://vushagonirohith.github.io/ai-interviewer-site/",
  deleteAccount: "https://vushagonirohith.github.io/ai-interviewer-site/delete-account.html",
  // Set once the Play Store listing exists.
  playStore: null as string | null,
} as const;

export const navLinks = [
  { label: "Product", href: "/#interview" },
  { label: "How it works", href: "/#loop" },
  { label: "Features", href: "/#prepare" },
  { label: "About", href: "/about" },
] as const;
