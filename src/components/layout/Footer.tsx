import Link from "next/link";
import Image from "next/image";
import { Mail, ExternalLink } from "lucide-react";
import { SITE_NAME, PRIMARY_NAV, SECONDARY_NAV } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#030810] border-t site-border mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/images/logo-icon.png"
                alt={SITE_NAME}
                width={52}
                height={52}
                className="rounded-md"
              />
              <div className="leading-tight">
                <p className="font-bold text-white text-base tracking-wide">CBRG</p>
                <p className="text-[#00D4FF] text-sm">SUST, Bangladesh</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              {SITE_NAME} — advancing cancer research through molecular oncology,
              genomics, and theranostics at Shahjalal University of Science &amp; Technology.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
              <Mail className="w-4 h-4 text-[#00D4FF]" />
              <a
                href="mailto:hmsyfuddin@sust.edu"
                className="hover:text-[#00D4FF] transition-colors"
              >
                hmsyfuddin@sust.edu
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-[#00D4FF] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              More
            </h3>
            <ul className="space-y-2">
              {SECONDARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-[#00D4FF] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.sust.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-[#00D4FF] transition-colors inline-flex items-center gap-1"
                >
                  SUST <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Dept. of Biochemistry &amp; Molecular Biology, SUST, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
