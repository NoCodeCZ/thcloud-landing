const logos = [
  { name: "OpenWebUI", src: "/trust-logos/openwebui.png", hasBg: true },
  { name: "MindsDB", src: "/trust-logos/mindsdb.png" },
  { name: "Directus", src: "/trust-logos/directus.png" },
  { name: "Metabase", src: "/trust-logos/metabase.png", hasBg: true },
  { name: "LangChain", label: "LangChain" },
  { name: "ClickHouse", label: "ClickHouse" },
  { name: "Airbyte", label: "Airbyte" },
  { name: "Supabase", label: "Supabase" },
];

export function TrustLogos({ label }: { label?: string }) {
  return (
    <section className="max-w-3xl mx-auto w-full text-center">
      <p className="text-xs uppercase tracking-widest text-white/30 mb-6 font-medium">
        {label ?? "Powered by"}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-10">
        {logos.map((logo) =>
          logo.src ? (
            <div key={logo.name} className="flex flex-col items-center gap-1.5">
              <div
                className={`h-10 w-10 md:h-12 md:w-12 rounded-lg flex items-center justify-center overflow-hidden ${
                  logo.hasBg ? "bg-white/90 p-1.5 md:p-2" : "p-1 md:p-1.5"
                }`}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-white/25 text-[9px] md:text-[10px] font-medium">
                {logo.name}
              </span>
            </div>
          ) : (
            <div key={logo.name} className="flex flex-col items-center gap-1.5">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <span className="text-[9px] md:text-[10px] font-mono font-medium text-white/30">
                  {logo.label!.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-white/25 text-[9px] md:text-[10px] font-medium">
                {logo.label}
              </span>
            </div>
          )
        )}
      </div>
    </section>
  );
}
