export type AssetType =
  | "skill"
  | "rule"
  | "agent"
  | "subagent"
  | "prompt"
  | "checklist"
  | "workflow"
  | "bundle";

export type Maturity = "draft" | "pilot" | "approved" | "deprecated";

export type Tool = "kilo" | "opencode";

export type StackTag =
  | "java"
  | "frontend"
  | "qa"
  | "docs"
  | "security"
  | "analytics";

export type Compatibility = {
  kilo: "supported" | "manual" | "unsupported";
  opencode: "supported" | "manual" | "unsupported";
  target: "project" | "global" | "both";
  requires: string[];
  network: "none" | "optional" | "required";
  sensitiveData: string;
};

export type Governance = {
  reviewedBy: string;
  securityReview: string;
  productionRecommended: boolean;
  contributionPolicy: string;
  supportChannel: string;
};

export type ChangelogEntry = {
  version: string;
  note: string;
};

export type Asset = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  overviewMd: string;
  type: AssetType;
  maturity: Maturity;
  tools: Tool[];
  owner: string;
  version: string;
  updatedAt: string;
  tags: string[];
  categories: string[];
  stacks: StackTag[];
  installCommand: string;
  contents: {
    skills?: string[];
    rules?: string[];
    agents?: string[];
    prompts?: string[];
    checklists?: string[];
    workflows?: string[];
  };
  compatibility: Compatibility;
  governance: Governance;
  changelog: ChangelogEntry[];
  fileTree: string;
  manifest: string;
  readme: string;
};
