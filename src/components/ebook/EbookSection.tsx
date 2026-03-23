import type { ContentBlock } from "@/data/ebook-content";
import { PullQuote } from "./PullQuote";
import { ComparisonTable } from "./ComparisonTable";
import { DepartmentTable } from "./DepartmentTable";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { RoadmapTimeline } from "./RoadmapTimeline";
import { ReadinessChecklist } from "./ReadinessChecklist";

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-brand-subtitle leading-relaxed text-base mb-4 font-[family-name:var(--font-prompt)]">
          {block.text}
        </p>
      );
    case "heading":
      if (block.level === 2) {
        return (
          <h2 className="text-xl md:text-2xl font-medium text-brand-title mt-8 mb-4">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 className="text-lg font-[family-name:var(--font-prompt)] font-bold text-brand-title mt-6 mb-3">
          {block.text}
        </h3>
      );
    case "bullet-list":
      return (
        <ul className="space-y-3 my-4">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-brand-subtitle text-base leading-relaxed font-[family-name:var(--font-prompt)]"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-navy shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "pull-quote":
      return <PullQuote text={block.text} />;
    case "comparison-table":
      return <ComparisonTable headers={block.headers} rows={block.rows} />;
    case "department-table":
      return <DepartmentTable rows={block.rows} />;
    case "architecture-diagram":
      return <ArchitectureDiagram />;
    case "roadmap-timeline":
      return <RoadmapTimeline />;
    case "readiness-checklist":
      return <ReadinessChecklist items={block.items} />;
    default:
      return null;
  }
}

export function EbookSection({
  title,
  blocks,
  id,
}: {
  title: string;
  blocks: ContentBlock[];
  id: string;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-medium text-brand-title mb-6">
        {title}
      </h2>
      {blocks.map((block, i) => (
        <RenderBlock key={i} block={block} />
      ))}
    </section>
  );
}
