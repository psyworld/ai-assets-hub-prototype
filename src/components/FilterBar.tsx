import type { AssetType, Maturity, StackTag, Tool } from "@/types/asset";
import { cn } from "@/lib/cn";

const types: AssetType[] = [
  "skill",
  "rule",
  "agent",
  "workflow",
  "bundle",
  "checklist",
  "prompt",
  "subagent",
];

const tools: Array<{ id: Tool | "both"; label: string }> = [
  { id: "kilo", label: "Kilo Code" },
  { id: "opencode", label: "OpenCode" },
  { id: "both", label: "Both" },
];

const maturities: Maturity[] = ["draft", "pilot", "approved", "deprecated"];

const stacks: StackTag[] = ["java", "frontend", "qa", "docs", "security", "analytics"];

function pill(active: boolean) {
  return cn(
    "rounded-full border px-3 py-1 text-xs font-medium transition",
    active
      ? "border-zinc-900 bg-zinc-900 text-white"
      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
  );
}

export function FilterBar({
  selectedTypes,
  onTypesChange,
  tool,
  onToolChange,
  maturity,
  onMaturityChange,
  stack,
  onStackChange,
  onClear,
}: {
  selectedTypes: AssetType[];
  onTypesChange: (t: AssetType[]) => void;
  tool: Tool | "both" | "";
  onToolChange: (t: Tool | "both" | "") => void;
  maturity: Maturity | "";
  onMaturityChange: (m: Maturity | "") => void;
  stack: StackTag | "";
  onStackChange: (s: StackTag | "") => void;
  onClear: () => void;
}) {
  function toggleType(t: AssetType) {
    const set = new Set(selectedTypes);
    if (set.has(t)) set.delete(t);
    else set.add(t);
    onTypesChange([...set]);
  }

  return (
    <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-zinc-900">Filters</div>
        <button type="button" onClick={onClear} className="text-xs font-medium text-zinc-500 hover:text-zinc-800">
          Clear all
        </button>
      </div>

      <div className="space-y-2">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Type</div>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button key={t} type="button" className={pill(selectedTypes.includes(t))} onClick={() => toggleType(t)}>
              {t === "subagent"
                ? "Subagent"
                : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Tool</div>
          <div className="flex flex-wrap gap-2">
            {tools.map((t) => (
              <button
                key={t.id}
                type="button"
                className={pill(tool === t.id)}
                onClick={() => onToolChange(tool === t.id ? "" : t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Maturity</div>
          <div className="flex flex-wrap gap-2">
            {maturities.map((m) => (
              <button
                key={m}
                type="button"
                className={pill(maturity === m)}
                onClick={() => onMaturityChange(maturity === m ? "" : m)}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Stack</div>
          <select
            value={stack}
            onChange={(e) => onStackChange((e.target.value as StackTag | "") || "")}
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-800 shadow-sm outline-none focus:ring-2 focus:ring-zinc-200"
          >
            <option value="">Any stack</option>
            {stacks.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
