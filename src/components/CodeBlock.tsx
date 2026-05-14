import { cn } from "@/lib/cn";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CodeBlock({
  code,
  language,
  className,
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-200/80 bg-white/60 px-3 py-2">
        <span className="font-mono text-[11px] font-medium tracking-wide text-zinc-500">
          {language ?? "text"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-600" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-900">
        <code>{code}</code>
      </pre>
    </div>
  );
}
