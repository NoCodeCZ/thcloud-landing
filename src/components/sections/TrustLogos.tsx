type Logo = {
  name: string;
  src?: string;
  imageClass?: string;
  label?: string;
};

const logos: Logo[] = [
  { name: "OpenWebUI", src: "/trust-logos/openwebui.ico", imageClass: "scale-[0.9]" },
  { name: "MindsDB", src: "/trust-logos/mindsdb-icon.png", imageClass: "scale-[0.92]" },
  { name: "Directus", src: "/trust-logos/directus.ico", imageClass: "scale-[0.88]" },
  { name: "Metabase", src: "/trust-logos/metabase.svg", imageClass: "scale-[0.88]" },
  { name: "LangChain", src: "/trust-logos/langchain.svg" },
  { name: "ClickHouse", src: "/trust-logos/clickhouse.ico" },
  { name: "Airbyte", src: "/trust-logos/airbyte.png" },
  { name: "Supabase", src: "/trust-logos/supabase.png" },
];

function LogoChip({ logo }: { logo: Logo }) {
  return (
    <div className="group flex items-center gap-3 rounded-full bg-white px-5 py-3 ring-1 ring-[#DFE2E8] transition-all duration-500 ease-out hover:ring-[#3B36CC]/40 hover:shadow-[0_8px_24px_rgba(59,54,204,0.08)]">
      {logo.src ? (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden">
          <img
            src={logo.src}
            alt={logo.name}
            className={`max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 ${logo.imageClass ?? ""}`}
          />
        </div>
      ) : (
        <span className="font-mono text-[10px] font-semibold text-[#6A718A]">
          {(logo.label ?? logo.name).slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="whitespace-nowrap text-sm font-medium text-[#242424]">
        {logo.label ?? logo.name}
      </span>
    </div>
  );
}

export function TrustLogos({ label }: { label?: string }) {
  const trackLogos = [...logos, ...logos];
  return (
    <section className="mx-auto w-full max-w-6xl text-center">
      <p className="mb-10 text-xs font-medium uppercase tracking-[0.28em] text-[#6A718A]">
        {label ?? "Powered by"}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-3 animate-marquee">
          {trackLogos.map((logo, i) => (
            <LogoChip key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
