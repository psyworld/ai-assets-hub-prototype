import type { ReactNode } from "react";

function renderInline(s: string) {
  const parts = s.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-zinc-900">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

export function MarkdownLite({ text }: { text: string }) {
  const lines = text.split("\n");
  const out: ReactNode[] = [];

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx] ?? "";
    if (line.startsWith("# ")) {
      out.push(
        <h2 key={idx} className="text-base font-semibold tracking-tight text-zinc-900">
          {renderInline(line.slice(2))}
        </h2>,
      );
      continue;
    }
    if (line.startsWith("## ")) {
      out.push(
        <h3 key={idx} className="text-sm font-semibold text-zinc-900">
          {renderInline(line.slice(3))}
        </h3>,
      );
      continue;
    }
    if (line.startsWith("- ")) {
      out.push(
        <div key={idx} className="flex gap-2 pl-1">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
          <div className="text-sm text-zinc-700">{renderInline(line.slice(2))}</div>
        </div>,
      );
      continue;
    }
    if (line.trim() === "") {
      out.push(<div key={idx} className="h-2" />);
      continue;
    }
    out.push(
      <p key={idx} className="text-sm text-zinc-700">
        {renderInline(line)}
      </p>,
    );
  }

  return <div className="space-y-1">{out}</div>;
}
