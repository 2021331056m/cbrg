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

interface ResearchHighlightsProps {
  areas: ResearchArea[];
}

export default function ResearchHighlights({ areas }: ResearchHighlightsProps) {
  return (
    <section className="snap-section py-20 px-4 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest">
            Research Focus
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#002147]">
            Our Research Areas
          </h2>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto text-base">
            Six interconnected sub-disciplines driving our mission to decode cancer at the molecular level.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, i) => {
            const Icon = ICONS[area.slug] ?? Dna;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={`/research/${area.slug}`}
                  className="group block bg-white border border-slate-200 hover:border-[#0284C7] rounded-xl p-6 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#0284C7]/10 group-hover:bg-[#002147] flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5.5 h-5.5 text-[#0284C7] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[#0F172A] font-bold text-base mb-2 group-hover:text-[#0284C7] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {area.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[#0284C7] text-xs font-semibold">
                    Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0284C7] hover:text-[#002147] transition-colors"
          >
            View all research areas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
