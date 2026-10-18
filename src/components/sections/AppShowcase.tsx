"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DESKTOP, MOTION_OK, ease } from "@/lib/motion";
import { SectionIntro } from "@/components/animation/SectionIntro";
import { Reveal } from "@/components/animation/Reveal";
import { HomeScreen, PhoneFrame, ReportScreen, RoomScreen, SetupScreen } from "@/components/product/PhoneScreens";

const screens = [
  { label: "Home", el: <HomeScreen />, offset: 40 },
  { label: "Set up", el: <SetupScreen />, offset: -30 },
  { label: "Interview room", el: <RoomScreen />, offset: 60 },
  { label: "Report", el: <ReportScreen />, offset: -10 },
];

const start = [
  { t: "Create your account", b: "Email and password, confirmed with a 6-digit code." },
  { t: "Pick a mode", b: "Start with Quick: five questions, the gentlest way in." },
  { t: "Speak your answers", b: "Read the report, then practise what it points at." },
];

export function AppShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.from("[data-phone]", {
          y: 120,
          autoAlpha: 0,
          rotate: (i: number) => (i % 2 ? 3 : -3),
          duration: 1.4,
          ease: ease.out,
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-phones]", start: "top 80%", once: true },
        });
      });
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        // The phones arrive as one fanned stack, then deal out to their places.
        const phones = gsap.utils.toArray<HTMLElement>("[data-phone]");
        const row = root.current!.querySelector<HTMLElement>("[data-phones]")!.getBoundingClientRect();
        const centre = row.left + row.width / 2;
        const mid = (phones.length - 1) / 2;
        gsap.set(phones, {
          x: (_: number, el: HTMLElement) => {
            const r = el.getBoundingClientRect();
            return centre - (r.left + r.width / 2);
          },
          rotate: (i: number) => (i - mid) * 5,
        });
        gsap
          .timeline({
            defaults: { ease: ease.out },
            scrollTrigger: { trigger: "[data-phones]", start: "top 78%", once: true },
          })
          .from(phones, { y: 140, autoAlpha: 0, duration: 0.9, stagger: 0.06 })
          .to(phones, { x: 0, rotate: 0, duration: 1.3, ease: ease.inOut, stagger: 0.04 }, ">-0.15")
          // Captions would pile up in the stack; they label each phone once it has landed.
          .from(
            phones.map((p) => p.querySelector("figcaption")),
            { autoAlpha: 0, y: 8, duration: 0.6, stagger: 0.06, immediateRender: true },
            ">-0.35",
          );

        gsap.utils.toArray<HTMLElement>("[data-phone-inner]").forEach((el) => {
          const o = Number(el.dataset.offset);
          gsap.fromTo(
            el,
            { y: o },
            {
              y: -o,
              ease: "none",
              scrollTrigger: { trigger: "[data-phones]", start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Meet the app" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,61,0.09),transparent)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionIntro
          index="07"
          variant="words"
          eyebrow="The app"
          align="center"
          title={
            <>
              Everything above, <span data-emph className="italic text-ember">in your pocket.</span>
            </>
          }
          lede="The website tells the story. The Android app is where the practice happens: cream for reading, pine for the interview room, ember when it's your move."
        />
      </div>

      <div
        data-phones
        className="mt-20 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-8 [scrollbar-width:none] lg:justify-center lg:overflow-visible lg:px-10"
      >
        {screens.map((s) => (
          <div key={s.label} data-phone className="flex-none snap-center">
            <div data-phone-inner data-offset={s.offset}>
              <PhoneFrame label={s.label}>{s.el}</PhoneFrame>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-fog lg:hidden">Swipe to see more screens</p>

      <div className="mx-auto mt-24 max-w-5xl px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-3">
          {start.map((s, i) => (
            <div key={s.t} data-reveal className="bg-night p-7">
              <p className="font-serif text-4xl text-ember">{i + 1}</p>
              <h3 className="mt-4 font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mist">{s.b}</p>
            </div>
          ))}
        </Reveal>
        <p className="mt-6 text-center text-sm text-fog">
          Android first. iOS isn&apos;t available yet. Daily limits keep the beta fair: 15 interviews, 5 resume analyses
          and 10 job analyses per day.
        </p>
      </div>
    </section>
  );
}
