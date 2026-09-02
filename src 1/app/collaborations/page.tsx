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
    id: "Collaboration-01",
    title: "Dr. Md. Mashiar Rahman",
    subtitle: "Lead Researcher, Molecular and Cellular Biology Laboratory, Department of Genetic Engineering and Biotechnology, Jashore University of Science and Technology",
    logo: "https://i.ibb.co/Pv7V2V7/just-logo-card.png",
    href: "https://just.edu.bd/t/mashiar",
  },
  {
    id: "Collaboration-02",
    title: "Department of Biotechnology and Genetic Engineering",
    subtitle: "Islamic University, Bangladesh",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/IULogo-4K.jpg/640px-IULogo-4K.jpg",
    href: "https://www.iu.ac.bd/index.php/site/dept/BGE",
  },
  {
    id: "Collaboration-03",
    title: "Department of Oncology",
    subtitle: "University of Oxford",
    logo: "https://www.oncology.ox.ac.uk/images/homepage/oncology-logo-msd-invert.png",
    href: "https://www.oncology.ox.ac.uk/",
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
          {collaborators.map(({ id, title, subtitle, href, logo }) => (
            <article
              key={id}
              className="bg-white border border-slate-200 hover:border-[#0284C7] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col h-full"
            >
              <div className="h-36 border-b border-slate-200 bg-[#F8FAFC] flex items-center justify-center p-4">
                <img
                  src={logo}
                  alt={`${title} logo`}
                  className="max-h-16 max-w-[140px] object-contain"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] font-bold text-[#0284C7] uppercase tracking-[0.2em] mb-3">
                  {id}
                </span>
                <h3 className="text-[#002147] font-extrabold text-lg leading-snug mb-3">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#0284C7] transition-colors"
                  >
                    {title}
                  </a>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{subtitle}</p>
                <div className="mt-auto">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0284C7] hover:text-[#002147] transition-colors group"
                  >
                    Visit Website <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
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