import type { ReactNode } from "react";
import { VoiceOrb, type OrbState } from "./VoiceOrb";
import { Waveform } from "./Waveform";

/**
 * The interview room, recreated for the web. Content slots are provided by
 * the section that uses it; the orb and waveform carry `data-orb` and
 * `data-wave` so the section's timeline can drive them.
 */
export function InterviewPanel({
  mode = "Practice interview",
  counter = "Q 3 / 6",
  progress = 0.42,
  orbState = "speaking",
  waveActive = false,
  hint = "Hold to answer",
  children,
  className = "",
}: {
  mode?: string;
  counter?: ReactNode;
  progress?: number;
  orbState?: OrbState;
  waveActive?: boolean;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#123f31_0%,#0c2a21_38%,#0b1612_100%)] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.02)_inset] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,107,61,0.14),transparent)]"
      />

      <div className="relative flex items-center justify-between px-5 pt-5 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember/70" />
            <span className="relative inline-flex size-2 rounded-full bg-ember" />
          </span>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cream/70">{mode}</span>
        </div>
        <span className="relative font-mono text-[0.68rem] tracking-[0.12em] text-cream/50">{counter}</span>
      </div>

      <div className="relative mx-5 mt-4 h-[3px] overflow-hidden rounded-full bg-white/10 sm:mx-6">
        <div
          data-progress
          className="h-full origin-left rounded-full bg-gradient-to-r from-ember to-honey"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div className="relative flex justify-center pb-2 pt-9">
        <VoiceOrb state={orbState} size={104} />
      </div>

      <div className="relative min-h-[220px] px-5 pb-4 sm:px-7">{children}</div>

      <div className="relative flex items-center gap-4 border-t border-white/[0.08] bg-black/20 px-5 py-4 sm:px-6">
        <span className="grid size-11 flex-none place-items-center rounded-full bg-ember text-night shadow-[0_0_30px_rgba(255,107,61,0.45)]">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p data-hint className="text-[0.8rem] font-medium text-cream/80">
            {hint}
          </p>
          <Waveform bars={34} active={waveActive} className="mt-1 text-sage" />
        </div>
      </div>
    </div>
  );
}
