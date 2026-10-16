import type { ReactNode } from "react";
import { SplitHeading } from "@/components/animation/SplitHeading";

/** Shared frame for the simple text pages (About, Privacy, 404). */
export function PageShell({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="relative isolate overflow-hidden pb-28 pt-36 sm:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-x-0 top-0 h-[600px] opacity-60" />
        <div className="absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(19,74,58,0.5),transparent)]" />
      </div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="eyebrow">{eyebrow}</p>
        <SplitHeading
          as="h1"
          start="top 100%"
          className="mt-6 font-serif text-[3rem] leading-[1] tracking-[-0.015em] text-balance sm:text-7xl"
        >
          {title}
        </SplitHeading>
        {lede && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist text-pretty">{lede}</p>}
        {children}
      </div>
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mt-16 space-y-14 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:sm:text-4xl [&_li]:leading-relaxed [&_li]:text-mist [&_p]:leading-relaxed [&_p]:text-mist [&_strong]:font-semibold [&_strong]:text-cream [&_ul]:space-y-3">
      {children}
    </div>
  );
}
