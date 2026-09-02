"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Microscope } from "lucide-react";
import HeroSlideshow from "./HeroSlideshow";

const words = ["Cancer", "Biology", "Research", "Group"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#002147]">
      <HeroSlideshow />
      <div className="absolute inset-0 bg-[#002147]/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/45 via-transparent to-[#002147]/35 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-10 md:px-12 md:py-14 max-w-4xl mx-4 bg-[radial-gradient(ellipse_at_center,rgba(248,250,252,0.96)_0%,rgba(248,250,252,0.84)_48%,rgba(248,250,252,0)_100%)]">
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
            href="/#projects"
            className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0284C7] text-white px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md shadow-[#002147]/20 hover:shadow-lg group"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/#publications"
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
