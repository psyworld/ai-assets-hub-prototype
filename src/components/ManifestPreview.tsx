import { CodeBlock } from "@/components/CodeBlock";

export function ManifestPreview({ yaml }: { yaml: string }) {
  return <CodeBlock code={yaml} language="yaml" />;
}
