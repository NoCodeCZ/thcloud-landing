export function HeroSection({
  thaiHeadline,
  englishHeadline,
  subhead,
  children,
}: {
  thaiHeadline?: string;
  englishHeadline: string;
  subhead: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="text-center max-w-3xl mx-auto relative z-10">
      {thaiHeadline && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-lg md:text-xl text-indigo-300/80 mb-2 font-[family-name:var(--font-prompt)]">
            {thaiHeadline}
          </p>
          <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent mb-4" />
        </div>
      )}
      <h1 className="text-3xl md:text-5xl font-medium leading-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        {englishHeadline}
      </h1>
      <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 font-[family-name:var(--font-prompt)] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        {subhead}
      </p>
      {children}
    </section>
  );
}
