"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Microscope } from "lucide-react";
import DNAHelix from "./DNAHelix";

const words = ["Cancer", "Biology", "Research", "Group"];

export default function HeroSection() {
  return (
    <section className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F8FAFC]">
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9]" />

      {/* Soft blue radial glow top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0284C7]/10 rounded-full blur-[120px] pointer-events-none" />
      {/* Soft cyan radial glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#002147]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Molecular grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0284C7 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* DNA Helix — left */}
      <div className="absolute left-4 md:left-14 top-1/2 -translate-y-1/2 opacity-80">
        <DNAHelix />
      </div>
      {/* DNA Helix — right (mirrored via scale) */}
      <div className="absolute right-4 md:right-14 top-1/2 -translate-y-1/2 scale-x-[-1] opacity-80">
        <DNAHelix />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-[#0284C7]/10 border border-[#0284C7]/20 rounded-full px-4 py-1.5 mb-8 shadow-sm"
        >
          <Microscope className="w-3.5 h-3.5 text-[#0284C7]" />
          <span className="text-xs font-bold text-[#0284C7] tracking-wider uppercase">
            Molecular Oncology &amp; Theranostics
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-none mb-6">
          {words.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              {i < 2 ? (
                <span className="text-[#002147]">{word}</span>
              ) : (
                <span
                  style={{
                    background: "linear-gradient(135deg, #0284C7, #0369A1)",
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
          className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 font-normal"
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
          <Link
            href="/research"
            className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0284C7] text-white px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md shadow-[#002147]/20 hover:shadow-lg group"
          >
            Explore Research
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 border border-slate-300 hover:border-[#002147] bg-white text-slate-700 hover:text-[#002147] px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm"
          >
            View Publications
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="w-5 h-8 border border-slate-300 rounded-full flex justify-center pt-1.5 shadow-sm bg-white/60">
          <motion.div
            className="w-1 h-1.5 bg-[#0284C7] rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
