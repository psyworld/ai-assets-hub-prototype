import { cn } from "@/lib/cn";

export function FileTree({ tree }: { tree: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-[13px] leading-relaxed text-zinc-800">
      {tree}
    </pre>
  );
}

export function FileTreeMini({ tree, className }: { tree: string; className?: string }) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border border-zinc-200 bg-white p-3 font-mono text-[12px] leading-relaxed text-zinc-800",
        className,
      )}
    >
      {tree}
    </pre>
  );
}
