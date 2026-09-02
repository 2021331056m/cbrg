"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { NewsFeed, NewsSource } from "@/types";
import { formatRelativeDate, truncate } from "@/lib/utils";

interface LatestNewsProps {
  items: NewsFeed[];
}

const sourceVariant: Record<NewsSource, "accent" | "info" | "success"> = {
  "Internal":     "accent",
  "PubMed":       "info",
  "Nature Cancer":"success",
};

export default function LatestNews({ items }: LatestNewsProps) {
  if (items.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest">
              Updates &amp; Insights
            </span>
            <h2 className="mt-1 text-3xl font-bold text-[#002147]">Latest News</h2>
          </div>
          <Link
            href="/#news"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#0284C7] hover:text-[#002147] transition-colors"
          >
            All news <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.slice(0, 6).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#0284C7] shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge variant={sourceVariant[item.source]}>{item.source}</Badge>
                <span className="text-xs text-slate-400 font-medium">{formatRelativeDate(item.published_at)}</span>
              </div>
              <h3 className="text-[#0F172A] text-sm font-bold leading-snug mb-2 group-hover:text-[#0284C7] transition-colors">
                {truncate(item.title, 90)}
              </h3>
              {item.content && (
                <p className="text-slate-600 text-xs leading-relaxed">
                  {truncate(item.content, 120)}
                </p>
              )}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#0284C7] group-hover:underline"
                >
                  Read more <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/#news"
            className="text-sm font-semibold text-[#0284C7] hover:text-[#002147] transition-colors"
          >
            See all news →
          </Link>
        </div>
      </div>
    </section>
  );
}
