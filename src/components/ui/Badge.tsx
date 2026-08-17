import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "warning" | "info" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:  "bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/20 font-semibold",
  accent:   "bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/30 font-semibold",
  success:  "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold",
  warning:  "bg-amber-50 text-amber-800 border border-amber-200 font-semibold",
  info:     "bg-sky-50 text-sky-700 border border-sky-200 font-semibold",
  neutral:  "bg-slate-100 text-slate-700 border border-slate-200 font-medium",
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
