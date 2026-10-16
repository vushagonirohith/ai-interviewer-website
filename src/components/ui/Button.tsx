import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary:
    "bg-ember text-night hover:bg-[#ff8257] shadow-[0_10px_40px_-12px_rgba(255,107,61,0.7)]",
  ghost: "border border-white/15 text-cream hover:border-white/35 hover:bg-white/5",
  light: "bg-cream text-night hover:bg-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  icon = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
}) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-all duration-300 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {inner}
    </a>
  );
}
