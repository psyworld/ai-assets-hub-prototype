import type { Asset, AssetType, Maturity, StackTag, Tool } from "@/types/asset";

export type CatalogQuery = {
  q: string;
  types: AssetType[];
  tool: Tool | "both" | "";
  maturity: Maturity | "";
  stack: StackTag | "";
};

export function parseTypesParam(raw: string | null): AssetType[] {
  if (!raw) return [];
  const allowed: AssetType[] = [
    "skill",
    "rule",
    "agent",
    "subagent",
    "prompt",
    "checklist",
    "workflow",
    "bundle",
  ];
  const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
  return parts.filter((p): p is AssetType => (allowed as string[]).includes(p));
}

export function filterAssets(assets: Asset[], f: CatalogQuery): Asset[] {
  const q = f.q.trim().toLowerCase();
  return assets.filter((a) => {
    if (f.types.length && !f.types.includes(a.type)) return false;
    if (f.maturity && a.maturity !== f.maturity) return false;
    if (f.stack && !a.stacks.includes(f.stack)) return false;
    if (f.tool === "kilo" && !a.tools.includes("kilo")) return false;
    if (f.tool === "opencode" && !a.tools.includes("opencode")) return false;
    if (f.tool === "both" && !(a.tools.includes("kilo") && a.tools.includes("opencode"))) return false;
    if (q) {
      const hay = `${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function toolFromParam(raw: string | null): Tool | "both" | "" {
  if (raw === "kilo" || raw === "opencode" || raw === "both") return raw;
  return "";
}

export function maturityFromParam(raw: string | null): Maturity | "" {
  if (raw === "draft" || raw === "pilot" || raw === "approved" || raw === "deprecated") return raw;
  return "";
}

export function stackFromParam(raw: string | null): StackTag | "" {
  if (raw === "java" || raw === "frontend" || raw === "qa" || raw === "docs" || raw === "security" || raw === "analytics") {
    return raw;
  }
  return "";
}

export function summarizeAsset(a: Asset) {
  return `${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase();
}
