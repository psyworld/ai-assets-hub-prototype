import { MarkdownLite } from "@/components/MarkdownLite";
import { Link, useParams } from "react-router-dom";

const DOCS: Record<string, { title: string; body: string }> = {
  "how-to-publish": {
    title: "How to publish",
    body: `Publishing is intentionally boring: **open a pull request** that adds a new directory under \`packages/\` with a valid \`manifest.yaml\`.

## What reviewers look for

- clear ownership and maturity
- paths in \`contents\` that exist in the branch
- compatibility notes that match reality
- no secrets or environment-specific URLs

## After merge

The catalog job indexes manifests on \`main\` and this UI updates on the next sync — no manual registration step.`,
  },
  "best-practices": {
    title: "Best practices",
    body: `## Keep assets composable

Prefer small, focused skills and rules. Use bundles when teams need a curated “starter pack”.

## Write for humans first

Agents consume markdown, but humans approve changes. Make diffs easy to read.

## Version intentionally

Bump \`version\` when behavior changes materially, even if the catalog is internal.`,
  },
  validation: {
    title: "Validation",
    body: `CI runs a validator that checks:

- required manifest fields
- allowed \`type\` / \`tools\` / \`maturity\` values
- file path existence relative to the package root
- basic policy rules (no \`http://\` in sensitive fields)

Failed checks block merge and surface a compact error report in the PR.`,
  },
  installation: {
    title: "Installation",
    body: `Use the \`ai-assets\` CLI to materialize files into a repository workspace.

## Typical flow

- pick an asset in this hub
- copy the install command
- run it at the service root (project scope) or in your global config directory

This prototype does not execute installs — it only demonstrates the intended UX.`,
  },
  compatibility: {
    title: "Compatibility",
    body: `## Kilo Code vs OpenCode

Some assets are optimized for Kilo Code paths (\`.kilocode/\`, \`.kilo/\`). Others are portable markdown prompts.

## Manual setup

When an asset is marked **manual** for a tool, expect a short “wiring” section in the README that explains where files should land.`,
  },
  governance: {
    title: "Governance",
    body: `## Maturity is a contract

**Approved** means a named reviewer group signed off for broad use. **Pilot** means “try it, tell us what breaks”.

## Security review

Sensitive categories (secrets, production access, customer data) require an explicit security review entry before promotion.`,
  },
};

export function DocPage() {
  const { slug } = useParams();
  const doc = slug ? DOCS[slug] : undefined;

  if (!doc) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Page not found</h1>
        <p className="mt-2 text-sm text-zinc-600">This documentation slug is not part of the prototype.</p>
        <Link className="mt-6 inline-flex text-sm font-semibold text-zinc-900 underline" to="/">
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{doc.title}</h1>
        <div className="prose-hub mt-6">
          <MarkdownLite text={doc.body} />
        </div>
      </div>
    </div>
  );
}
