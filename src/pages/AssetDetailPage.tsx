import { Badge } from "@/components/Badge";
import { CodeBlock } from "@/components/CodeBlock";
import { FileTree } from "@/components/FileTree";
import { InstallModal } from "@/components/InstallModal";
import { MarkdownLite } from "@/components/MarkdownLite";
import { ManifestPreview } from "@/components/ManifestPreview";
import { RightToc } from "@/components/RightToc";
import { getAssetById } from "@/data/assets";
import type { Asset } from "@/types/asset";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "contents", label: "Contents" },
  { id: "compatibility", label: "Compatibility" },
  { id: "installation", label: "Installation" },
  { id: "file-structure", label: "File structure" },
  { id: "manifest", label: "Manifest" },
  { id: "governance", label: "Governance" },
  { id: "changelog", label: "Changelog" },
];

function formatType(t: Asset["type"]) {
  if (t === "subagent") return "Subagent";
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function formatMaturity(m: Asset["maturity"]) {
  return m.charAt(0).toUpperCase() + m.slice(1);
}

function toolLabel(t: Asset["tools"][number]) {
  return t === "kilo" ? "Kilo Code" : "OpenCode";
}

function compatValue(v: string) {
  const map: Record<string, string> = {
    supported: "Supported",
    manual: "Manual setup",
    unsupported: "Unsupported",
    none: "Not required",
    optional: "Optional",
    required: "Required",
    project: "Project",
    global: "Global",
    both: "Project or global",
  };
  return map[v] ?? v;
}

function ContentsSection({ asset }: { asset: Asset }) {
  const groups = [
    ["Skills", asset.contents.skills],
    ["Rules", asset.contents.rules],
    ["Agents", asset.contents.agents],
    ["Prompts", asset.contents.prompts],
    ["Checklists", asset.contents.checklists],
    ["Workflows", asset.contents.workflows],
  ] as const;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map(([title, paths]) => {
        if (!paths?.length) return null;
        return (
          <div key={title} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold text-zinc-900">{title}</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {paths.map((p) => (
                <li key={p} className="rounded-lg bg-zinc-50 px-3 py-2 font-mono text-[12px] text-zinc-800">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function AssetDetailPage() {
  const { id } = useParams();
  const asset = useMemo(() => (id ? getAssetById(id) : undefined), [id]);
  const [installOpen, setInstallOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!asset) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Asset not found</h1>
        <p className="mt-2 text-sm text-zinc-600">This identifier is not in the mock catalog.</p>
        <Link className="mt-6 inline-flex text-sm font-semibold text-zinc-900 underline" to="/">
          Back to catalog
        </Link>
      </div>
    );
  }

  async function copyInstall() {
    await navigator.clipboard.writeText(asset.installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 pb-8">
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{asset.title}</h1>
                <Badge variant={asset.type}>{formatType(asset.type)}</Badge>
                <Badge variant={asset.maturity}>{formatMaturity(asset.maturity)}</Badge>
              </div>
              <p className="max-w-3xl text-base text-zinc-600">{asset.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {asset.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-semibold text-zinc-700"
                  >
                    {toolLabel(t)}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
                <div>
                  Owner <span className="font-medium text-zinc-900">{asset.owner}</span>
                </div>
                <div>
                  Version <span className="font-medium text-zinc-900">{asset.version}</span>
                </div>
                <div>
                  Last updated <span className="font-medium text-zinc-900">{asset.updatedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setInstallOpen(true)}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
              >
                Install
              </button>
              <Link
                to="/repository"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50"
              >
                <ExternalLink className="size-4" />
                View in repository
              </Link>
              <button
                type="button"
                onClick={copyInstall}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50"
              >
                {copied ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy install command"}
              </button>
            </div>
          </div>

          <section id="overview" className="scroll-mt-28 pt-10">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Overview</h2>
            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <MarkdownLite text={asset.overviewMd} />
            </div>
          </section>

          <section id="contents" className="scroll-mt-28 pt-12">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Contents</h2>
            <p className="mt-2 text-sm text-zinc-600">Grouped view of everything this package installs or references.</p>
            <div className="mt-5">
              <ContentsSection asset={asset} />
            </div>
          </section>

          <section id="compatibility" className="scroll-mt-28 pt-12">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Compatibility</h2>
            <div className="mt-4 grid gap-3 rounded-xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700 shadow-sm">
              <div className="flex flex-wrap justify-between gap-2 border-b border-zinc-100 pb-3">
                <span className="text-zinc-500">Kilo Code</span>
                <span className="font-medium text-zinc-900">{compatValue(asset.compatibility.kilo)}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-2 border-b border-zinc-100 pb-3">
                <span className="text-zinc-500">OpenCode</span>
                <span className="font-medium text-zinc-900">{compatValue(asset.compatibility.opencode)}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-2 border-b border-zinc-100 pb-3">
                <span className="text-zinc-500">Target</span>
                <span className="font-medium text-zinc-900">{compatValue(asset.compatibility.target)}-level installation</span>
              </div>
              <div className="flex flex-wrap justify-between gap-2 border-b border-zinc-100 pb-3">
                <span className="text-zinc-500">Requires</span>
                <span className="font-medium text-zinc-900">{asset.compatibility.requires.join(", ") || "None"}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-2 border-b border-zinc-100 pb-3">
                <span className="text-zinc-500">Network access</span>
                <span className="font-medium text-zinc-900">{compatValue(asset.compatibility.network)}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-zinc-500">Sensitive data</span>
                <span className="font-medium text-zinc-900">{asset.compatibility.sensitiveData}</span>
              </div>
            </div>
          </section>

          <section id="installation" className="scroll-mt-28 pt-12">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Installation</h2>
            <div className="mt-4 space-y-4">
              <CodeBlock code={asset.installCommand} language="bash" />
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
                <span className="font-semibold">Note.</span> Installation will add files under{" "}
                <span className="font-mono text-[13px]">.kilocode/</span> and <span className="font-mono text-[13px]">.kilo/</span>.
                Existing files are not overwritten without confirmation.
              </div>
            </div>
          </section>

          <section id="file-structure" className="scroll-mt-28 pt-12">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">File structure</h2>
            <p className="mt-2 text-sm text-zinc-600">Repository layout as mirrored in the internal Git monorepo.</p>
            <div className="mt-4">
              <FileTree tree={asset.fileTree} />
            </div>
          </section>

          <section id="manifest" className="scroll-mt-28 pt-12">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Manifest</h2>
            <p className="mt-2 text-sm text-zinc-600">
              The catalog entry is generated from <span className="font-mono text-[13px]">manifest.yaml</span> in Git.
            </p>
            <div className="mt-4">
              <ManifestPreview yaml={asset.manifest} />
            </div>
          </section>

          <section id="governance" className="scroll-mt-28 pt-12">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Governance</h2>
            <div className="mt-4 grid gap-3 rounded-xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700 shadow-sm">
              <Row k="Maturity" v={formatMaturity(asset.maturity)} />
              <Row k="Reviewed by" v={asset.governance.reviewedBy} />
              <Row k="Security review" v={asset.governance.securityReview} />
              <Row k="Recommended for production use" v={asset.governance.productionRecommended ? "Yes" : "No"} />
              <Row k="Contribution policy" v={asset.governance.contributionPolicy} />
              <Row k="Support channel" v={asset.governance.supportChannel} />
            </div>
          </section>

          <section id="changelog" className="scroll-mt-28 pb-10 pt-12">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Changelog</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              {asset.changelog.map((c) => (
                <li key={c.version} className="rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                  <span className="font-mono text-[13px] font-semibold text-zinc-900">{c.version}</span>
                  <span className="text-zinc-400"> — </span>
                  {c.note}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <RightToc items={toc} />
      </div>

      <InstallModal asset={asset} open={installOpen} onClose={() => setInstallOpen(false)} />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-3 last:border-b-0 last:pb-0">
      <div className="text-zinc-500">{k}</div>
      <div className="max-w-[60%] text-right font-medium text-zinc-900">{v}</div>
    </div>
  );
}
