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
    <section className="py-20 px-4 bg-[#050B18]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold text-[#00D4FF] uppercase tracking-widest">
            Research Focus
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">
            Our Research Areas
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">
            Six interconnected sub-disciplines driving our mission to decode cancer at the molecular level.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  className="group block card"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0D4F6B]/40 group-hover:bg-[#0D4F6B]/70 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#00D4FF] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {area.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[#00D4FF] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm text-[#00D4FF] hover:text-white transition-colors"
          >
            View all research areas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
