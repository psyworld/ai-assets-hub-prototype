export type RepoFileKind = "yaml" | "markdown" | "skill";

export type RepoNode = {
  name: string;
  type: "dir" | "file";
  path: string;
  children?: RepoNode[];
};

export const REPO_ROOT: RepoNode = {
  name: "packages",
  type: "dir",
  path: "packages",
  children: [
    {
      name: "java-backend-review",
      type: "dir",
      path: "packages/java-backend-review",
      children: [
        { name: "manifest.yaml", type: "file", path: "packages/java-backend-review/manifest.yaml" },
        { name: "README.md", type: "file", path: "packages/java-backend-review/README.md" },
        {
          name: ".kilocode",
          type: "dir",
          path: "packages/java-backend-review/.kilocode",
          children: [
            {
              name: "skills",
              type: "dir",
              path: "packages/java-backend-review/.kilocode/skills",
              children: [
                {
                  name: "java-review",
                  type: "dir",
                  path: "packages/java-backend-review/.kilocode/skills/java-review",
                  children: [
                    {
                      name: "SKILL.md",
                      type: "file",
                      path: "packages/java-backend-review/.kilocode/skills/java-review/SKILL.md",
                    },
                  ],
                },
              ],
            },
            {
              name: "rules",
              type: "dir",
              path: "packages/java-backend-review/.kilocode/rules",
              children: [],
            },
            {
              name: "checklists",
              type: "dir",
              path: "packages/java-backend-review/.kilocode/checklists",
              children: [],
            },
          ],
        },
        {
          name: ".kilo",
          type: "dir",
          path: "packages/java-backend-review/.kilo",
          children: [
            {
              name: "agents",
              type: "dir",
              path: "packages/java-backend-review/.kilo/agents",
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "docs-review-agent",
      type: "dir",
      path: "packages/docs-review-agent",
      children: [
        { name: "manifest.yaml", type: "file", path: "packages/docs-review-agent/manifest.yaml" },
        { name: "README.md", type: "file", path: "packages/docs-review-agent/README.md" },
      ],
    },
    {
      name: "rsocket-high-load-rules",
      type: "dir",
      path: "packages/rsocket-high-load-rules",
      children: [
        { name: "manifest.yaml", type: "file", path: "packages/rsocket-high-load-rules/manifest.yaml" },
        { name: "README.md", type: "file", path: "packages/rsocket-high-load-rules/README.md" },
      ],
    },
  ],
};

const javaManifest = `id: java-backend-review
title: Java Backend Review Pack
type: bundle
maturity: approved`;

const javaReadme = `# Java Backend Review Pack

Internal catalog entry for the **Java backend review** bundle.`;

const javaSkill = `---
name: java-review
description: Guided Java/Spring PR review with security and logging checks.
---

## When to use

- Medium/large backend PRs
- Security-sensitive modules

## Steps

1. Summarize intent vs diff
2. Check logging consistency
3. Run security checklist`;

const docsManifest = `id: docs-review-agent
title: Docs Review Agent
type: agent
maturity: pilot`;

const docsReadme = `# Docs Review Agent

Keeps documentation aligned with shipped behavior.`;

const rsManifest = `id: rsocket-high-load-rules
title: RSocket High Load Rules
type: rule
maturity: draft`;

const rsReadme = `# RSocket High Load Rules

Draft performance guidance for RSocket services.`;

export const REPO_FILE_CONTENTS: Record<
  string,
  { kind: RepoFileKind; content: string }
> = {
  "packages/java-backend-review/manifest.yaml": { kind: "yaml", content: javaManifest },
  "packages/java-backend-review/README.md": { kind: "markdown", content: javaReadme },
  "packages/java-backend-review/.kilocode/skills/java-review/SKILL.md": {
    kind: "skill",
    content: javaSkill,
  },
  "packages/docs-review-agent/manifest.yaml": { kind: "yaml", content: docsManifest },
  "packages/docs-review-agent/README.md": { kind: "markdown", content: docsReadme },
  "packages/rsocket-high-load-rules/manifest.yaml": { kind: "yaml", content: rsManifest },
  "packages/rsocket-high-load-rules/README.md": { kind: "markdown", content: rsReadme },
};
