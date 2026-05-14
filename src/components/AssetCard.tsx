import { Badge } from "@/components/Badge";
import type { Asset, AssetType } from "@/types/asset";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Boxes,
  ClipboardList,
  FileText,
  GitBranch,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const typeIcon: Record<AssetType, LucideIcon> = {
  bundle: Boxes,
  skill: Sparkles,
  rule: FileText,
  agent: Bot,
  subagent: Bot,
  prompt: MessageSquare,
  checklist: ClipboardList,
  workflow: GitBranch,
};

function formatType(t: AssetType) {
  if (t === "subagent") return "Subagent";
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function formatMaturity(m: Asset["maturity"]) {
  return m.charAt(0).toUpperCase() + m.slice(1);
}

export function AssetCard({ asset }: { asset: Asset }) {
  const Icon = typeIcon[asset.type];
  return (
    <Link
      to={`/assets/${asset.id}`}
      className="group flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="truncate text-sm font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-950">
              {asset.title}
            </div>
            <Badge variant={asset.type}>{formatType(asset.type)}</Badge>
            <Badge variant={asset.maturity}>{formatMaturity(asset.maturity)}</Badge>
          </div>
          <p className="mt-2 line-clamp-3 text-sm text-zinc-600">{asset.description}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {asset.tools.map((t) => (
          <span
            key={t}
            className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-700"
          >
            {t === "kilo" ? "Kilo Code" : "OpenCode"}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {asset.tags.slice(0, 5).map((tag) => (
          <span key={tag} className="text-[11px] font-medium text-zinc-500">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 grid flex-1 grid-rows-[auto_1fr] gap-3 border-t border-zinc-100 pt-4 text-xs text-zinc-500">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>
            Owner <span className="font-medium text-zinc-700">{asset.owner}</span>
          </span>
          <span>Updated {asset.updatedAt}</span>
        </div>
        <pre className="truncate rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-[11px] text-zinc-800">
          {asset.installCommand}
        </pre>
      </div>
    </Link>
  );
}

export function AssetCardList({ asset }: { asset: Asset }) {
  const Icon = typeIcon[asset.type];
  return (
    <Link
      to={`/assets/${asset.id}`}
      className={cn(
        "flex items-center gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50",
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="truncate font-semibold text-zinc-900">{asset.title}</div>
          <Badge variant={asset.type}>{formatType(asset.type)}</Badge>
          <Badge variant={asset.maturity}>{formatMaturity(asset.maturity)}</Badge>
        </div>
        <div className="truncate text-sm text-zinc-600">{asset.description}</div>
      </div>
      <div className="hidden text-right text-xs text-zinc-500 md:block">
        <div>{asset.owner}</div>
        <div>{asset.updatedAt}</div>
      </div>
    </Link>
  );
}
