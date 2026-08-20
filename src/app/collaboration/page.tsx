import type { Metadata } from "next";
import { ArrowRight, FlaskConical, Handshake, Mail } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Collaboration",
  description: "Collaborate with the Cancer Biology Research Group on impactful cancer research.",
};

const collaborationOptions = [
  {
    icon: FlaskConical,
    title: "Research Partnerships",
    description: "Work with our group on projects in cancer biology, genomics, and translational research.",
  },
  {
    icon: Handshake,
    title: "Academic Collaboration",
    description: "Connect with our members for shared methods, expertise, publications, and student opportunities.",
  },
  {
    icon: Mail,
    title: "Start a Conversation",
    description: "Tell us about your interests and how we can build a meaningful research partnership together.",
  },
];

export default function CollaborationPage() {
  return (
    <>
      <PageHero
        tag="Collaboration"
        title="Collaborate With Us"
        subtitle="We welcome partnerships that turn shared expertise into better cancer research and clinical impact."
      />
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {collaborationOptions.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-[#0A1628] border border-white/5 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#0D4F6B]/30 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <h2 className="text-white font-semibold text-lg">{title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mt-3">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/contact" className="btn-primary group inline-flex items-center gap-2">
            Discuss a collaboration
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}