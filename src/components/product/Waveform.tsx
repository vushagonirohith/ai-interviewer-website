/** Deterministic bar heights so server and client render identically. */
const heights = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const v = Math.abs(Math.sin(i * 1.7) * 0.55 + Math.sin(i * 0.53) * 0.4);
    return Math.max(0.22, Math.min(1, v + 0.15)).toFixed(2);
  });

export function Waveform({
  bars = 28,
  active = true,
  className = "",
}: {
  bars?: number;
  active?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden data-wave data-active={active} className={`wave ${className}`}>
      {heights(bars).map((h, i) => (
        <span key={i} style={{ ["--h" as string]: h, ["--i" as string]: i }} />
      ))}
    </div>
  );
}
