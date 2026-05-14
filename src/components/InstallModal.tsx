import type { Asset } from "@/types/asset";
import { cn } from "@/lib/cn";
import { Check, Copy, Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ToolChoice = "kilo" | "opencode";
type Scope = "project" | "global";

export function InstallModal({
  asset,
  open,
  onClose,
}: {
  asset: Asset;
  open: boolean;
  onClose: () => void;
}) {
  const [tool, setTool] = useState<ToolChoice>("kilo");
  const [scope, setScope] = useState<Scope>("project");
  const [copied, setCopied] = useState(false);

  const command = useMemo(() => {
    const target = scope === "project" ? "./my-service" : "~/.config/ai-assets";
    return `ai-assets install ${asset.id} --target ${target} --tool ${tool}`;
  }, [asset.id, scope, tool]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function copyCmd() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  async function downloadManifest() {
    const blob = new Blob([asset.manifest], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${asset.id}-manifest.yaml`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-zinc-900/30 backdrop-blur-[1px]"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
        <div className="border-b border-zinc-200 px-6 py-4">
          <div className="text-lg font-semibold tracking-tight text-zinc-900">Install {asset.title}</div>
          <div className="mt-1 text-sm text-zinc-600">Prototype flow — nothing is installed on disk.</div>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Select target tool</div>
            <div className="flex gap-2">
              <ChoicePill active={tool === "kilo"} onClick={() => setTool("kilo")}>
                Kilo Code
              </ChoicePill>
              <ChoicePill active={tool === "opencode"} onClick={() => setTool("opencode")}>
                OpenCode
              </ChoicePill>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Select installation scope</div>
            <div className="flex gap-2">
              <ChoicePill active={scope === "project"} onClick={() => setScope("project")}>
                Project
              </ChoicePill>
              <ChoicePill active={scope === "global"} onClick={() => setScope("global")}>
                Global
              </ChoicePill>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Preview changes</div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
              <div className="font-medium text-zinc-900">Files to add</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] text-zinc-600">
                <li>.kilocode/** (new)</li>
                <li>.kilo/agents/** (new)</li>
                <li>manifest.yaml (new)</li>
              </ul>
              <div className="mt-3 font-medium text-zinc-900">Files with conflicts</div>
              <div className="mt-1 text-[13px] text-zinc-600">None detected (mock)</div>
              <div className="mt-3 font-medium text-zinc-900">Files unchanged</div>
              <div className="mt-1 text-[13px] text-zinc-600">Existing unrelated files remain as-is</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Command</div>
            <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-[13px] text-zinc-900">
              {command}
            </pre>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-zinc-200 bg-zinc-50 px-6 py-4">
          <button
            type="button"
            onClick={copyCmd}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50"
          >
            {copied ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy command"}
          </button>
          <button
            type="button"
            onClick={downloadManifest}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50"
          >
            <Download className="size-4" />
            Download manifest
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ChoicePill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-semibold transition",
        active ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50",
      )}
    >
      {children}
    </button>
  );
}
