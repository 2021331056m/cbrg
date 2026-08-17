"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Microscope } from "lucide-react";
import DNAHelix from "./DNAHelix";

const words = ["Cancer", "Biology", "Research", "Group"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark gradient background (video placeholder) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020810] via-[#050B18] to-[#0A1628]" />

      {/* Radial glow top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0D4F6B]/25 rounded-full blur-[120px] pointer-events-none" />
      {/* Radial glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00D4FF]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Molecular grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, #00D4FF 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* DNA Helix — left */}
      <div className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2">
        <DNAHelix />
      </div>
      {/* DNA Helix — right (mirrored via scale) */}
      <div className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 scale-x-[-1]">
        <DNAHelix />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-[#00D4FF]/10 border border-[#00D4FF]/20 rounded-full px-4 py-1.5 mb-8"
        >
          <Microscope className="w-3.5 h-3.5 text-[#00D4FF]" />
          <span className="text-xs font-medium text-[#00D4FF] tracking-wider uppercase">
            Molecular Oncology &amp; Theranostics
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
          {words.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              {i < 2 ? (
                <span className="text-white">{word}</span>
              ) : (
                <span
                  style={{
                    background: "linear-gradient(135deg, #00D4FF, #1A6F91)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {word}
                </span>
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="lead text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Pioneering discoveries in cancer molecular biology, genomics, and personalized
          medicine at Shahjalal University of Science &amp; Technology.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Link href="/research" className="btn-primary group">
            <span>Explore Research</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/publications" className="btn-ghost">
            View Publications
          </Link>
        </motion.div>
      </div>

      {/* Next section control */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="flex items-center justify-center">
          <div className="mr-3 text-sm text-gray-400">Scroll</div>
          <div>
            <button
              onClick={() => {
                const sections = Array.from(document.querySelectorAll("main > section"));
                if (!sections.length) return;
                sections[1]?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              aria-label="Scroll to next section"
              className="next-section-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
