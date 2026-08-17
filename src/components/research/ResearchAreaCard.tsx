"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Dna, BarChart2, Activity, User, Search, Monitor } from "lucide-react";
import type { ResearchArea } from "@/types";

const ICONS: Record<string, React.ElementType> = {
  "molecular-oncology":    Dna,
  "cancer-genomics":       BarChart2,
  "transcriptomics":       Activity,
  "personalized-medicine": User,
  "biomarker-discovery":   Search,
  "bioinformatics":        Monitor,
};

interface ResearchAreaCardProps {
  area: ResearchArea;
}

export default function ResearchAreaCard({ area }: ResearchAreaCardProps) {
  const Icon = ICONS[area.slug] ?? Dna;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={`/research/${area.slug}`}
        className="group block bg-[#0A1628] border border-white/5 hover:border-[#00D4FF]/25 rounded-xl p-7 transition-all duration-200 hover:bg-[#0F1F3D] h-full"
      >
        <div className="w-12 h-12 rounded-xl bg-[#0D4F6B]/30 group-hover:bg-[#0D4F6B]/60 flex items-center justify-center mb-5 transition-colors">
          <Icon className="w-6 h-6 text-[#00D4FF]" />
        </div>
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#00D4FF] transition-colors">
          {area.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{area.description}</p>
        <div className="mt-5 flex items-center gap-1.5 text-[#00D4FF] text-xs font-semibold">
          Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}
