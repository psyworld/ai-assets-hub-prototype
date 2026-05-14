import { ASSETS } from "@/data/assets";
import { cn } from "@/lib/cn";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return ASSETS.slice(0, 8);
    return ASSETS.filter((a) => {
      const hay = `${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase();
      return hay.includes(needle);
    }).slice(0, 12);
  }, [q]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4">
      <button type="button" className="absolute inset-0 bg-zinc-900/30 backdrop-blur-[1px]" onClick={onClose} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
        <div className="flex items-center gap-2 border-b border-zinc-200 px-3">
          <Search className="size-4 text-zinc-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to an asset…"
            className="h-12 w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
          />
          <span className="hidden rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-[11px] text-zinc-500 sm:inline">
            ESC
          </span>
        </div>
        <div className="max-h-[50vh] overflow-auto p-2">
          {results.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-zinc-500">No matches</div>
          ) : (
            <ul className="space-y-1">
              {results.map((a) => (
                <li key={a.id}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full flex-col items-start rounded-lg px-3 py-2 text-left text-sm transition hover:bg-zinc-50",
                    )}
                    onClick={() => {
                      navigate(`/assets/${a.id}`);
                      onClose();
                      setQ("");
                    }}
                  >
                    <div className="font-medium text-zinc-900">{a.title}</div>
                    <div className="text-xs text-zinc-500">
                      {a.type} · {a.maturity}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-2 text-[11px] text-zinc-500">
          Navigate the internal catalog. Repository remains the source of truth.
        </div>
      </div>
    </div>
  );
}
