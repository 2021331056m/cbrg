"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  tag?: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ tag, title, subtitle }: PageHeroProps) {
  return (
    <section className="snap-section relative pt-28 pb-16 px-4 overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#F8FAFC] border-b border-slate-200">
      {/* Background gradient & glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0284C7]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tag && (
            <p className="text-xs font-bold text-[#0284C7] uppercase tracking-widest mb-3">
              {tag}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#002147] leading-tight">{title}</h1>
          {subtitle && (
            <p className="mt-4 text-slate-600 text-lg max-w-2xl leading-relaxed font-normal">{subtitle}</p>
          )}
          <div className="mt-5 h-1 w-16 bg-[#0284C7] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
