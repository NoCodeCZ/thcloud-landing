export function BulletList({
  title,
  items,
  variant = "dark",
}: {
  title: string;
  items: string[];
  variant?: "dark" | "light";
}) {
  const textColor = variant === "dark" ? "text-white" : "text-brand-title";
  const itemColor = variant === "dark" ? "text-white/80" : "text-brand-subtitle";
  const dotColor = variant === "dark" ? "bg-white" : "bg-brand-navy";

  return (
    <section className="max-w-2xl mx-auto w-full">
      <h2
        className={`text-xl md:text-2xl font-medium mb-6 ${textColor}`}
      >
        {title}
      </h2>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className={`flex gap-3 ${itemColor} text-base leading-relaxed font-[family-name:var(--font-prompt)]`}>
            <span
              className={`mt-2 w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`}
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
