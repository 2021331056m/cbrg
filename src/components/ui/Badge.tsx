import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "warning" | "info" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:  "bg-[#0D4F6B]/30 text-[#00D4FF] border border-[#00D4FF]/20",
  accent:   "bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30",
  success:  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning:  "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  info:     "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  neutral:  "bg-white/5 text-gray-400 border border-white/10",
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
