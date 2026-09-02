import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Collaborations",
  description: "Research collaborations and partnership opportunities with the Cancer Biology Research Group.",
};

const collaborators = [
  {
    title: "Dr. Md. Mashiar Rahman",
    subtitle: "Lead Researcher, Molecular and Cellular Biology Laboratory",
    href: "https://just.edu.bd/t/mashiar",
    logo: "/images/mashiur.png",
    logoAlt: "Dr. Md. Mashiar Rahman logo",
  },
  {
    title: "Department of Biotechnology and Genetic Engineering",
    subtitle: "Islamic University, Bangladesh",
    href: "https://www.iu.ac.bd/index.php/site/dept/BGE",
    logo: "/images/Islamic university.jpg",
    logoAlt: "Islamic University Bangladesh logo",
  },
  {
    title: "Department of Oncology",
    subtitle: "University of Oxford",
    href: "https://www.oncology.ox.ac.uk/",
    logo: "https://www.oncology.ox.ac.uk/images/homepage/oncology-logo-msd-invert.png",
    logoAlt: "University of Oxford Department of Oncology logo",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {collaborators.map(({ title, subtitle, href, logo, logoAlt }) => (
            <Link
              key={title}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group block bg-white border border-slate-200 hover:border-[#0284C7] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all"
            >
              <div className="h-36 border-b border-slate-200 bg-[#F8FAFC] flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={logo}
                  alt={logoAlt}
                  className="h-full w-full object-contain p-2"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-[#002147] font-extrabold text-base md:text-lg leading-snug group-hover:text-[#0284C7] transition-colors">
                  {title}
                </h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{subtitle}</p>
              </div>
            </Link>
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