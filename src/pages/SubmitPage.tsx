import { CodeBlock } from "@/components/CodeBlock";
import { ManifestPreview } from "@/components/ManifestPreview";
import { useMemo, useState, type ReactNode } from "react";
import type { AssetType, Maturity, Tool } from "@/types/asset";

const types: AssetType[] = ["skill", "rule", "agent", "bundle", "workflow", "prompt", "checklist", "subagent"];
const maturities: Maturity[] = ["draft", "pilot", "approved", "deprecated"];

function buildManifest(input: {
  id: string;
  title: string;
  description: string;
  type: AssetType;
  owner: string;
  maturity: Maturity;
  tools: Tool[];
  repoPath: string;
  tags: string[];
}) {
  const toolsYaml = `[${input.tools.join(", ")}]`;
  return `id: ${input.id || "your-asset-id"}
title: ${input.title || "Your asset title"}
description: ${input.description || "Short description"}
type: ${input.type}
tools: ${toolsYaml}
maturity: ${input.maturity}
owner: ${input.owner || "your-team"}
repository: ${input.repoPath || "packages/your-asset"}
tags:
${input.tags.length ? input.tags.map((t) => `  - ${t}`).join("\n") : "  - example-tag"}`;
}

export function SubmitPage() {
  const [title, setTitle] = useState("Internal Incident Review Skill");
  const [type, setType] = useState<AssetType>("skill");
  const [owner, setOwner] = useState("platform-team");
  const [maturity, setMaturity] = useState<Maturity>("draft");
  const [toolKilo, setToolKilo] = useState(true);
  const [toolOpen, setToolOpen] = useState(false);
  const [description, setDescription] = useState("Guides agents through incident timelines with internal templates.");
  const [repoPath, setRepoPath] = useState("packages/incident-review-skill");
  const [tagsRaw, setTagsRaw] = useState("incident, sre, postmortem");

  const toolsSel = useMemo(() => {
    const t: Tool[] = [];
    if (toolKilo) t.push("kilo");
    if (toolOpen) t.push("opencode");
    return t.length ? t : (["kilo"] as Tool[]);
  }, [toolKilo, toolOpen]);

  const id = useMemo(() => {
    const base = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return base || "your-asset-id";
  }, [title]);

  const tags = useMemo(
    () =>
      tagsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [tagsRaw],
  );

  const manifest = useMemo(
    () =>
      buildManifest({
        id,
        title,
        description,
        type,
        owner,
        maturity,
        tools: toolsSel,
        repoPath,
        tags,
      }),
    [description, id, maturity, owner, repoPath, tags, title, type, toolsSel],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Submit a new asset</h1>
        <p className="mt-3 text-base text-zinc-600">
          Assets are submitted via pull request. The catalog reads <span className="font-mono text-[13px]">manifest.yaml</span>{" "}
          files from the repository after validation.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <Field label="Title">
            <input
              className="mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-zinc-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Type">
              <select
                className="mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-zinc-200"
                value={type}
                onChange={(e) => setType(e.target.value as AssetType)}
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Owner">
              <input
                className="mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-zinc-200"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Maturity">
              <select
                className="mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-zinc-200"
                value={maturity}
                onChange={(e) => setMaturity(e.target.value as Maturity)}
              >
                {maturities.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tools">
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-zinc-800">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={toolKilo} onChange={(e) => setToolKilo(e.target.checked)} />
                  Kilo Code
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={toolOpen} onChange={(e) => setToolOpen(e.target.checked)} />
                  OpenCode
                </label>
              </div>
            </Field>
          </div>

          <Field label="Description">
            <textarea
              className="mt-1 min-h-[96px] w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-zinc-200"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>

          <Field label="Repository path">
            <input
              className="mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 font-mono text-[13px] shadow-sm outline-none focus:ring-2 focus:ring-zinc-200"
              value={repoPath}
              onChange={(e) => setRepoPath(e.target.value)}
            />
          </Field>

          <Field label="Tags (comma-separated)">
            <input
              className="mt-1 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-zinc-200"
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
            />
          </Field>

          <button
            type="button"
            disabled
            className="w-full rounded-lg bg-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-500"
            title="Disabled in the prototype"
          >
            Create pull request (mock)
          </button>
          <p className="text-xs text-zinc-500">
            In production this would open your Git host with a prefilled branch and checklist comment.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-zinc-900">Preview generated manifest</div>
          <ManifestPreview yaml={manifest} />
          <CodeBlock
            language="bash"
            code={`# Suggested next step (mock)\ngit checkout -b feat/add-${id}\nmkdir -p ${repoPath}\n# add SKILL.md / rules / agents, then open PR`}
          />
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-zinc-900">
      {label}
      {children}
    </label>
  );
}
