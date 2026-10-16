import Link from "next/link";
import { site } from "@/lib/site";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={`${site.name} home`}>
      <span aria-hidden className="relative grid size-7 place-items-center">
        <span className="absolute inset-0 rounded-full bg-ember/25 blur-[6px]" />
        <span className="relative size-3.5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffc2a8,#ff6b3d_45%,#d9481c)] transition-transform duration-500 group-hover:scale-110" />
        <span className="absolute inset-0 rounded-full border border-ember/40" />
      </span>
      <span className="text-[1.02rem] font-semibold tracking-tight">{site.name}</span>
    </Link>
  );
}
