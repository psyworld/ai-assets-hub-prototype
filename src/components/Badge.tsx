import { cn } from "@/lib/cn";
import type { AssetType, Maturity } from "@/types/asset";

const maturityStyles: Record<Maturity, string> = {
  approved: "bg-emerald-50 text-emerald-800 ring-emerald-100",
  pilot: "bg-sky-50 text-sky-800 ring-sky-100",
  draft: "bg-amber-50 text-amber-900 ring-amber-100",
  deprecated: "bg-rose-50 text-rose-800 ring-rose-100",
};

const typeStyles: Record<AssetType, string> = {
  bundle: "bg-violet-50 text-violet-800 ring-violet-100",
  skill: "bg-zinc-100 text-zinc-800 ring-zinc-200",
  rule: "bg-zinc-100 text-zinc-800 ring-zinc-200",
  agent: "bg-indigo-50 text-indigo-800 ring-indigo-100",
  subagent: "bg-indigo-50 text-indigo-800 ring-indigo-100",
  prompt: "bg-fuchsia-50 text-fuchsia-800 ring-fuchsia-100",
  checklist: "bg-teal-50 text-teal-800 ring-teal-100",
  workflow: "bg-orange-50 text-orange-900 ring-orange-100",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: "neutral" | Maturity | AssetType;
  className?: string;
}) {
  const style =
    variant === "neutral"
      ? "bg-white text-zinc-700 ring-zinc-200"
      : maturityStyles[variant as Maturity] ?? typeStyles[variant as AssetType] ?? "bg-white text-zinc-700 ring-zinc-200";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        style,
        className,
      )}
    >
      {children}
    </span>
  );
}
