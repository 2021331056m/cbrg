"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDown, ArrowRight } from "lucide-react";

const PAGES = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research Areas" },
  { href: "/projects", label: "Research Projects" },
  { href: "/publications", label: "Scientific Publications" },
  { href: "/members", label: "Our Members" },
  { href: "/alumni", label: "Group Alumni" },
  { href: "/funding", label: "Research Funding" },
  { href: "/news", label: "Latest News" },
  { href: "/contact", label: "Get In Touch" },
];

export default function NextPageBanner() {
  const pathname = usePathname();

  let currentIndex = PAGES.findIndex((p) => p.href === pathname);
  if (currentIndex === -1) {
    const matchIndex = PAGES.findIndex(
      (p) => p.href !== "/" && pathname.startsWith(p.href)
    );
    if (matchIndex !== -1) {
      currentIndex = matchIndex;
    }
  }

  if (currentIndex === -1 || currentIndex >= PAGES.length - 1) {
    return null;
  }

  const nextPage = PAGES[currentIndex + 1];

  return (
    <div className="snap-section bg-[#F1F5F9] border-t border-slate-200 py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-3">
        <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest flex items-center gap-1.5">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          Scroll down or click to continue
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-[#0F172A]">
          Next: {nextPage.label}
        </h3>
        <Link
          href={nextPage.href}
          className="mt-2 inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0284C7] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md group"
        >
          Go to {nextPage.label}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
