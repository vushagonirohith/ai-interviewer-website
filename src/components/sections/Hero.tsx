"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { DESKTOP, MOTION_OK, POINTER_FINE, REDUCED, ease, wipe } from "@/lib/motion";
import { links } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { InterviewPanel } from "@/components/product/InterviewPanel";

const question = "Walk me through what happens when two keys in a HashMap land in the same bucket.";
const answer = "Both entries live in that bucket as a chain. On lookup it compares the hash first, then calls equals…";
const rubricPips = ["bg-sage", "bg-sage", "bg-honey", "bg-white/15"];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(REDUCED, () => {
        gsap.set("[data-intro]", { autoAlpha: 1 });
      });

      mm.add(MOTION_OK, () => {
        const panel = q("[data-hero-panel]")[0];
        const orbEl = panel.querySelector<HTMLElement>("[data-orb]")!;
        const scramble = q("[data-hero-scramble]")[0];
        const eyebrowText = scramble.textContent ?? "";
        scramble.textContent = "";

        // The room opens out of the interviewer: clip circle centred on the orb.
        const pr = panel.getBoundingClientRect();
        const or = orbEl.getBoundingClientRect();
        const at = `at ${(((or.left + or.width / 2 - pr.left) / pr.width) * 100).toFixed(1)}% ${(
          ((or.top + or.height / 2 - pr.top) / pr.height) *
          100
        ).toFixed(1)}%`;

        const l2 = SplitText.create("[data-l2]", { type: "words", mask: "words", aria: "hidden" });
        const l3 = SplitText.create("[data-l3]", { type: "chars", aria: "hidden" });

        // ---- Intro: the headline is assembled, then the interviewer arrives. ----
        // Unhide before building: the from() tweens below then re-hide exactly
        // the pieces they own, and nothing flashes before its cue.
        gsap.set("[data-intro]", { visibility: "visible" });
        const intro = gsap.timeline({ defaults: { ease: ease.out } });
        intro
          .fromTo("[data-hero-glow]", { autoAlpha: 0, scale: 0.75 }, { autoAlpha: 1, scale: 1, duration: 2.6, ease: ease.soft }, 0)
          .fromTo("[data-hero-pill]", { clipPath: wipe.hidden }, { clipPath: wipe.shown, duration: 0.9, ease: ease.wipe }, 0.1)
          .to(scramble, { duration: 1.3, scrambleText: { text: eyebrowText, chars: "lowerCase", speed: 0.6 }, ease: "none" }, 0.3)
          .from(
            "[data-l1]",
            { yPercent: 112, letterSpacing: "0.14em", duration: 1.5, clearProps: "letterSpacing" },
            0.2,
          )
          .from(l2.words, { yPercent: 112, duration: 1.15, stagger: 0.09 }, 0.5)
          // "It's built." — each letter drops into place, like something being made.
          .from(
            l3.chars,
            {
              yPercent: -95,
              rotate: () => gsap.utils.random(-16, 16),
              autoAlpha: 0,
              duration: 0.95,
              stagger: 0.055,
              ease: ease.build,
              onComplete: () => l3.revert(), // restore the font's kerning
            },
            0.85,
          )
          .fromTo("[data-hero-underline]", { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, ease: ease.inOut }, ">-0.35")
          .from("[data-hero-copy] > *", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 }, 1.05)
          .fromTo(panel, { clipPath: `circle(0px ${at})` }, { clipPath: `circle(70px ${at})`, duration: 0.8 }, 0.55)
          .from(orbEl, { scale: 0.3, duration: 1.1 }, 0.55)
          .to(panel, { clipPath: `circle(150% ${at})`, duration: 1.5, ease: ease.inOut, clearProps: "clipPath" }, 1.2)
          // The wrapper, not its children: the loop below owns the children.
          .from("[data-panel-content]", { y: 18, autoAlpha: 0, duration: 1 }, 1.65)
          .from("[data-hero-chip]", { x: (i: number) => (i ? -70 : 70), autoAlpha: 0, duration: 1.1, stagger: 0.15 }, 2.05);

        // ---- The live interview loop; the side chips play along. ----
        const qWords = q("[data-hq] span");
        const aWords = q("[data-ha] span");
        const orb = "[data-hero-panel] [data-orb]";
        const wave = "[data-hero-panel] [data-wave]";
        const hint = q("[data-hero-panel] [data-hint]")[0];
        const skillGlow = "0 0 0 1px rgba(233,169,59,0.55), 0 24px 60px -18px rgba(233,169,59,0.45)";
        const restGlow = "0 0 0 0px rgba(233,169,59,0), 0 25px 50px -12px rgba(0,0,0,0.25)";

        const loop = gsap.timeline({ repeat: -1, repeatDelay: 0.6, delay: 2.2 });
        loop
          .set(orb, { attr: { "data-state": "speaking" } })
          .set(wave, { attr: { "data-active": "false" } })
          .call(() => void (hint.textContent = "Interviewer is asking…"))
          .set("[data-ha]", { autoAlpha: 0 })
          .set("[data-hstatus]", { autoAlpha: 0, y: 8 })
          .to("[data-chip-pip]", { scaleX: 0, duration: 0.3, ease: ease.soft }, 0)
          .to("[data-chip-skill]", { boxShadow: skillGlow, duration: 0.6, ease: ease.soft }, 0.2)
          .fromTo(qWords, { opacity: 0.12 }, { opacity: 1, duration: 0.25, stagger: 0.11, ease: "none" }, 0)
          .to("[data-chip-skill]", { boxShadow: restGlow, duration: 0.8, ease: ease.soft })
          .set(orb, { attr: { "data-state": "listening" } }, "<")
          .set(wave, { attr: { "data-active": "true" } }, "<")
          .call(() => void (hint.textContent = "Listening · release to send"), undefined, "<")
          .to("[data-ha]", { autoAlpha: 1, duration: 0.3 }, "<")
          .fromTo(aWords, { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.13, ease: "none" }, "<")
          .set(orb, { attr: { "data-state": "thinking" } }, "+=0.5")
          .set(wave, { attr: { "data-active": "false" } }, "<")
          .call(() => void (hint.textContent = "Scoring against 4 rubric points"), undefined, "<")
          .to("[data-hstatus]", { autoAlpha: 1, y: 0, duration: 0.5, ease: ease.soft }, "<")
          .to("[data-hstatus-fill]", { scaleX: 1, duration: 2, ease: "power1.inOut" }, "<")
          .to("[data-chip-pip]", { scaleX: 1, duration: 0.45, stagger: 0.42, ease: ease.out }, "<0.2")
          .call(() => void (hint.textContent = "Next question…"), undefined, "+=0.6")
          .to(["[data-hq]", "[data-ha]", "[data-hstatus]"], { autoAlpha: 0, y: -10, duration: 0.5 }, "<")
          .set(["[data-hq]", "[data-ha]", "[data-hstatus]"], { y: 0 })
          .set("[data-hq]", { autoAlpha: 1 })
          .set("[data-hstatus-fill]", { scaleX: 0 });

        // No point animating a loop nobody can see.
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => void loop.paused(!self.isActive),
        });

        // ---- Scroll away: lines drift apart at different depths, the product recedes. ----
        const away = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-par]", { y: (_: number, el: HTMLElement) => -Number(el.dataset.par) * 520, ease: "none", scrollTrigger: away });
        gsap.to("[data-hero-copy]", { y: -50, autoAlpha: 0.15, ease: "none", scrollTrigger: away });
        gsap.to("[data-hero-stage]", { scale: 0.9, yPercent: 8, autoAlpha: 0.25, ease: "none", scrollTrigger: away });

        return () => {
          l2.revert();
          l3.revert();
          scramble.textContent = eyebrowText;
        };
      });

      // ---- Desktop with a mouse: the stage leans toward the pointer. ----
      mm.add(`${DESKTOP} and ${MOTION_OK} and ${POINTER_FINE}`, () => {
        const tilt = q("[data-hero-tilt]")[0];
        gsap.set(tilt, { transformPerspective: 1400 });
        const rotY = gsap.quickTo(tilt, "rotationY", { duration: 1.2, ease: ease.soft });
        const rotX = gsap.quickTo(tilt, "rotationX", { duration: 1.2, ease: ease.soft });
        const chips = q("[data-hero-chip]").map((el, i) => ({
          x: gsap.quickTo(el, "xPercent", { duration: 1.4, ease: ease.soft }),
          y: gsap.quickTo(el, "yPercent", { duration: 1.4, ease: ease.soft }),
          depth: i ? 9 : -12,
        }));
        const glowX = gsap.quickTo("[data-hero-ember]", "x", { duration: 2, ease: ease.soft });
        const glowY = gsap.quickTo("[data-hero-ember]", "y", { duration: 2, ease: ease.soft });

        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          rotY(nx * 7);
          rotX(-ny * 5);
          chips.forEach((c) => {
            c.x(nx * c.depth);
            c.y(ny * c.depth);
          });
          glowX(nx * 80);
          glowY(ny * 60);
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
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
        <div
          data-hero-glow
          className="absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(19,74,58,0.55),transparent)]"
        />
        <div
          data-hero-ember
          className="absolute right-[-10%] top-[30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,61,0.16),transparent)]"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-10">
        <div>
          <p data-intro className="eyebrow flex flex-wrap items-center gap-3">
            <span
              data-hero-pill
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 normal-case tracking-normal text-cream/80"
            >
              <span className="size-1.5 rounded-full bg-ember" />
              Closed beta · Android
            </span>
            <span data-hero-scramble>Voice-first interview coach</span>
          </p>

          <h1
            data-intro
            className="mt-7 font-serif text-[3.4rem] leading-[0.95] tracking-[-0.015em] sm:text-7xl lg:text-[6.6rem]"
          >
            <span data-par="0.05" className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
              <span data-l1 className="inline-block">
                Confidence
              </span>
            </span>{" "}
            <span data-par="0.1" data-l2 className="block">
              isn&apos;t given.
            </span>{" "}
            <span data-par="0.17" className="relative block w-fit">
              <span data-l3 className="italic text-ember">
                It&apos;s built.
              </span>
              <svg
                aria-hidden
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[0.1em] left-[0.04em] h-[0.2em] w-[96%] overflow-visible"
              >
                <path
                  data-hero-underline
                  d="M4 15 C 58 8, 132 5, 204 9 S 276 17, 296 10"
                  fill="none"
                  stroke="var(--color-ember)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity="0.85"
                />
              </svg>
            </span>
          </h1>

          <div data-intro data-hero-copy>
            <p className="mt-9 max-w-lg text-lg leading-relaxed text-mist text-pretty">
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
          <div data-hero-tilt className="relative">
            <div data-intro data-hero-panel>
              <InterviewPanel mode="Practice interview" counter="Q 3 / 6" progress={0.42}>
                <div data-panel-content>
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
                  <p
                    data-ha
                    className="mt-5 rounded-2xl border border-sage/20 bg-sage/[0.07] px-4 py-3 text-sm leading-relaxed text-cream/85"
                  >
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
                </div>
              </InterviewPanel>
            </div>

            <div
              data-intro
              data-hero-chip
              data-chip-skill
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
                {rubricPips.map((c, i) => (
                  <span key={i} className="h-1.5 w-6 overflow-hidden rounded-full bg-white/10">
                    <span data-chip-pip className={`block size-full origin-left rounded-full ${c}`} />
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-mist">4 points per question</p>
            </div>
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
