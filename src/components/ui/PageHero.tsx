"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  tag?: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ tag, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-16 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] to-[#050B18] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0D4F6B]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tag && (
            <p className="text-xs font-semibold text-[#00D4FF] uppercase tracking-widest mb-3">
              {tag}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">{title}</h1>
          {subtitle && (
            <p className="mt-4 lead max-w-2xl leading-relaxed">{subtitle}</p>
          )}
          <div className="mt-5 h-0.5 w-16 bg-[#00D4FF]/50 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
