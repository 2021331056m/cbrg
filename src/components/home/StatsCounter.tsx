"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, FlaskConical, Users, Calendar } from "lucide-react";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
}

interface StatsCounterProps {
  publications: number;
  projects: number;
  members: number;
}

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsCounter({
  publications,
  projects,
  members,
}: StatsCounterProps) {
  const stats: Stat[] = [
    {
      label: "Publications",
      value: publications,
      icon: BookOpen,
    },
    {
      label: "Active Projects",
      value: projects,
      icon: FlaskConical,
    },
    {
      label: "Team Members",
      value: members,
      icon: Users,
    },
    {
      label: "Years Active",
      value: new Date().getFullYear() - 2010,
      suffix: "+",
      icon: Calendar,
    },
  ];

  return (
    <>
      {/* Statistics */}
      <section className="snap-section py-16 px-4 bg-white border-y border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.4,
                  }}
                >
                  <div className="inline-flex w-12 h-12 rounded-full bg-[#0284C7]/10 items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[#0284C7]" />
                  </div>

                  <div className="text-4xl font-extrabold text-[#002147] mb-1">
                    <Counter target={stat.value} />
                    {stat.suffix ?? "+"}
                  </div>

                  <p className="text-slate-500 text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About / Mission / Vision */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* About Us */}
          <div className="h-full bg-white border border-slate-200 rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-extrabold text-[#002147] mb-4">
              About Us
            </h2>

            <p className="text-slate-600 text-sm leading-7">
              The Cancer Biology Research Group (CBRG) works to translate new
              discoveries in cancer biology into clinical practice. A central
              focus of our research is exploring the molecular mechanisms of
              cancer and translating genomic insights into better strategies
              for detection, prognosis, and treatment. Over time, we've also
              grown increasingly interested in theranostics, and what this
              approach could offer across diseases beyond oncology.
            </p>

            <p className="mt-4 text-slate-600 text-sm leading-7">
              We try to stay grounded in what truly matters for patients,
              working carefully and drawing on collaborators across different
              fields. Training the next generation of researchers is part of
              this work too. Our collective efforts are directed towards
              patient care that is more precise and better suited to the
              individual.
            </p>
          </div>

          {/* Our Mission */}
          <div className="h-full bg-white border border-slate-200 rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-extrabold text-[#002147] mb-4">
              Our Mission
            </h2>

            <p className="text-slate-600 text-sm leading-7">
              Our mission is to develop novel approaches to detect and treat
              cancer through rigorous molecular research, with a focus on
              translating promising discoveries from bench to bedside. We are
              committed to advancing theranostics as a bridge between
              diagnosis and therapy, while exploring its potential beyond
              oncology to improve precision medicine more broadly.
            </p>

            <p className="mt-4 text-slate-600 text-sm leading-7">
              Through careful, collaborative research and dedicated
              mentorship, we aim to build a strong pipeline of ideas and
              researchers that can contribute to meaningful discoveries in
              non-communicable disease research. Ultimately, our objective is
              to move beyond understanding disease at the molecular level and
              towards approaches that can make a real difference in patient
              care.
            </p>
          </div>

          {/* Our Vision */}
          <div className="h-full bg-white border border-slate-200 rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-extrabold text-[#002147] mb-4">
              Our Vision
            </h2>

            <p className="text-slate-600 text-sm leading-7">
              To become a world-class research group from Bangladesh,
              recognized for rigorous, innovative, and clinically meaningful
              research in cancer biology, biomarkers, genomics, and
              theranostics.
            </p>

            <p className="mt-4 text-slate-600 text-sm leading-7">
              We envision a future where molecular and genomic knowledge can be
              translated into earlier detection, more accurate prognosis, more
              precise treatment, and truly individualized care. Through
              ambitious research, global collaboration, and continuous
              development of young scientists, we aim to contribute discoveries
              that extend beyond our laboratory and make a meaningful
              difference in healthcare.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
