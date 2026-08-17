"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  tag,
  title,
  subtitle,
  center = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn("mb-10", center && "text-center", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {tag && (
        <span className="inline-block text-xs font-semibold text-[#00D4FF] uppercase tracking-widest mb-2">
          {tag}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={cn("mt-4 h-0.5 w-12 bg-[#00D4FF]/50 rounded-full", center && "mx-auto")} />
    </motion.div>
  );
}
