"use client";

import { useState } from "react";

export function ReadinessChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(items.length).fill(false)
  );

  const yesCount = checked.filter(Boolean).length;

  function toggle(index: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  return (
    <div className="my-6 space-y-4">
      {items.map((item, i) => (
        <label
          key={i}
          className="flex gap-3 items-start cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={checked[i]}
            onChange={() => toggle(i)}
            className="mt-1 w-5 h-5 rounded border-2 border-brand-navy text-brand-navy focus:ring-brand-navy shrink-0"
          />
          <span className="text-brand-title leading-relaxed text-base group-hover:text-brand-navy transition-colors">
            {item}
          </span>
        </label>
      ))}
      {yesCount >= 3 && (
        <div className="bg-brand-navy/5 border border-brand-navy/20 rounded-xl p-4 mt-4">
          <p className="text-brand-navy font-medium text-sm">
            You checked {yesCount} out of {items.length} — your business is
            ready for connected AI.
          </p>
        </div>
      )}
    </div>
  );
}
