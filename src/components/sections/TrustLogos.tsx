type Logo = {
  name: string;
  src?: string;
  imageClass?: string;
  label?: string;
};

const logos: Logo[] = [
  {
    name: "OpenWebUI",
    src: "/trust-logos/openwebui.ico",
    imageClass: "scale-[0.9]",
  },
  {
    name: "MindsDB",
    src: "/trust-logos/mindsdb-icon.png",
    imageClass: "scale-[0.92]",
  },
  {
    name: "Directus",
    src: "/trust-logos/directus.ico",
    imageClass: "scale-[0.88]",
  },
  {
    name: "Metabase",
    src: "/trust-logos/metabase.svg",
    imageClass: "scale-[0.88]",
  },
  { name: "LangChain", src: "/trust-logos/langchain.svg" },
  { name: "ClickHouse", src: "/trust-logos/clickhouse.ico" },
  { name: "Airbyte", src: "/trust-logos/airbyte.png" },
  { name: "Supabase", src: "/trust-logos/supabase.png" },
];

export function TrustLogos({ label }: { label?: string }) {
  return (
    <section className="max-w-6xl mx-auto w-full text-center">
      <p className="mb-8 text-sm uppercase tracking-[0.24em] text-white/55 font-medium animate-in fade-in slide-in-from-bottom-2 duration-700">
        {label ?? "Powered by"}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-6 md:gap-x-5">
        {logos.map((logo, index) =>
          logo.src ? (
            <div
              key={logo.name}
              className="group flex flex-col items-center gap-2.5 animate-in fade-in zoom-in-95 slide-in-from-bottom-3 duration-700"
              style={{
                animationDelay: `${index * 70}ms`,
                animationFillMode: "both",
              }}
            >
              <div
                className="h-16 w-16 md:h-20 md:w-20 rounded-2xl border border-white/10 bg-gradient-to-b from-white/95 to-white/88 p-3 md:p-3.5 shadow-[0_16px_36px_rgba(15,23,42,0.26)] flex items-center justify-center overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_22px_42px_rgba(15,23,42,0.34)]"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`max-h-full max-w-full object-contain ${
                    "imageClass" in logo ? logo.imageClass ?? "" : ""
                  } transition-transform duration-300 ease-out group-hover:scale-105`}
                />
              </div>
              <span className="text-white/65 text-xs md:text-sm font-medium transition-colors duration-300 group-hover:text-white">
                {logo.name}
              </span>
            </div>
          ) : (
            <div
              key={logo.name}
              className="group flex flex-col items-center gap-2.5 animate-in fade-in zoom-in-95 slide-in-from-bottom-3 duration-700"
              style={{
                animationDelay: `${index * 70}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl border border-white/10 bg-gradient-to-b from-white/95 to-white/88 shadow-[0_16px_36px_rgba(15,23,42,0.26)] flex items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_22px_42px_rgba(15,23,42,0.34)]">
                <span className="text-[10px] md:text-[11px] font-mono font-medium text-white/45">
                  {(logo.label ?? logo.name).slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-white/65 text-xs md:text-sm font-medium transition-colors duration-300 group-hover:text-white">
                {logo.label ?? logo.name}
              </span>
            </div>
          )
        )}
      </div>
    </section>
  );
}
