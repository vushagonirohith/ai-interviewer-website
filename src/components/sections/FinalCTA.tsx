"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK } from "@/lib/motion";
import { links } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { SplitHeading } from "@/components/animation/SplitHeading";
import { Reveal } from "@/components/animation/Reveal";
import { VoiceOrb } from "@/components/product/VoiceOrb";

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-cta-glow]",
          { scale: 0.6, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Get started" className="relative isolate overflow-hidden py-32 sm:py-44">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 opacity-60" />
        <div
          data-cta-glow
          className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,61,0.22),rgba(19,74,58,0.25)_55%,transparent)]"
        />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6">
        <Reveal>
          <VoiceOrb size={88} />
        </Reveal>
        <SplitHeading className="mt-12 font-serif text-[3rem] leading-[0.98] tracking-[-0.015em] text-balance sm:text-7xl lg:text-[6.5rem]">
          Make your next interview <span className="italic text-ember">a better one.</span>
        </SplitHeading>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-mist">
            We&apos;re opening the Android app to a small group of candidates first. Tell us what you&apos;re preparing
            for and we&apos;ll send you a build.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={links.beta}>Join the closed beta</Button>
            <Button href="/#interview" variant="ghost" icon={false}>
              See it again
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
