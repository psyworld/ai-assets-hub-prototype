import { SearchBar } from "@/components/SearchBar";
import { cn } from "@/lib/cn";
import { Boxes, BookOpen, FileText, GitBranch, LayoutGrid, ListChecks, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";

function linkClass(active: boolean) {
  return cn(
    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
    active ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
  );
}

function iconFor(label: string) {
  switch (label) {
    case "Skills":
      return <Sparkles className="size-4" />;
    case "Rules":
      return <FileText className="size-4" />;
    case "Agents":
      return <LayoutGrid className="size-4" />;
    case "Workflows":
      return <GitBranch className="size-4" />;
    case "Bundles":
      return <Boxes className="size-4" />;
    case "Manifest specification":
      return <BookOpen className="size-4" />;
    case "Validation":
      return <ListChecks className="size-4" />;
    default:
      return <FileText className="size-4" />;
  }
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const catalogQ = params.get("q") ?? "";
  const [offCatalogSearch, setOffCatalogSearch] = useState("");
  const onCatalog = location.pathname === "/";

  const typeParam = params.get("type") ?? "";

  const catalogActive = useMemo(() => {
    return {
      all: onCatalog && !typeParam,
      skill: onCatalog && typeParam === "skill",
      rule: onCatalog && typeParam === "rule",
      agents: onCatalog && typeParam === "agent,subagent",
      workflow: onCatalog && typeParam === "workflow",
      bundle: onCatalog && typeParam === "bundle",
    };
  }, [onCatalog, typeParam]);

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[260px] flex-col border-r border-zinc-200 bg-white lg:flex">
      <div className="border-b border-zinc-200 px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50">
            <Boxes className="size-5 text-zinc-800" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-zinc-900">AI Assets Hub</div>
            <div className="text-[11px] font-medium text-zinc-500">Internal catalog</div>
          </div>
        </div>
        <div className="mt-4">
          <SearchBar
            value={onCatalog ? catalogQ : offCatalogSearch}
            onChange={(v) => {
              if (onCatalog) {
                const p = new URLSearchParams(params);
                if (v) p.set("q", v);
                else p.delete("q");
                setParams(p, { replace: true });
              } else {
                setOffCatalogSearch(v);
              }
            }}
            onKeyDown={(e) => {
              if (!onCatalog && e.key === "Enter") {
                navigate({ pathname: "/", search: offCatalogSearch ? `?q=${encodeURIComponent(offCatalogSearch)}` : "" });
                setOffCatalogSearch("");
              }
            }}
            placeholder="Search catalog…"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-6">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Catalog</div>
          <div className="space-y-1">
            <Link to="/" className={linkClass(catalogActive.all)}>
              <span className="opacity-80">
                <Boxes className="size-4" />
              </span>
              All assets
            </Link>
            <Link to="/?type=skill" className={linkClass(catalogActive.skill)}>
              <span className="opacity-80">{iconFor("Skills")}</span>
              Skills
            </Link>
            <Link to="/?type=rule" className={linkClass(catalogActive.rule)}>
              <span className="opacity-80">{iconFor("Rules")}</span>
              Rules
            </Link>
            <Link to="/?type=agent,subagent" className={linkClass(catalogActive.agents)}>
              <span className="opacity-80">{iconFor("Agents")}</span>
              Agents
            </Link>
            <Link to="/?type=workflow" className={linkClass(catalogActive.workflow)}>
              <span className="opacity-80">{iconFor("Workflows")}</span>
              Workflows
            </Link>
            <Link to="/?type=bundle" className={linkClass(catalogActive.bundle)}>
              <span className="opacity-80">{iconFor("Bundles")}</span>
              Bundles
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">For creators</div>
          <div className="space-y-1">
            <Link
              to="/docs/how-to-publish"
              className={linkClass(location.pathname === "/docs/how-to-publish")}
            >
              <span className="opacity-80">{iconFor("How")}</span>
              How to publish
            </Link>
            <Link to="/specification" className={linkClass(location.pathname === "/specification")}>
              <span className="opacity-80">{iconFor("Manifest specification")}</span>
              Manifest specification
            </Link>
            <Link
              to="/docs/best-practices"
              className={linkClass(location.pathname === "/docs/best-practices")}
            >
              <span className="opacity-80">{iconFor("Best")}</span>
              Best practices
            </Link>
            <Link to="/docs/validation" className={linkClass(location.pathname === "/docs/validation")}>
              <span className="opacity-80">{iconFor("Validation")}</span>
              Validation
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">For users</div>
          <div className="space-y-1">
            <Link
              to="/docs/installation"
              className={linkClass(location.pathname === "/docs/installation")}
            >
              <span className="opacity-80">{iconFor("Installation")}</span>
              Installation
            </Link>
            <Link
              to="/docs/compatibility"
              className={linkClass(location.pathname === "/docs/compatibility")}
            >
              <span className="opacity-80">{iconFor("Compatibility")}</span>
              Compatibility
            </Link>
            <Link to="/docs/governance" className={linkClass(location.pathname === "/docs/governance")}>
              <span className="opacity-80">{iconFor("Governance")}</span>
              Governance
            </Link>
          </div>
        </div>
      </nav>

      <div className="border-t border-zinc-200 px-5 py-4 text-[11px] leading-relaxed text-zinc-500">
        Git repository is the source of truth. UI is a read-only catalog.
      </div>
    </aside>
  );
}
