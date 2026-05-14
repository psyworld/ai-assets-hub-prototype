import { AssetCard, AssetCardList } from "@/components/AssetCard";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";
import { ASSETS } from "@/data/assets";
import {
  filterAssets,
  maturityFromParam,
  parseTypesParam,
  stackFromParam,
  toolFromParam,
} from "@/lib/catalogFilters";
import { cn } from "@/lib/cn";
import { LayoutGrid, Rows3 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");

  const query = useMemo(() => {
    return {
      q: params.get("q") ?? "",
      types: parseTypesParam(params.get("type")),
      tool: toolFromParam(params.get("tool")),
      maturity: maturityFromParam(params.get("maturity")),
      stack: stackFromParam(params.get("stack")),
    };
  }, [params]);

  const filtered = useMemo(() => filterAssets(ASSETS, query), [query]);

  function patchParams(patch: Record<string, string | null>) {
    const p = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "") p.delete(k);
      else p.set(k, v);
    }
    setParams(p, { replace: true });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">AI Assets Hub</h1>
          <p className="mt-3 text-base text-zinc-600">
            Reusable skills, agents, rules and workflows for Kilo Code and OpenCode
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#catalog"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
            >
              Browse catalog
            </a>
            <Link
              to="/docs/how-to-publish"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50"
            >
              How to publish
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-10 space-y-4" id="catalog">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Catalog</h2>
            <p className="mt-1 text-sm text-zinc-600">{filtered.length} assets match your filters.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold",
                view === "grid" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-700",
              )}
            >
              <LayoutGrid className="size-4" />
              Grid
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold",
                view === "list" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-700",
              )}
            >
              <Rows3 className="size-4" />
              List
            </button>
          </div>
        </div>

        <SearchBar
          value={query.q}
          onChange={(v) => patchParams({ q: v || null })}
          placeholder="Search skills, agents, rules, workflows…"
        />

        <FilterBar
          selectedTypes={query.types}
          onTypesChange={(types) => patchParams({ type: types.length ? types.join(",") : null })}
          tool={query.tool}
          onToolChange={(tool) => patchParams({ tool: tool || null })}
          maturity={query.maturity}
          onMaturityChange={(m) => patchParams({ maturity: m || null })}
          stack={query.stack}
          onStackChange={(s) => patchParams({ stack: s || null })}
          onClear={() => setParams(new URLSearchParams(), { replace: true })}
        />

        {view === "grid" ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((a) => (
              <AssetCard key={a.id} asset={a} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((a) => (
              <AssetCardList key={a.id} asset={a} />
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-10 text-center text-sm text-zinc-600">
            No assets match these filters. Try clearing filters or widening search.
          </div>
        ) : null}
      </div>
    </div>
  );
}
