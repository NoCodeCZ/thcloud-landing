const phases = [
  {
    phase: "Phase 1",
    title: "Data Foundation",
    steps: [
      "Business audit + data mapping",
      "Data warehouse setup + data cleaning",
    ],
    deliverable: "Clean, unified data warehouse live",
  },
  {
    phase: "Phase 2",
    title: "Intelligence Layer",
    steps: [
      "MindsDB deployment + data connections",
      "Metabase dashboards built per department",
    ],
    deliverable: "Business data queryable by AI, dashboards live",
  },
  {
    phase: "Phase 3",
    title: "Operating System + Interface",
    steps: [
      "Directus deployment + workflow mapping",
      "OpenWebUI deployment + team onboarding",
    ],
    deliverable: "Team live on connected AI, first automations running",
  },
  {
    phase: "Phase 4",
    title: "Agents + Optimization",
    steps: [
      "Custom MCP development (2-3 agents)",
      "Testing, optimization, ROI measurement",
    ],
    deliverable: "AI agents running, ROI documented, system handed over",
  },
];

export function RoadmapTimeline() {
  return (
    <div className="my-8 relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

      <div className="space-y-6">
        {phases.map((p, i) => (
          <div key={i} className="flex gap-4 md:gap-6">
            {/* Phase badge */}
            <div className="relative z-10 shrink-0">
              <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-[family-name:var(--font-bai-jamjuree)] font-bold text-sm">
                {i + 1}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-brand-surface rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-brand-navy uppercase tracking-wider">
                  {p.phase}
                </span>
              </div>
              <h4 className="font-medium text-brand-title text-lg mb-3">
                {p.title}
              </h4>
              <ul className="space-y-1.5 mb-3">
                {p.steps.map((step, j) => (
                  <li
                    key={j}
                    className="text-sm text-brand-subtitle flex gap-2"
                  >
                    <span className="text-brand-navy shrink-0">&#8226;</span>
                    {step}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-brand-title font-medium">
                Deliverable: {p.deliverable}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
