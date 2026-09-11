import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FlaskConical, GraduationCap, Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Collaborations",
  description: "Research collaborations and partnership opportunities with the Cancer Biology Research Group.",
};

type Collaborator = {
  title: string;
  subtitle: string;
  href: string;
  logo: string;
  logoAlt: string;
  project?: string;
  email?: string;
  scholarLink?: string;
  linkedinLink?: string;
  researchGateLink?: string;
};

const collaborators: Collaborator[] = [
  {
    title: "Md Zafrul Hasan, PhD",
    subtitle: "Associate Professor, Department of Biochemistry and Molecular Biology, SUST",
    project: "ASPM, HEAT Sub-Project PIN: 13409",
    email: "zafrul-bmb@sust.edu",
    href: "https://www.sust.edu/departments/bmb/faculty/zafrul-bmb@sust.edu",
    logo: "/images/zafrul.jpg",
    logoAlt: "Md Zafrul Hasan, PhD",
    scholarLink: "https://scholar.google.com/citations?user=pc7SBUoAAAAJ&hl=en",
    linkedinLink: "https://bd.linkedin.com/in/zafrul-hasan-295ab889",
  },
  {
    title: "Dr. Ajit Ghosh",
    subtitle: "Associate Professor, Department of Biochemistry and Molecular Biology, SUST",
    project: "ASPM, HEAT Sub-Project PIN: 13409",
    email: "aghosh-bmb@sust.edu",
    href: "https://www.sust.edu/departments/bmb/faculty/aghosh-bmb@sust.edu",
    logo: "/images/ajit.jpeg",
    logoAlt: "Dr. Ajit Ghosh",
    scholarLink: "https://scholar.google.com/citations?user=VESJwAMAAAAJ&hl=en",
    linkedinLink: "https://bd.linkedin.com/in/ajit-ghosh-b0a43222",
    researchGateLink: "https://www.researchgate.net/profile/Ajit-Ghosh",
  },
  {
    title: "Aporajita Das Trisha",
    subtitle: "Assistant Professor, Department of Biochemistry and Molecular Biology, SUST",
    project: "SPMT, HEAT Sub-Project PIN: 13409",
    email: "aporajita-bmb@sust.edu",
    href: "https://www.sust.edu/departments/bmb/faculty/aporajita-bmb@sust.edu",
    logo: "/images/trisha.jpg",
    logoAlt: "Aporajita Das Trisha",
    scholarLink: "https://scholar.google.com/citations?user=LOe93f8AAAAJ&hl=en",
    linkedinLink: "https://bd.linkedin.com/in/aporajita-das-trisha-9b07a3141",
  },
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
            Academic &amp; Research Collaborations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {collaborators.map((collaborator) => (
            <article
              key={collaborator.title}
              className="flex flex-col bg-white border border-slate-200 hover:border-[#0284C7] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all"
            >
              <Link
                href={collaborator.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="h-44 border-b border-slate-200 bg-[#F8FAFC] flex items-center justify-center overflow-hidden">
                  <img
                    src={collaborator.logo}
                    alt={collaborator.logoAlt}
                    className="w-full h-full object-contain object-center p-2"
                  />
                </div>
                <div className="p-5 pb-3 text-center">
                  <h3 className="text-[#002147] font-extrabold text-base md:text-lg leading-snug group-hover:text-[#0284C7] transition-colors">
                    {collaborator.title}
                  </h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">{collaborator.subtitle}</p>
                  {collaborator.project && (
                    <p className="mt-2 text-xs font-semibold text-[#0284C7]">{collaborator.project}</p>
                  )}
                </div>
              </Link>
              {(collaborator.email || collaborator.scholarLink || collaborator.linkedinLink || collaborator.researchGateLink) && (
                <div className="mx-5 mt-auto border-t border-slate-200 py-4 flex flex-wrap items-center justify-center gap-4">
                  {collaborator.email && (
                    <a
                      href={`mailto:${collaborator.email}`}
                      aria-label={`Email ${collaborator.title}`}
                      className="text-slate-500 hover:text-[#0284C7] transition-colors"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                  {collaborator.scholarLink && (
                    <a
                      href={collaborator.scholarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${collaborator.title} on Google Scholar`}
                      className="text-slate-500 hover:text-[#0284C7] transition-colors"
                    >
                      <GraduationCap className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                  {collaborator.linkedinLink && (
                    <a
                      href={collaborator.linkedinLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${collaborator.title} on LinkedIn`}
                      className="text-slate-500 hover:text-[#0284C7] transition-colors"
                    >
                      <span className="inline-flex w-4 h-4 items-center justify-center text-[10px] font-extrabold leading-none" aria-hidden="true">
                        in
                      </span>
                    </a>
                  )}
                  {collaborator.researchGateLink && (
                    <a
                      href={collaborator.researchGateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${collaborator.title} on ResearchGate`}
                      className="text-slate-500 hover:text-[#0284C7] transition-colors"
                    >
                      <FlaskConical className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
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
