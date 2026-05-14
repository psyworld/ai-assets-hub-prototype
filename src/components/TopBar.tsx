import { SearchBar } from "@/components/SearchBar";
import { usePalette } from "@/context/PaletteContext";
import { cn } from "@/lib/cn";
import { Command, FolderGit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function TopBar() {
  const { toggle } = usePalette();
  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [offCatalogDraft, setOffCatalogDraft] = useState("");

  const onCatalog = location.pathname === "/";
  const catalogQ = params.get("q") ?? "";

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  function setCatalogQuery(next: string) {
    const p = new URLSearchParams(params);
    if (next) p.set("q", next);
    else p.delete("q");
    setParams(p, { replace: true });
  }

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 lg:px-8">
        <div className="hidden min-w-[220px] lg:block" />
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="max-w-xl flex-1">
            <SearchBar
              value={onCatalog ? catalogQ : offCatalogDraft}
              onChange={(v) => {
                if (onCatalog) setCatalogQuery(v);
                else setOffCatalogDraft(v);
              }}
              onKeyDown={(e) => {
                if (!onCatalog && e.key === "Enter") {
                  navigate({ pathname: "/", search: offCatalogDraft ? `?q=${encodeURIComponent(offCatalogDraft)}` : "" });
                  setOffCatalogDraft("");
                }
              }}
              placeholder="Search skills, agents, rules, workflows…"
            />
          </div>
          <button
            type="button"
            onClick={toggle}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50",
            )}
          >
            <Command className="size-4" />
            <span className="hidden sm:inline">⌘K</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/repository"
            className="hidden items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 sm:inline-flex"
          >
            <FolderGit2 className="size-4" />
            Repository
          </Link>
          <Link
            to="/submit"
            className="rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800"
          >
            Submit asset
          </Link>
        </div>
      </div>
    </header>
  );
}
