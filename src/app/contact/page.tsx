import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "./ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

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
    value: "Dept. of Biochemistry & Molecular Biology\nShahjalal University of Science & Technology\nSylhet-3114, Bangladesh",
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
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0D4F6B]/30 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <Icon className="w-4 h-4 text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm text-gray-300 hover:text-[#00D4FF] transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-300 whitespace-pre-line">{value}</p>
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
