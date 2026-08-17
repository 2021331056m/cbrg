"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-16 z-40 bg-[#002147] border-b border-white/10 shadow-xl md:hidden text-white"
        >
          <nav className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1">
            {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    active
                      ? "text-white bg-[#0284C7] font-semibold"
                      : "text-slate-200 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
