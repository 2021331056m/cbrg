import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Bangladesh Research Partners",
  description: "Collaboration opportunities with academic and research partners in Bangladesh.",
};

export default function BangladeshCollaborationsPage() {
  return (
    <>
      <PageHero
        tag="Collaborations"
        title="Bangladesh Research Partners"
        subtitle="CBRG works with researchers and institutions in Bangladesh to strengthen cancer research through shared expertise and coordinated effort."
      />
      <section id="collaboration-list" className="max-w-5xl mx-auto px-4" />
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="mt-14 border-t border-slate-200 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <Link href="/collaborations" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0284C7] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to collaborations
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0284C7] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors group">
            Discuss a collaboration
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}