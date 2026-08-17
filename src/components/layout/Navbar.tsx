"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRIMARY_NAV, SECONDARY_NAV, SITE_NAME } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [opaque, setOpaque] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setOpaque(y > 30);
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#002147] text-white",
          opaque
            ? "bg-[#002147]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/10"
            : "border-b border-white/10"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Primary nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/images/logo-icon.png"
                alt={SITE_NAME}
                width={38}
                height={38}
                className="rounded-md group-hover:scale-105 transition-transform duration-200 border border-white/10"
                priority
              />
              <span className="font-bold text-white text-xs tracking-wide leading-tight hidden sm:block max-w-[130px]">
                CBRG<br />
                <span className="text-[#38BDF8] font-semibold text-[10px] tracking-wider uppercase">
                  SUST Bangladesh
                </span>
              </span>
            </Link>

            {/* Desktop primary nav */}
            <nav className="hidden md:flex items-center gap-1">
              {PRIMARY_NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150",
                      active
                        ? "text-white bg-[#0284C7] shadow-sm font-semibold"
                        : "text-slate-200 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop secondary nav */}
            <div className="hidden md:flex items-center gap-1 border-l border-white/10 pl-3 ml-2">
              {SECONDARY_NAV.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
                      active
                        ? "text-[#38BDF8] bg-white/10 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
