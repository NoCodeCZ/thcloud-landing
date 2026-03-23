export function PullQuote({ text }: { text: string }) {
  return (
    <blockquote className="border-l-4 border-brand-navy pl-6 py-4 my-6">
      <p className="text-lg md:text-xl font-medium text-brand-title leading-relaxed italic">
        {text}
      </p>
    </blockquote>
  );
}
