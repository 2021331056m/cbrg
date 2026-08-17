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
      className="h-full"
    >
      <Link
        href={`/research/${area.slug}`}
        className="group block bg-white border border-slate-200 hover:border-[#0284C7] rounded-xl p-7 transition-all duration-200 shadow-sm hover:shadow-md h-full flex flex-col justify-between"
      >
        <div>
          <div className="w-12 h-12 rounded-xl bg-[#0284C7]/10 group-hover:bg-[#002147] flex items-center justify-center mb-5 transition-colors">
            <Icon className="w-6 h-6 text-[#0284C7] group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-[#0F172A] font-bold text-lg mb-2 group-hover:text-[#0284C7] transition-colors">
            {area.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">{area.description}</p>
        </div>
        <div className="mt-5 flex items-center gap-1.5 text-[#0284C7] text-xs font-bold">
          Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}
