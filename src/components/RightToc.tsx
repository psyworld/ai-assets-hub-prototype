import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export function RightToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? -1 : 1))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">On this page</div>
        <nav className="space-y-1 text-sm">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              onClick={() => setActive(it.id)}
              className={cn(
                "block rounded-md px-2 py-1 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900",
                active === it.id && "bg-zinc-100 font-medium text-zinc-900",
              )}
            >
              {it.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
