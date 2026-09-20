"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, FlaskConical, Users } from "lucide-react";

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

export default function StatsCounter({ publications, projects, members }: StatsCounterProps) {
  const stats: Stat[] = [
    { label: "Publications", value: publications, icon: BookOpen },
    { label: "Active Projects", value: projects, icon: FlaskConical },
    { label: "Team Members", value: members, icon: Users },
  ];

  return (
    <section className="py-16 px-4 bg-white border-y border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="inline-flex w-12 h-12 rounded-full bg-[#0284C7]/10 items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#0284C7]" />
                </div>
                <div className="text-4xl font-extrabold text-[#002147] mb-1">
                  <Counter target={stat.value} />
                  {stat.suffix ?? "+"}
                </div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
