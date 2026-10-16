import type { ReactNode } from "react";
import { VoiceOrb } from "./VoiceOrb";

/**
 * Faithful web recreations of the Flutter app's screens in its own light
 * theme (cream content, pine stage, ember actions). Swap any of these for a
 * real screenshot by rendering <img src="/app-screens/..."> inside PhoneFrame.
 */
export function PhoneFrame({ children, label, className = "" }: { children: ReactNode; label: string; className?: string }) {
  return (
    <figure className={`flex flex-col items-center ${className}`}>
      <div className="relative w-[248px] rounded-[44px] bg-[#0b0d0c] p-[9px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="relative aspect-[9/19.2] overflow-hidden rounded-[36px] bg-[#f6f1ea] text-ink">
          <span aria-hidden className="absolute left-1/2 top-2.5 z-20 h-[18px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
          {children}
        </div>
      </div>
      <figcaption className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">{label}</figcaption>
    </figure>
  );
}

function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-6 pt-3 text-[9px] font-semibold ${light ? "text-cream" : "text-ink"}`}>
      <span>9:41</span>
      <span className="flex gap-1">
        <span className="h-[7px] w-3 rounded-[2px] border border-current" />
      </span>
    </div>
  );
}

function PineHeader({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-b-[28px] bg-[#0c3b2e] pb-12 text-cream">
      <StatusBar light />
      <div className="px-5 pt-5">{children}</div>
    </div>
  );
}

export function HomeScreen() {
  return (
    <div className="h-full">
      <PineHeader>
        <p className="text-[10px] text-cream/60">Good evening</p>
        <p className="font-serif text-[22px] leading-tight">Ready to practise?</p>
        <div className="mt-3 flex gap-2">
          {[
            ["12", "interviews"],
            ["4", "day streak"],
          ].map(([v, l]) => (
            <span key={l} className="rounded-full bg-white/10 px-2.5 py-1 text-[9px]">
              <b className="text-[#ff6b3d]">{v}</b> {l}
            </span>
          ))}
        </div>
      </PineHeader>
      <div className="relative z-10 -mt-8 space-y-2.5 px-3.5">
        <div className="rounded-2xl bg-[#fffdf9] p-3 shadow-[0_6px_20px_-8px_rgba(12,59,46,0.25)]">
          <p className="text-[8px] font-bold uppercase tracking-wider text-[#d9481c]">Continue</p>
          <p className="mt-1 text-[11px] font-semibold">Real interview · Q 5 of 12</p>
          <div className="mt-2 h-1 rounded-full bg-[#ffe3d8]">
            <div className="h-full w-[40%] rounded-full bg-[#ff6b3d]" />
          </div>
        </div>
        <div className="rounded-2xl bg-[#fffdf9] p-3 shadow-[0_6px_20px_-8px_rgba(12,59,46,0.25)]">
          <div className="flex justify-between">
            <p className="text-[11px] font-semibold">Your skills</p>
            <p className="text-[9px] font-bold text-[#d9481c]">See all</p>
          </div>
          {[
            ["Java", "#c4704b", 62],
            ["SQL", "#5e8a66", 74],
            ["OS", "#7e8340", 41],
          ].map(([n, c, v]) => (
            <div key={n as string} className="mt-2">
              <div className="flex justify-between text-[9px] text-[#6b746f]">
                <span>{n}</span>
                <span>{v}</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-black/[0.06]">
                <div className="h-full rounded-full" style={{ width: `${v}%`, background: c as string }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-full bg-[#ff6b3d] py-2.5 text-center text-[11px] font-bold text-[#0c1210]">
          Start an interview
        </div>
      </div>
    </div>
  );
}

export function SetupScreen() {
  const modes = ["Quick", "Practice", "Real", "Topic", "Weak areas", "Pressure"];
  const subjects: [string, string][] = [
    ["Java", "#c4704b"],
    ["Python", "#d99a2b"],
    ["SQL", "#5e8a66"],
    ["DSA", "#8b5e83"],
  ];
  return (
    <div className="h-full">
      <PineHeader>
        <p className="font-serif text-[22px] leading-tight">New interview</p>
        <p className="mt-1 text-[10px] text-cream/60">Pick how you want to practise</p>
      </PineHeader>
      <div className="relative z-10 -mt-8 px-3.5">
        <div className="rounded-2xl bg-[#fffdf9] p-3 shadow-[0_6px_20px_-8px_rgba(12,59,46,0.25)]">
          <p className="text-[8px] font-bold uppercase tracking-wider text-[#6b746f]">Mode</p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {modes.map((m) => (
              <span
                key={m}
                className={`rounded-xl px-2 py-2 text-center text-[10px] font-semibold ${
                  m === "Practice" ? "bg-[#ff6b3d] text-[#0c1210]" : "bg-black/[0.04]"
                }`}
              >
                {m}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[8px] font-bold uppercase tracking-wider text-[#6b746f]">Subjects</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {subjects.map(([n, c], i) => (
              <span
                key={n}
                className="flex items-center gap-1 rounded-full border px-2 py-1 text-[9px]"
                style={{ borderColor: i < 2 ? c : "rgba(0,0,0,0.1)", background: i < 2 ? `${c}1f` : undefined }}
              >
                <span className="size-1.5 rounded-full" style={{ background: c }} />
                {n}
              </span>
            ))}
          </div>
          <p className="mt-3 rounded-xl bg-[#ffe3d8] px-2.5 py-2 text-[9px] leading-snug text-[#7a2d12]">
            6 questions · feedback after every answer
          </p>
        </div>
        <div className="mt-3 rounded-full bg-[#ff6b3d] py-2.5 text-center text-[11px] font-bold text-[#0c1210]">
          Start practice
        </div>
      </div>
    </div>
  );
}

export function RoomScreen() {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#134a3a,#0c3b2e_45%,#0a2c22)] text-cream">
      <StatusBar light />
      <div className="flex items-center justify-between px-5 pt-5 text-[9px] text-cream/60">
        <span>Practice</span>
        <span>Q 3 / 6</span>
      </div>
      <div className="mx-5 mt-2 h-[3px] rounded-full bg-white/10">
        <div className="h-full w-[45%] rounded-full bg-[#ff6b3d]" />
      </div>
      <div className="flex justify-center pt-10">
        <VoiceOrb size={86} state="speaking" />
      </div>
      <p className="mt-6 px-5 text-center text-[8px] font-bold uppercase tracking-wider text-[#ff6b3d]">
        Java · Collections
      </p>
      <p className="mt-2 px-5 text-center font-serif text-[17px] leading-snug">
        What happens when two keys land in the same bucket?
      </p>
      <div className="mt-auto flex flex-col items-center pb-8">
        <span className="grid size-14 place-items-center rounded-full bg-[#ff6b3d] text-[#0c1210] shadow-[0_0_30px_rgba(255,107,61,0.5)]">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
          </svg>
        </span>
        <p className="mt-2 text-[9px] text-cream/60">Hold to answer</p>
      </div>
    </div>
  );
}

export function ReportScreen() {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <div className="h-full">
      <PineHeader>
        <p className="text-[10px] text-cream/60">Interview report</p>
        <p className="font-serif text-[22px] leading-tight">Nicely done.</p>
      </PineHeader>
      <div className="relative z-10 -mt-8 space-y-2.5 px-3.5">
        <div className="flex items-center gap-3 rounded-2xl bg-[#fffdf9] p-3 shadow-[0_6px_20px_-8px_rgba(12,59,46,0.25)]">
          <svg viewBox="0 0 72 72" className="size-[60px] -rotate-90" aria-hidden>
            <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="6" />
            <circle
              cx="36"
              cy="36"
              r={r}
              fill="none"
              stroke="#6d9773"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * 0.28}
            />
          </svg>
          <div>
            <p className="font-serif text-[22px] leading-none">72</p>
            <p className="text-[9px] text-[#6b746f]">Accuracy · 5 of 6 assessed</p>
          </div>
        </div>
        <div className="rounded-2xl bg-[#fffdf9] p-3 shadow-[0_6px_20px_-8px_rgba(12,59,46,0.25)]">
          <p className="text-[8px] font-bold uppercase tracking-wider text-[#6d9773]">What went well</p>
          <p className="mt-1 text-[10px] leading-snug">Clear step-by-step explanation of lookups.</p>
          <p className="mt-2.5 text-[8px] font-bold uppercase tracking-wider text-[#d9481c]">Biggest opportunity</p>
          <p className="mt-1 text-[10px] leading-snug">Resizing and load factor.</p>
        </div>
        <div className="rounded-full bg-[#ff6b3d] py-2.5 text-center text-[11px] font-bold text-[#0c1210]">
          Practise weak areas
        </div>
      </div>
    </div>
  );
}
