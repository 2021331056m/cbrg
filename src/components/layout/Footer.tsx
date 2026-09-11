"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, ExternalLink } from "lucide-react";
import { SITE_NAME, PRIMARY_NAV, SECONDARY_NAV } from "@/lib/constants";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const developerCredit = (
    <div className="mt-5 pt-4 border-t border-slate-700 text-center text-[11px] text-slate-300">
      Developed by <span className="font-medium text-slate-100">Maliha Nusrat</span>, <span className="font-medium text-slate-100">Mahmud Hasan Sifat</span>, <span className="font-medium text-slate-100">Najiha Yousuf and Mahabuba Sayra Silvia</span>
    </div>
  );

 
    

 if (pathname !== "/") {
    return (
      <footer className="bg-[#001835] text-slate-400 py-6 border-t border-slate-800 mt-auto text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {year} {SITE_NAME}. All rights reserved.</p>
          <p>Dept. of Biochemistry &amp; Molecular Biology, SUST, Bangladesh</p>
        </div>
        {developerCredit}
      </footer>
    );
  }
    

  return (
    <footer className="bg-[#001835] snap-section text-slate-200 border-t border-slate-800 mt-auto"> 
       <div className="max-w-6xl mx-auto px-4 py-16">

          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {year} {SITE_NAME}. All rights reserved.</p>
            <p>Dept. of Biochemistry &amp; Molecular Biology, SUST, Bangladesh</p>
          </div>
        {developerCredit}
      </div>
       
    </footer>
  );
}
