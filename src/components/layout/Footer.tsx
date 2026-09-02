"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, ExternalLink } from "lucide-react";
import { SITE_NAME, PRIMARY_NAV, SECONDARY_NAV } from "@/lib/constants";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Full footer only rendered on Home page
  if (pathname !== "/") {
    return (
      <footer className="bg-[#001835] text-slate-400 py-6 border-t border-slate-800 mt-auto text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {year} {SITE_NAME}. All rights reserved.</p>
          <p>Dept. of Biochemistry &amp; Molecular Biology, SUST, Bangladesh</p>
        </div>
        <div className="mt-3 text-center text-[11px] text-slate-300">
          Developed by <span className="font-medium text-slate-100">Maliha Nusrat</span>, <span className="font-medium text-slate-100">Mahmud Hasan Sifat</span>, <span className="font-medium text-slate-100">Najiha Yousuf</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="snap-section bg-[#001835] text-slate-200 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo-icon.png"
                alt={SITE_NAME}
                width={52}
                height={52}
                className="rounded-md border border-white/10"
              />
              <div className="leading-tight">
                <p className="font-bold text-white text-base tracking-wide">CBRG</p>
                <p className="text-[#38BDF8] text-xs font-semibold">SUST, Bangladesh</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              {SITE_NAME} — advancing cancer research through molecular oncology,
              genomics, and theranostics at Shahjalal University of Science &amp; Technology.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
              <Mail className="w-4 h-4 text-[#38BDF8]" />
              <a
                href="mailto:hmsyfuddin@sust.edu"
                className="hover:text-[#38BDF8] transition-colors"
              >
                syfuddin-bmb@sust.edu
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              More Information
            </h3>
            <ul className="space-y-2.5">
              {SECONDARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 hover:text-[#38BDF8] transition-colors"
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
                  className="text-sm text-slate-300 hover:text-[#38BDF8] transition-colors inline-flex items-center gap-1"
                >
                  SUST Official Site <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p>
            Dept. of Biochemistry &amp; Molecular Biology, SUST, Bangladesh
          </p>
        </div>
        <div className="mt-4 text-center text-[11px] text-slate-300">
          Developed by <span className="font-medium text-slate-100">Maliha Nusrat</span>, <span className="font-medium text-slate-100">Mahmud Hasan Sifat</span>, <span className="font-medium text-slate-100">Najiha Yousuf</span>
        </div>
      </div>
    </footer>
  );
}
