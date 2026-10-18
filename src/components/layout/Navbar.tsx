"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { links, navLinks } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled || open
          ? "border-b border-white/[0.07] bg-night/[0.92] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-10">
        <Wordmark />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="rounded-full px-4 py-2 text-sm text-mist transition-colors hover:text-cream">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={links.beta}
            className="hidden rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-night transition-colors hover:bg-white sm:inline-flex"
          >
            Join the beta
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-cream transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-4 bg-cream transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        ref={progress}
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-ember to-honey"
      />

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] border-t border-white/[0.07] bg-night px-4 pb-10 pt-6 lg:hidden"
      >
        <ul className="flex flex-col">
          {navLinks.map((l) => (
            <li key={l.href} className="border-b border-white/[0.07]">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 font-serif text-4xl"
              >
                {l.label}
                <span aria-hidden className="text-base text-ember">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <a href={links.beta} className="mt-8 flex justify-center rounded-full bg-ember px-6 py-4 font-semibold text-night">
          Join the closed beta
        </a>
      </div>
    </header>
  );
}
