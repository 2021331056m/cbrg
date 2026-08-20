import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Building2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Collaborations",
  description: "Research collaborations and partnership opportunities with the Cancer Biology Research Group.",
};

const collaborators = [
  {
    title: "Bangladesh Research Partners",
    description: "Collaborative work across cancer biology, genomics, and translational research.",
    href: "/collaborations/bangladesh",
  },
  {
    title: "International Research Partners",
    description: "Shared scientific interests, methods, and opportunities across borders.",
    href: "/collaborations/international",
  },
];

const collaborationAreas = [
  {
    title: "Genomics & Bioinformatics",
    description: "Computational biology, genomic analysis, AI/ML-driven research",
  },
  {
    title: "Translational Research",
    description: "Moving laboratory discoveries toward clinical applications",
  },
  {
    title: "Training & Capacity Building",
    description: "Student training, workshops, seminars, and knowledge exchange",
  },
];

export default function CollaborationsPage() {
  return (
    <>
      <PageHero
        tag=""
        title="Collaborations"
        subtitle="CBRG works with researchers, institutions, healthcare organizations and scientific communities to advance biomedical research and translation."
      />
      <section className="snap-section max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest">
            Our Collaborators
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-[#002147]">
            Academic &amp; Research Institutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {collaborators.map(({ title, description, href }) => (
            <article
              key={title}
              className="bg-white border border-slate-200 hover:border-[#0284C7] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all"
            >
              <div className="h-36 border-b border-slate-200 bg-[#F8FAFC] flex items-center justify-center">
                <div className="w-16 h-16 rounded-lg border border-dashed border-[#0284C7]/50 bg-white flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-[#0284C7]" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-[#002147] font-extrabold text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{description}</p>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0284C7] hover:text-[#002147] transition-colors group"
                >
                  Visit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-7">
            <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest">
              Focus Areas
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-[#002147]">
              Areas of Collaboration
            </h2>
          </div>
          <div className="border-y border-slate-200">
            {collaborationAreas.map(({ title, description }) => (
              <div key={title} className="px-5 py-5 border-b last:border-b-0 border-slate-200">
                <h3 className="text-[#0F172A] font-bold text-sm">{title}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-slate-200 pt-10 text-center">
          <h2 className="text-[#002147] font-extrabold text-2xl">Start a conversation</h2>
          <p className="mt-2 text-slate-600 text-sm">Tell us about your research interests and how we might work together.</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0284C7] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors group"
          >
            Discuss a collaboration
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}