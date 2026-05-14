import type { Asset } from "@/types/asset";

export const ASSETS: Asset[] = [
  {
    id: "java-backend-review",
    title: "Java Backend Review Pack",
    subtitle:
      "A reusable bundle with skills, rules, agents and checklists for reviewing Java backend services.",
    description:
      "Rules, review agent, checklist and skill for Java backend code review.",
    overviewMd: `This bundle helps teams run consistent backend code review with AI agents.

**Use it when:**
- reviewing Java/Spring backend pull requests;
- checking generated code;
- validating security-sensitive changes;
- onboarding teams to agent-assisted review.`,
    type: "bundle",
    maturity: "approved",
    tools: ["kilo", "opencode"],
    owner: "DevEx team",
    version: "1.2.0",
    updatedAt: "2026-05-02",
    tags: ["java", "backend", "review", "security"],
    categories: ["code-review", "backend", "java"],
    stacks: ["java", "security"],
    installCommand: "ai-assets install java-backend-review --target ./my-service --tool kilo",
    contents: {
      skills: [".kilocode/skills/java-review/SKILL.md"],
      rules: [".kilocode/rules/java-security.md", ".kilocode/rules/logging.md"],
      agents: [".kilo/agents/code-sceptic.md", ".kilo/agents/java-reviewer.md"],
      checklists: [".kilocode/checklists/java-review-checklist.md"],
    },
    compatibility: {
      kilo: "supported",
      opencode: "manual",
      target: "project",
      requires: ["git"],
      network: "none",
      sensitiveData: "No external calls",
    },
    governance: {
      reviewedBy: "DevEx team",
      securityReview: "Passed",
      productionRecommended: true,
      contributionPolicy: "PR required",
      supportChannel: "#ai-devflow",
    },
    changelog: [
      { version: "1.2.0", note: "Added Java security rule and CodeSceptic agent" },
      { version: "1.1.0", note: "Added review checklist" },
      { version: "1.0.0", note: "Initial version" },
    ],
    fileTree: `java-backend-review/
├── manifest.yaml
├── README.md
├── .kilocode/
│   ├── skills/
│   │   └── java-review/
│   │       └── SKILL.md
│   ├── rules/
│   │   ├── java-security.md
│   │   └── logging.md
│   └── checklists/
│       └── java-review-checklist.md
└── .kilo/
    └── agents/
        ├── code-sceptic.md
        └── java-reviewer.md`,
    manifest: `id: java-backend-review
title: Java Backend Review Pack
description: Rules, agents, skills and checklists for Java backend review.
type: bundle
tools:
  - kilo
  - opencode
categories:
  - code-review
  - backend
  - java
maturity: approved
owner: devex-team
version: "1.2.0"
contents:
  skills:
    - .kilocode/skills/java-review/SKILL.md
  rules:
    - .kilocode/rules/java-security.md
    - .kilocode/rules/logging.md
  agents:
    - .kilo/agents/code-sceptic.md
    - .kilo/agents/java-reviewer.md
  checklists:
    - .kilocode/checklists/java-review-checklist.md
install:
  target: project
  strategy: copy
  conflicts: ask`,
    readme: `# Java Backend Review Pack

Opinionated assets for **Java/Spring** services: rules, agents, and a checklist aligned with internal standards.

## Quick start

\`\`\`bash
ai-assets install java-backend-review --target ./my-service --tool kilo
\`\`\`

## What you get

- **Skill** — structured review instructions
- **Rules** — logging and security guardrails
- **Agents** — reviewer + sceptic pair for higher signal`,
  },
  {
    id: "docs-review-agent",
    title: "Docs Review Agent",
    subtitle: "Compares PR diffs with documentation and highlights missing business changes.",
    description: "Compares PR diff with documentation and reports missing business changes.",
    overviewMd: `Use this agent when documentation must stay in lockstep with product changes.

**Good for:**
- feature PRs with user-facing impact;
- API contract updates;
- runbooks and internal guides.`,
    type: "agent",
    maturity: "pilot",
    tools: ["kilo", "opencode"],
    owner: "Technical Writing",
    version: "0.4.1",
    updatedAt: "2026-04-18",
    tags: ["docs", "pull-request", "review"],
    categories: ["documentation", "review"],
    stacks: ["docs", "frontend"],
    installCommand: "ai-assets install docs-review-agent --target ./repo --tool kilo",
    contents: {
      agents: [".kilo/agents/docs-review.md"],
      rules: [".kilocode/rules/docs-pr-sync.md"],
    },
    compatibility: {
      kilo: "supported",
      opencode: "supported",
      target: "project",
      requires: ["git"],
      network: "optional",
      sensitiveData: "May read linked Confluence URLs if configured",
    },
    governance: {
      reviewedBy: "Docs guild",
      securityReview: "In progress",
      productionRecommended: false,
      contributionPolicy: "PR + docs review",
      supportChannel: "#docs-ai",
    },
    changelog: [
      { version: "0.4.1", note: "Tighter diff-to-doc mapping heuristics" },
      { version: "0.4.0", note: "Initial pilot" },
    ],
    fileTree: `docs-review-agent/
├── manifest.yaml
├── README.md
└── .kilo/
    └── agents/
        └── docs-review.md`,
    manifest: `id: docs-review-agent
title: Docs Review Agent
description: Documentation drift checks for pull requests.
type: agent
tools: [kilo, opencode]
maturity: pilot
owner: technical-writing
version: "0.4.1"
contents:
  agents:
    - .kilo/agents/docs-review.md
  rules:
    - .kilocode/rules/docs-pr-sync.md`,
    readme: `# Docs Review Agent

Installs a single agent definition focused on **documentation parity** with code changes.`,
  },
  {
    id: "rsocket-high-load-rules",
    title: "RSocket High Load Rules",
    subtitle: "Project rules for RSocket services with many connections and high throughput.",
    description: "Project rules for RSocket services with many connections and high throughput.",
    overviewMd: `Operational and performance-oriented rules for RSocket-heavy services.

**Covers:**
- backpressure expectations;
- connection lifecycle logging;
- load testing hooks.`,
    type: "rule",
    maturity: "draft",
    tools: ["kilo"],
    owner: "Platform Networking",
    version: "0.1.0",
    updatedAt: "2026-05-10",
    tags: ["rsocket", "performance", "backend"],
    categories: ["performance", "networking"],
    stacks: ["java"],
    installCommand: "ai-assets install rsocket-high-load-rules --target ./service --tool kilo",
    contents: {
      rules: [".kilocode/rules/rsocket-performance.md", ".kilocode/rules/rsocket-logging.md"],
    },
    compatibility: {
      kilo: "supported",
      opencode: "unsupported",
      target: "project",
      requires: [],
      network: "none",
      sensitiveData: "No external calls",
    },
    governance: {
      reviewedBy: "Networking chapter",
      securityReview: "Not scheduled",
      productionRecommended: false,
      contributionPolicy: "Draft PRs welcome",
      supportChannel: "#net-platform",
    },
    changelog: [{ version: "0.1.0", note: "Initial draft ruleset" }],
    fileTree: `rsocket-high-load-rules/
├── manifest.yaml
├── README.md
└── .kilocode/
    └── rules/
        ├── rsocket-performance.md
        └── rsocket-logging.md`,
    manifest: `id: rsocket-high-load-rules
title: RSocket High Load Rules
description: Performance-oriented rules for RSocket services.
type: rule
tools: [kilo]
maturity: draft
owner: platform-networking
version: "0.1.0"
contents:
  rules:
    - .kilocode/rules/rsocket-performance.md
    - .kilocode/rules/rsocket-logging.md`,
    readme: `# RSocket High Load Rules

> Draft — validate with your SRE before rolling out widely.`,
  },
  {
    id: "qa-test-cases-prompt",
    title: "QA Test Cases Prompt",
    subtitle: "Compact test-case generation from feature descriptions and acceptance criteria.",
    description: "Prompt template for generating compact QA test cases from feature descriptions.",
    overviewMd: `Structured prompt for QA engineers and embedded testers.

**Outputs:**
- positive paths;
- edge cases;
- regression notes tied to AC IDs.`,
    type: "prompt",
    maturity: "approved",
    tools: ["kilo", "opencode"],
    owner: "Quality Guild",
    version: "2.0.0",
    updatedAt: "2026-03-22",
    tags: ["qa", "testing", "prompt"],
    categories: ["quality", "prompts"],
    stacks: ["qa"],
    installCommand: "ai-assets install qa-test-cases-prompt --target ./qa-pack --tool opencode",
    contents: {
      prompts: [".kilocode/prompts/qa-test-cases.md"],
    },
    compatibility: {
      kilo: "supported",
      opencode: "supported",
      target: "both",
      requires: [],
      network: "none",
      sensitiveData: "No external calls",
    },
    governance: {
      reviewedBy: "Quality Guild",
      securityReview: "Passed",
      productionRecommended: true,
      contributionPolicy: "PR required",
      supportChannel: "#quality-ai",
    },
    changelog: [
      { version: "2.0.0", note: "AC-aware sections and table output" },
      { version: "1.0.0", note: "Initial prompt pack" },
    ],
    fileTree: `qa-test-cases-prompt/
├── manifest.yaml
├── README.md
└── .kilocode/
    └── prompts/
        └── qa-test-cases.md`,
    manifest: `id: qa-test-cases-prompt
title: QA Test Cases Prompt
description: Prompt template for compact QA test cases.
type: prompt
tools: [kilo, opencode]
maturity: approved
owner: quality-guild
version: "2.0.0"
contents:
  prompts:
    - .kilocode/prompts/qa-test-cases.md`,
    readme: `# QA Test Cases Prompt

Drop-in prompt for generating **test matrices** from product copy.`,
  },
  {
    id: "code-sceptic-subagent",
    title: "CodeSceptic Subagent",
    subtitle: "A critical subagent that challenges plans, code, and upstream agent outputs.",
    description: "Critical review subagent that challenges plans, code and agent outputs.",
    overviewMd: `Use as a **second opinion** in multi-agent flows.

**Behaviors:**
- surfaces hidden assumptions;
- proposes safer alternatives;
- flags over-confident claims.`,
    type: "subagent",
    maturity: "pilot",
    tools: ["kilo"],
    owner: "Agent Platform",
    version: "0.9.2",
    updatedAt: "2026-04-30",
    tags: ["review", "quality", "agent"],
    categories: ["agents", "quality"],
    stacks: ["security", "frontend"],
    installCommand: "ai-assets install code-sceptic-subagent --target ./agents --tool kilo",
    contents: {
      agents: [".kilo/agents/subagents/code-sceptic.md"],
    },
    compatibility: {
      kilo: "supported",
      opencode: "manual",
      target: "project",
      requires: ["git"],
      network: "none",
      sensitiveData: "No external calls",
    },
    governance: {
      reviewedBy: "Agent Platform",
      securityReview: "Passed (limited scope)",
      productionRecommended: false,
      contributionPolicy: "PR + agent review",
      supportChannel: "#agents-core",
    },
    changelog: [{ version: "0.9.2", note: "Tuned escalation thresholds" }],
    fileTree: `code-sceptic-subagent/
├── manifest.yaml
├── README.md
└── .kilo/
    └── agents/
        └── subagents/
            └── code-sceptic.md`,
    manifest: `id: code-sceptic-subagent
title: CodeSceptic Subagent
description: Critical review subagent for multi-agent setups.
type: subagent
tools: [kilo]
maturity: pilot
owner: agent-platform
version: "0.9.2"
contents:
  agents:
    - .kilo/agents/subagents/code-sceptic.md`,
    readme: `# CodeSceptic Subagent

Composable sceptic intended to run **after** primary agents.`,
  },
  {
    id: "api-design-skill",
    title: "API Design Skill",
    subtitle: "Reusable instructions for REST API contracts aligned with internal standards.",
    description:
      "Reusable instructions for designing REST API contracts according to internal standards.",
    overviewMd: `Covers naming, error models, pagination, and OpenAPI hygiene.

**Ideal for:**
- new public HTTP APIs;
- internal service boundaries;
- contract-first design reviews.`,
    type: "skill",
    maturity: "approved",
    tools: ["kilo", "opencode"],
    owner: "API Guild",
    version: "3.1.0",
    updatedAt: "2026-02-14",
    tags: ["api", "openapi", "backend"],
    categories: ["api", "design"],
    stacks: ["java", "frontend"],
    installCommand: "ai-assets install api-design-skill --target ./service --tool kilo",
    contents: {
      skills: [".kilocode/skills/api-design/SKILL.md"],
    },
    compatibility: {
      kilo: "supported",
      opencode: "supported",
      target: "project",
      requires: [],
      network: "none",
      sensitiveData: "No external calls",
    },
    governance: {
      reviewedBy: "API Guild",
      securityReview: "Passed",
      productionRecommended: true,
      contributionPolicy: "PR required",
      supportChannel: "#api-standards",
    },
    changelog: [
      { version: "3.1.0", note: "Expanded error model guidance" },
      { version: "3.0.0", note: "OpenAPI 3.1 alignment" },
    ],
    fileTree: `api-design-skill/
├── manifest.yaml
├── README.md
└── .kilocode/
    └── skills/
        └── api-design/
            └── SKILL.md`,
    manifest: `id: api-design-skill
title: API Design Skill
description: Skill for REST API contract design.
type: skill
tools: [kilo, opencode]
maturity: approved
owner: api-guild
version: "3.1.0"
contents:
  skills:
    - .kilocode/skills/api-design/SKILL.md`,
    readme: `# API Design Skill

A focused **SKILL.md** you can extend with org-specific examples.`,
  },
  {
    id: "release-readiness-checklist",
    title: "Release Readiness Checklist",
    subtitle: "Human + agent checklist for production releases and rollback readiness.",
    description: "Checklist for verifying release readiness across services and docs.",
    overviewMd: `Structured checklist covering:

- feature flags;
- metrics dashboards;
- rollback scripts;
- comms templates.`,
    type: "checklist",
    maturity: "pilot",
    tools: ["opencode", "kilo"],
    owner: "SRE Council",
    version: "1.0.3",
    updatedAt: "2026-01-09",
    tags: ["release", "sre", "checklist"],
    categories: ["operations"],
    stacks: ["qa", "docs"],
    installCommand: "ai-assets install release-readiness-checklist --target ./runbooks --tool opencode",
    contents: {
      checklists: [".kilocode/checklists/release-readiness.md"],
    },
    compatibility: {
      kilo: "supported",
      opencode: "supported",
      target: "project",
      requires: [],
      network: "none",
      sensitiveData: "No external calls",
    },
    governance: {
      reviewedBy: "SRE Council",
      securityReview: "Passed",
      productionRecommended: true,
      contributionPolicy: "PR required",
      supportChannel: "#sre-ai",
    },
    changelog: [{ version: "1.0.3", note: "Added rollback comms section" }],
    fileTree: `release-readiness-checklist/
├── manifest.yaml
├── README.md
└── .kilocode/
    └── checklists/
        └── release-readiness.md`,
    manifest: `id: release-readiness-checklist
title: Release Readiness Checklist
description: Checklist for production releases.
type: checklist
tools: [opencode, kilo]
maturity: pilot
owner: sre-council
version: "1.0.3"
contents:
  checklists:
    - .kilocode/checklists/release-readiness.md`,
    readme: `# Release Readiness Checklist

Pair this checklist with your **existing** release automation.`,
  },
  {
    id: "security-triage-workflow",
    title: "Security Triage Workflow",
    subtitle: "Multi-step workflow for intake, classification, and handoff of security findings.",
    description: "Workflow asset describing steps from report intake to verified remediation.",
    overviewMd: `Opinionated workflow for AppSec + engineering triage.

**Stages:**
1. Intake normalization
2. Severity rubric
3. Owner assignment
4. Verification loop`,
    type: "workflow",
    maturity: "approved",
    tools: ["kilo"],
    owner: "AppSec",
    version: "1.4.0",
    updatedAt: "2026-05-01",
    tags: ["security", "workflow", "triage"],
    categories: ["security", "process"],
    stacks: ["security"],
    installCommand: "ai-assets install security-triage-workflow --target ./security --tool kilo",
    contents: {
      workflows: [".kilocode/workflows/security-triage.yaml"],
      prompts: [".kilocode/prompts/security-intake.md"],
    },
    compatibility: {
      kilo: "supported",
      opencode: "manual",
      target: "project",
      requires: ["git"],
      network: "optional",
      sensitiveData: "Designed for internal ticketing only",
    },
    governance: {
      reviewedBy: "AppSec leadership",
      securityReview: "Passed",
      productionRecommended: true,
      contributionPolicy: "PR + security review",
      supportChannel: "#appsec-ai",
    },
    changelog: [{ version: "1.4.0", note: "Added verification checklist" }],
    fileTree: `security-triage-workflow/
├── manifest.yaml
├── README.md
└── .kilocode/
    ├── workflows/
    │   └── security-triage.yaml
    └── prompts/
        └── security-intake.md`,
    manifest: `id: security-triage-workflow
title: Security Triage Workflow
description: Workflow for security finding triage.
type: workflow
tools: [kilo]
maturity: approved
owner: appsec
version: "1.4.0"
contents:
  workflows:
    - .kilocode/workflows/security-triage.yaml
  prompts:
    - .kilocode/prompts/security-intake.md`,
    readme: `# Security Triage Workflow

YAML workflow plus a small prompt for **intake normalization**.`,
  },
  {
    id: "analytics-dbt-rules-pack",
    title: "Analytics dbt Rules Pack",
    subtitle: "Lightweight rules for dbt models, tests, and documentation hygiene.",
    description: "Rules for dbt SQL style, test coverage expectations, and model docs.",
    overviewMd: `Helps analytics engineers keep **dbt** projects consistent.

**Focus areas:**
- model naming;
- test placement;
- documentation blocks.`,
    type: "bundle",
    maturity: "pilot",
    tools: ["opencode"],
    owner: "Data Platform",
    version: "0.3.0",
    updatedAt: "2026-04-02",
    tags: ["dbt", "analytics", "sql"],
    categories: ["analytics", "data"],
    stacks: ["analytics"],
    installCommand: "ai-assets install analytics-dbt-rules-pack --target ./dbt --tool opencode",
    contents: {
      rules: [".kilocode/rules/dbt-style.md", ".kilocode/rules/dbt-tests.md"],
      skills: [".kilocode/skills/dbt-review/SKILL.md"],
    },
    compatibility: {
      kilo: "manual",
      opencode: "supported",
      target: "project",
      requires: [],
      network: "none",
      sensitiveData: "No external calls",
    },
    governance: {
      reviewedBy: "Data Platform",
      securityReview: "Passed",
      productionRecommended: false,
      contributionPolicy: "PR required",
      supportChannel: "#data-ai",
    },
    changelog: [{ version: "0.3.0", note: "Added test coverage guidance" }],
    fileTree: `analytics-dbt-rules-pack/
├── manifest.yaml
├── README.md
└── .kilocode/
    ├── rules/
    │   ├── dbt-style.md
    │   └── dbt-tests.md
    └── skills/
        └── dbt-review/
            └── SKILL.md`,
    manifest: `id: analytics-dbt-rules-pack
title: Analytics dbt Rules Pack
description: dbt-oriented rules and a small review skill.
type: bundle
tools: [opencode]
maturity: pilot
owner: data-platform
version: "0.3.0"
contents:
  rules:
    - .kilocode/rules/dbt-style.md
    - .kilocode/rules/dbt-tests.md
  skills:
    - .kilocode/skills/dbt-review/SKILL.md`,
    readme: `# Analytics dbt Rules Pack

Optimized for **OpenCode**-first analytics squads.`,
  },
];

export function getAssetById(id: string): Asset | undefined {
  return ASSETS.find((a) => a.id === id);
}
