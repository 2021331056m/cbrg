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
    setOpaque(y > 60);
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          opaque
            ? "bg-[#050B18]/90 backdrop-blur-sm border-b site-border"
            : "bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Primary nav */}
        <div className="container">
          <div className="flex items-center justify-between py-4 md:py-5">
            {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logo-icon.png"
                alt={SITE_NAME}
                width={40}
                height={40}
                className="rounded-md group-hover:scale-105 transition-transform duration-200"
                priority
              />
              <span className="font-bold text-white text-sm tracking-wide leading-tight hidden sm:block">
                CBRG
                <span className="block text-[#00D4FF] font-normal text-xs">SUST</span>
              </span>
            </Link>

            {/* Desktop primary nav */}
            <nav className="hidden md:flex items-center gap-3">
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
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                      active
                        ? "text-[#00D4FF] bg-[#00D4FF]/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop secondary nav */}
            <div className="hidden md:flex items-center gap-3">
              {SECONDARY_NAV.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
                      active
                        ? "text-[#00D4FF] bg-[#00D4FF]/10"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
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
