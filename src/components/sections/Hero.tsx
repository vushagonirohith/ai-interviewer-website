"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MOTION_OK, REDUCED, ease } from "@/lib/motion";
import { links } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { InterviewPanel } from "@/components/product/InterviewPanel";

const question = "Walk me through what happens when two keys in a HashMap land in the same bucket.";
const answer = "Both entries live in that bucket as a chain. On lookup it compares the hash first, then calls equals…";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(REDUCED, () => {
        gsap.set("[data-intro]", { autoAlpha: 1 });
      });

      mm.add(MOTION_OK, () => {
        // ---- Intro: headline lines rise, then copy, then the product. ----
        const split = SplitText.create("[data-hero-title]", { type: "lines", mask: "lines", linesClass: "split-line" });
        const intro = gsap.timeline({ defaults: { ease: ease.out } });
        intro
          .set("[data-intro]", { autoAlpha: 1 })
          .from("[data-hero-eyebrow]", { y: 16, autoAlpha: 0, duration: 0.8 })
          .from(split.lines, { yPercent: 115, duration: 1.3, stagger: 0.12 }, "<0.1")
          .from("[data-hero-copy] > *", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, "-=0.9")
          .from("[data-hero-panel]", { y: 80, scale: 0.94, autoAlpha: 0, duration: 1.6 }, "-=1.1")
          .from("[data-hero-chip]", { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.12 }, "-=0.9");

        // ---- The live interview loop inside the panel. ----
        const qWords = gsap.utils.toArray<HTMLElement>("[data-hq] span");
        const aWords = gsap.utils.toArray<HTMLElement>("[data-ha] span");
        const orb = "[data-hero-panel] [data-orb]";
        const wave = "[data-hero-panel] [data-wave]";
        const hint = root.current!.querySelector("[data-hero-panel] [data-hint]")!;

        const loop = gsap.timeline({ repeat: -1, repeatDelay: 0.6, delay: 1.6 });
        loop
          .set(orb, { attr: { "data-state": "speaking" } })
          .set(wave, { attr: { "data-active": "false" } })
          .call(() => void (hint.textContent = "Interviewer is asking…"))
          .set("[data-ha]", { autoAlpha: 0 })
          .set("[data-hstatus]", { autoAlpha: 0, y: 8 })
          .fromTo(qWords, { opacity: 0.12 }, { opacity: 1, duration: 0.25, stagger: 0.11, ease: "none" })
          .set(orb, { attr: { "data-state": "listening" } }, "+=0.5")
          .set(wave, { attr: { "data-active": "true" } }, "<")
          .call(() => void (hint.textContent = "Listening · release to send"), undefined, "<")
          .to("[data-ha]", { autoAlpha: 1, duration: 0.3 }, "<")
          .fromTo(aWords, { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.13, ease: "none" }, "<")
          .set(orb, { attr: { "data-state": "thinking" } }, "+=0.5")
          .set(wave, { attr: { "data-active": "false" } }, "<")
          .call(() => void (hint.textContent = "Scoring against 4 rubric points"), undefined, "<")
          .to("[data-hstatus]", { autoAlpha: 1, y: 0, duration: 0.5, ease: ease.soft }, "<")
          .to("[data-hstatus-fill]", { scaleX: 1, duration: 2, ease: "power1.inOut" }, "<")
          .to(["[data-hq]", "[data-ha]", "[data-hstatus]"], { autoAlpha: 0, y: -10, duration: 0.5 }, "+=0.6")
          .set(["[data-hq]", "[data-ha]", "[data-hstatus]"], { y: 0 })
          .set("[data-hq]", { autoAlpha: 1 })
          .set("[data-hstatus-fill]", { scaleX: 0 });

        // ---- Scroll away: the product recedes as the story begins. ----
        gsap.to("[data-hero-stage]", {
          scale: 0.9,
          yPercent: 8,
          autoAlpha: 0.25,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pb-16 lg:pt-24"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 opacity-70" />
        <div className="absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(19,74,58,0.55),transparent)]" />
        <div className="absolute right-[-10%] top-[30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,61,0.16),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-10">
        <div>
          <p data-intro data-hero-eyebrow className="eyebrow flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 normal-case tracking-normal text-cream/80">
              <span className="size-1.5 rounded-full bg-ember" />
              Closed beta · Android
            </span>
            Voice-first interview coach
          </p>

          <h1
            data-intro
            data-hero-title
            className="mt-7 font-serif text-[3.4rem] leading-[0.95] tracking-[-0.015em] sm:text-7xl lg:text-[6.6rem]"
          >
            Confidence
            <br />
            isn&apos;t given.
            <br />
            <span className="italic text-ember">It&apos;s built.</span>
          </h1>

          <div data-intro data-hero-copy>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-mist text-pretty">
              Answer real technical questions out loud. Get feedback on every point you covered and every point you
              missed, see which skills are holding you back, and practise exactly those.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="#interview">Experience the product</Button>
              <Button href={links.beta} variant="ghost" icon={false}>
                Join the closed beta
              </Button>
            </div>
          </div>
        </div>

        <div data-hero-stage className="relative mx-auto w-full max-w-[460px] lg:mr-0">
          <div data-intro data-hero-panel>
            <InterviewPanel mode="Practice interview" counter="Q 3 / 6" progress={0.42}>
              <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ember/90">
                Java · Collections · Medium
              </p>
              <p
                data-hq
                className="mt-3 text-center font-serif text-[1.55rem] leading-[1.18] text-cream text-balance sm:text-[1.75rem]"
              >
                {question.split(" ").map((w, i) => (
                  <span key={i}>{w} </span>
                ))}
              </p>
              <p data-ha className="mt-5 rounded-2xl border border-sage/20 bg-sage/[0.07] px-4 py-3 text-sm leading-relaxed text-cream/85">
                {answer.split(" ").map((w, i) => (
                  <span key={i}>{w} </span>
                ))}
              </p>
              <div data-hstatus className="invisible mt-3 flex items-center gap-3 text-xs text-mist">
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span data-hstatus-fill className="block h-full origin-left scale-x-0 rounded-full bg-sage" />
                </span>
                Evaluating
              </div>
            </InterviewPanel>
          </div>

          <div
            data-intro
            data-hero-chip
            className="absolute -left-4 top-24 hidden rounded-2xl border border-white/10 bg-ink-800/90 px-4 py-3 shadow-2xl backdrop-blur sm:block lg:-left-16"
          >
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fog">Target skill</p>
            <p className="mt-1 text-sm font-medium">HashMap internals</p>
            <p className="mt-0.5 text-xs text-honey">Your weakest Java skill</p>
          </div>
          <div
            data-intro
            data-hero-chip
            className="absolute -right-3 bottom-6 hidden rounded-2xl border border-white/10 bg-ink-800/90 px-4 py-3 shadow-2xl backdrop-blur sm:block lg:-right-10"
          >
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fog">Rubric</p>
            <div className="mt-2 flex gap-1.5">
              <span className="h-1.5 w-6 rounded-full bg-sage" />
              <span className="h-1.5 w-6 rounded-full bg-sage" />
              <span className="h-1.5 w-6 rounded-full bg-honey" />
              <span className="h-1.5 w-6 rounded-full bg-white/15" />
            </div>
            <p className="mt-2 text-xs text-mist">4 points per question</p>
          </div>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fog">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-fog to-transparent" />
      </div>
    </section>
  );
}
