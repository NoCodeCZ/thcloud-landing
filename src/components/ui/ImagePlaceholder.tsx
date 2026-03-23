import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({
  label,
  aspect = "video",
  hint,
}: {
  label: string;
  aspect?: "video" | "square" | "wide" | "tall";
  hint?: string;
}) {
  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[21/9]",
    tall: "aspect-[3/4]",
  }[aspect];

  return (
    <div
      className={`${aspectClass} w-full rounded-2xl border-2 border-dashed border-indigo-500/20 bg-indigo-500/[0.03] flex flex-col items-center justify-center gap-3 relative overflow-hidden group hover:border-indigo-500/30 transition-colors`}
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-indigo-400/40" />
        </div>
        <p className="text-sm font-medium text-indigo-300/50">{label}</p>
        {hint && (
          <p className="text-[10px] text-indigo-300/25 max-w-[200px] text-center leading-relaxed">
            {hint}
          </p>
        )}
      </div>

      {/* Corner markers */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-indigo-500/15 rounded-tl-sm" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-indigo-500/15 rounded-tr-sm" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-indigo-500/15 rounded-bl-sm" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-indigo-500/15 rounded-br-sm" />
    </div>
  );
}
