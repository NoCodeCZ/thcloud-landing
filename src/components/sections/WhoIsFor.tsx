export function WhoIsFor({
  forItems,
  notForItems,
  forTitle,
  notForTitle,
}: {
  forItems: string[];
  notForItems: string[];
  forTitle?: string;
  notForTitle?: string;
}) {
  return (
    <section className="max-w-2xl mx-auto w-full space-y-8">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">
          {forTitle ?? "This webinar is for you if:"}
        </h3>
        <ul className="space-y-3">
          {forItems.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-white/80 font-[family-name:var(--font-prompt)]"
            >
              <span className="text-green-400 shrink-0">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium text-white mb-4">
          {notForTitle ?? "This webinar is NOT for:"}
        </h3>
        <ul className="space-y-3">
          {notForItems.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-white/50 font-[family-name:var(--font-prompt)]"
            >
              <span className="text-brand-alert shrink-0">&#10007;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
