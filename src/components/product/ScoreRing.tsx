/** Circular score with an arc drawn by the parent's timeline (`data-ring-arc`). */
export function ScoreRing({
  value,
  label,
  color,
  size = 112,
}: {
  value: number;
  label: string;
  color: string;
  size?: number;
}) {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <figure className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(246,241,234,0.08)" strokeWidth="6" />
          <circle
            data-ring-arc
            data-value={value}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - value / 100)}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          <span className="font-serif text-[2.1rem] leading-none">
            <span data-count={value}>{value}</span>
          </span>
        </span>
      </div>
      <figcaption className="text-xs font-medium uppercase tracking-[0.14em] text-mist">{label}</figcaption>
    </figure>
  );
}
