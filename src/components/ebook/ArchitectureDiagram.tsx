import { Database, BrainCircuit, Workflow, Monitor, Bot } from "lucide-react";

const layerIcons: Record<number, React.ComponentType<{ className?: string }>> = {
  1: Database,
  2: BrainCircuit,
  3: Workflow,
  4: Monitor,
  5: Bot,
};

const layers = [
  {
    number: 5,
    name: "AI AGENTS",
    tech: "Custom MCPs",
    description: "AI that takes action",
    lightColor: "bg-brand-navy",
    darkColor: "bg-white/20",
  },
  {
    number: 4,
    name: "AI INTERFACE",
    tech: "OpenWebUI",
    description: "Where your team works",
    lightColor: "bg-brand-navy/90",
    darkColor: "bg-white/15",
  },
  {
    number: 3,
    name: "BUSINESS OS",
    tech: "Directus",
    description: "Automations & workflows",
    lightColor: "bg-brand-navy/80",
    darkColor: "bg-white/12",
  },
  {
    number: 2,
    name: "DATA BRAIN",
    tech: "MindsDB",
    description: "AI-queryable data",
    lightColor: "bg-brand-navy/70",
    darkColor: "bg-white/10",
  },
  {
    number: 1,
    name: "DATA FOUNDATION",
    tech: "Your business data",
    description: "Your business data, unified",
    lightColor: "bg-brand-navy/60",
    darkColor: "bg-white/8",
  },
];

export function ArchitectureDiagram({
  variant = "light",
  translations,
}: {
  variant?: "light" | "dark";
  translations?: { layers: readonly { name: string; description: string }[] };
}) {
  const isDark = variant === "dark";

  // translations?.layers is indexed 0–4 matching layers array order (5→1)
  const translatedLayers = translations?.layers;

  return (
    <div className="my-8 space-y-2">
      {layers.map((layer, idx) => {
        const Icon = layerIcons[layer.number];
        const tLayer = translatedLayers?.[idx];
        return (
          <div
            key={layer.number}
            className={`${isDark ? layer.darkColor : layer.lightColor} text-white rounded-xl p-4 md:p-5 flex items-center gap-4 ${isDark ? "hover:scale-[1.01] transition-all duration-300" : ""}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${isDark ? "bg-gradient-to-br from-white to-indigo-100 text-brand-navy" : "bg-white text-brand-navy"} font-[family-name:var(--font-bai-jamjuree)]`}>
              {layer.number}
            </div>
            {isDark && Icon && (
              <Icon className="w-5 h-5 text-white/40 shrink-0 -ml-1" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="font-medium text-sm md:text-base">
                  {tLayer?.name ?? layer.name}
                </span>
                <span className="text-white/60 text-xs md:text-sm">
                  ({layer.tech})
                </span>
              </div>
              <p className="text-white/70 text-xs md:text-sm mt-0.5">
                {tLayer?.description ?? layer.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
