import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "./ContactForm";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Cancer Biology Research Group at SUST.",
};

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "syfuddin-bmb@sust.edu",
    href: "mailto:syfuddin-bmb@sust.edu",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Room 313, Center of Excellence, Dept. of Biochemistry & Molecular Biology, Shahjalal University of Science & Technology Sylhet-3114, Bangladesh",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Contact"
        title="Get In Touch"
        subtitle="For collaboration inquiries, prospective student applications, or general questions."
      />
      <section className="snap-section max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-fit">
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#0284C7]/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <Icon className="w-5 h-5 text-[#0284C7]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-[#0F172A] hover:text-[#0284C7] transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-slate-700 whitespace-pre-line leading-relaxed">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
