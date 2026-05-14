import { CodeBlock } from "@/components/CodeBlock";
import { RightToc } from "@/components/RightToc";

const toc = [
  { id: "manifest-structure", label: "Manifest structure" },
  { id: "required-fields", label: "Required fields" },
  { id: "optional-fields", label: "Optional fields" },
  { id: "asset-types", label: "Asset types" },
  { id: "maturity-model", label: "Maturity model" },
  { id: "contents-mapping", label: "Contents mapping" },
  { id: "installation-rules", label: "Installation rules" },
  { id: "validation", label: "Validation" },
  { id: "examples", label: "Examples" },
];

export function SpecificationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
        <div className="prose-hub max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Manifest specification</h1>
          <p className="mt-3 text-base text-zinc-600">
            This document describes the internal <span className="font-mono text-[13px]">manifest.yaml</span> format
            consumed by the AI Assets Hub and the <span className="font-mono text-[13px]">ai-assets</span> CLI.
          </p>

          <h2 id="manifest-structure">Manifest structure</h2>
          <p>
            Each asset lives in a Git directory (often under <span className="font-mono text-[13px]">packages/</span>)
            and must include a manifest file at the package root.
          </p>

          <h2 id="required-fields">Required fields</h2>
          <div className="not-prose overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
                <tr>
                  <th className="border-b border-zinc-200 px-4 py-3">Field</th>
                  <th className="border-b border-zinc-200 px-4 py-3">Required</th>
                  <th className="border-b border-zinc-200 px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700">
                {[
                  ["id", "yes", "Stable asset identifier"],
                  ["title", "yes", "Human-readable name"],
                  ["description", "yes", "Short explanation"],
                  ["type", "yes", "skill / rule / agent / workflow / bundle / etc."],
                  ["tools", "yes", "kilo / opencode / both"],
                  ["maturity", "yes", "draft / pilot / approved / deprecated"],
                  ["owner", "yes", "Responsible team or person"],
                  ["contents", "yes", "Files included in the package"],
                ].map(([field, req, desc]) => (
                  <tr key={field} className="border-b border-zinc-100 last:border-b-0">
                    <td className="px-4 py-3 font-mono text-[13px] font-semibold text-zinc-900">{field}</td>
                    <td className="px-4 py-3">{req}</td>
                    <td className="px-4 py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="optional-fields">Optional fields</h2>
          <div className="not-prose overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
                <tr>
                  <th className="border-b border-zinc-200 px-4 py-3">Field</th>
                  <th className="border-b border-zinc-200 px-4 py-3">Required</th>
                  <th className="border-b border-zinc-200 px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700">
                {[
                  ["install", "no", "Installation strategy (target, copy/merge, conflict policy)"],
                  ["categories", "no", "Catalog grouping for browsing"],
                  ["tags", "no", "Free-form labels for search"],
                  ["version", "no", "Semver string for changelog alignment"],
                ].map(([field, req, desc]) => (
                  <tr key={field} className="border-b border-zinc-100 last:border-b-0">
                    <td className="px-4 py-3 font-mono text-[13px] font-semibold text-zinc-900">{field}</td>
                    <td className="px-4 py-3">{req}</td>
                    <td className="px-4 py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="asset-types">Asset types</h2>
          <p>
            The catalog treats skills, rules, agents, prompts, checklists, workflows, and bundles as first-class asset
            types. Bundles may reference multiple concrete files across those categories.
          </p>

          <h2 id="maturity-model">Maturity model</h2>
          <ul>
            <li>
              <strong>Draft</strong> — experimental, may change frequently.
            </li>
            <li>
              <strong>Pilot</strong> — used by early adopters, feedback expected.
            </li>
            <li>
              <strong>Approved</strong> — reviewed for broad internal use.
            </li>
            <li>
              <strong>Deprecated</strong> — retained for compatibility; migration recommended.
            </li>
          </ul>

          <h2 id="contents-mapping">Contents mapping</h2>
          <p>
            The <span className="font-mono text-[13px]">contents</span> block lists repository-relative paths grouped
            by category. The Hub renders these groups on the asset detail page.
          </p>

          <h2 id="installation-rules">Installation rules</h2>
          <p>
            The optional <span className="font-mono text-[13px]">install</span> block describes how the CLI should
            materialize files into a developer workspace (project vs global scope, merge strategy, conflict handling).
          </p>

          <h2 id="validation">Validation</h2>
          <p>
            CI validates manifests for required fields, identifier stability, allowed tool values, and path existence
            before merging to <span className="font-mono text-[13px]">main</span>.
          </p>

          <h2 id="examples">Examples</h2>
          <div className="not-prose space-y-4">
            <CodeBlock
              language="yaml"
              code={`id: api-design-skill
title: API Design Skill
description: Skill for REST API contract design.
type: skill
tools: [kilo, opencode]
maturity: approved
owner: api-guild
contents:
  skills:
    - .kilocode/skills/api-design/SKILL.md`}
            />
            <CodeBlock
              language="yaml"
              code={`id: java-backend-review
title: Java Backend Review Pack
type: bundle
tools: [kilo, opencode]
maturity: approved
owner: devex-team
contents:
  skills:
    - .kilocode/skills/java-review/SKILL.md
  rules:
    - .kilocode/rules/java-security.md
install:
  target: project
  strategy: copy
  conflicts: ask`}
            />
          </div>
        </div>

        <RightToc items={toc} />
      </div>
    </div>
  );
}
