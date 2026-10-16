# AI Interviewer — marketing website

Cinematic, scroll-driven site for the AI Interviewer app. Next.js (App Router) + TypeScript + Tailwind CSS v4 + GSAP (ScrollTrigger, SplitText, DrawSVG).
Kept separate from the Flutter app; it only links to it.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Where things live

| Path | What |
| --- | --- |
| `src/lib/site.ts` | **Brand name**, contact email, beta/privacy/deletion links. Rename the product here. |
| `src/lib/gsap.ts`, `src/lib/motion.ts` | Plugin registration; shared easing and media queries (reduced motion, desktop). |
| `src/app/globals.css` | Ember & Pine palette tokens, voice orb and waveform styles. |
| `src/components/sections/` | Page sections in story order: Hero, Problem, InterviewDemo (pinned), Evaluation, PracticeLoop, RolePreparation (tabs), Trust, AppShowcase, FinalCTA. |
| `src/components/product/` | Product UI recreated for the web: VoiceOrb, Waveform, InterviewPanel, ReportPreview, ScoreRing, PhoneScreens. |
| `src/components/animation/` | Reveal, SplitHeading, SectionIntro. |
| `src/app/about`, `src/app/privacy` | Text pages. Privacy is a summary; the full policy stays on ai-interviewer-site. |

## Motion rules

- Every animation runs inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`; reduced-motion visitors get the final state.
- Content is fully visible without JavaScript. Only `[data-intro]` hero elements start hidden, and only once JS is known to run.
- The interview demo is pinned and scrubbed on desktop (≥1024px) and becomes stacked panels on mobile.

## Before launch

- Set the final product name in `src/lib/site.ts`, and `site.url` to the real domain.
- Replace the recreated phone screens with real screenshots (`public/app-screens/`, render an `<img>` inside `PhoneFrame`).
- Confirm `links.fullPrivacyPolicy` and `links.deleteAccount` match the live GitHub Pages URLs.
- All scores and levels shown are labelled as illustrative; keep it that way.
