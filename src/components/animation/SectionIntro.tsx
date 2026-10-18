import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SplitHeading, type HeadingVariant } from "./SplitHeading";

/**
 * The eyebrow + headline + lede trio that opens most sections. Mark the key
 * phrase in `title` with `data-emph` to give it its own reveal beat.
 */
export function SectionIntro({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
  variant = "rise",
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  variant?: HeadingVariant;
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Reveal>
        <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <span className="text-ember">{index}</span>
          <span aria-hidden className="h-px w-8 bg-white/20" />
          {eyebrow}
        </p>
      </Reveal>
      <SplitHeading
        variant={variant}
        className="mt-6 font-serif text-[2.6rem] leading-[1.02] tracking-[-0.01em] text-balance sm:text-6xl lg:text-[4.5rem]"
      >
        {title}
      </SplitHeading>
      {lede && (
        <Reveal delay={0.15}>
          <p className={`mt-6 max-w-xl text-lg leading-relaxed text-mist text-pretty ${center ? "mx-auto" : ""}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
