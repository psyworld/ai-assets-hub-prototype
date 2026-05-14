import { CodeBlock } from "@/components/CodeBlock";
import { MarkdownLite } from "@/components/MarkdownLite";
import { REPO_FILE_CONTENTS, REPO_ROOT } from "@/data/repository";
import { cn } from "@/lib/cn";
import { ChevronRight, File, Folder } from "lucide-react";
import { useMemo, useState } from "react";

function TreeNodeView({
  node,
  depth,
  selectedPath,
  onSelect,
}: {
  node: RepoNode;
  depth: number;
  selectedPath: string | null;
  onSelect: (path: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const isDir = node.type === "dir";
  const active = selectedPath === node.path;

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (isDir) setOpen((v) => !v);
          else onSelect(node.path);
        }}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm transition",
          active ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100",
        )}
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        {isDir ? (
          <ChevronRight className={cn("size-4 shrink-0 transition", open && "rotate-90")} />
        ) : (
          <span className="inline-block w-4" />
        )}
        {isDir ? <Folder className="size-4 shrink-0 opacity-70" /> : <File className="size-4 shrink-0 opacity-70" />}
        <span className="truncate font-mono text-[13px]">{node.name}</span>
      </button>

      {isDir && open && node.children?.length ? (
        <div className="mt-1 space-y-1">
          {node.children.map((ch) => (
            <TreeNodeView
              key={ch.path}
              node={ch}
              depth={depth + 1}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function RepositoryPage() {
  const defaultPath = "packages/java-backend-review/manifest.yaml";
  const [selectedPath, setSelectedPath] = useState<string>(defaultPath);

  const preview = useMemo(() => {
    const hit = REPO_FILE_CONTENTS[selectedPath];
    if (!hit) {
      return { kind: "markdown" as const, content: "_No preview for this path in the mock._" };
    }
    return hit;
  }, [selectedPath]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Repository explorer</h1>
        <p className="mt-2 text-sm text-zinc-600">
          The catalog UI renders what already lives in Git. This view is mocked, but mirrors how the real tree would
          feel.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
          <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Tree</div>
          <div className="max-h-[70vh] overflow-auto pr-1">
            <TreeNodeView node={REPO_ROOT} depth={0} selectedPath={selectedPath} onSelect={setSelectedPath} />
          </div>
        </div>

        <div className="min-h-[420px] rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-4">
            <div className="font-mono text-xs text-zinc-500">{selectedPath}</div>
          </div>

          <div className="pt-5">
            {preview.kind === "yaml" ? <CodeBlock code={preview.content} language="yaml" /> : null}
            {preview.kind === "markdown" ? (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                <MarkdownLite text={preview.content} />
              </div>
            ) : null}
            {preview.kind === "skill" ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                  <MarkdownLite text={preview.content} />
                </div>
                <CodeBlock code={preview.content} language="markdown" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
