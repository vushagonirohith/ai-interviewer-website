export type OrbState = "speaking" | "listening" | "thinking";

/**
 * The interviewer's presence. Ember while it speaks, sage while it listens,
 * a slow shimmer while it thinks. State lives in `data-state`, so GSAP
 * timelines can switch it without re-rendering React.
 */
export function VoiceOrb({
  state = "speaking",
  size = 120,
  className = "",
}: {
  state?: OrbState;
  size?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      data-orb
      data-state={state}
      className={`orb ${className}`}
      style={{ ["--orb-size" as string]: `${size}px` }}
    >
      <span className="orb__halo" />
      <span className="orb__ring" />
      <span className="orb__ring" />
      <span className="orb__ring" />
      <span className="orb__core orb__core--speak" />
      <span className="orb__core orb__core--listen" />
    </div>
  );
}
