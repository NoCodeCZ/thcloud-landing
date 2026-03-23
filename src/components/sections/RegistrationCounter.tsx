"use client";

const INITIAL_COUNT = parseInt(
  process.env.NEXT_PUBLIC_WEBINAR_INITIAL_COUNT || "0",
  10
);

export function RegistrationCounter({
  translations,
}: {
  translations?: { text: string };
}) {
  if (INITIAL_COUNT < 10) return null;

  const text = (translations?.text ?? "{count} business owners have already registered").replace(
    "{count}",
    String(INITIAL_COUNT)
  );

  // Split on the count to wrap it in a styled span
  const parts = text.split(String(INITIAL_COUNT));

  return (
    <div className="text-center py-4">
      <p className="text-white/60 text-sm font-[family-name:var(--font-prompt)]">
        {parts[0]}
        <span className="text-white font-medium">{INITIAL_COUNT}</span>
        {parts[1]}
      </p>
    </div>
  );
}
