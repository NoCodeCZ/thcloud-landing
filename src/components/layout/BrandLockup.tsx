import Image from "next/image";

type BrandLockupProps = {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
};

export function BrandLockup({
  className = "",
  textClassName = "",
  iconClassName = "",
}: BrandLockupProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`.trim()}>
      <Image
        src="/brand/thcloud-mark.png"
        alt="THCloud.AI logo"
        width={64}
        height={64}
        className={`h-8 w-8 shrink-0 rounded-lg ${iconClassName}`.trim()}
        priority
      />
      <span
        className={`font-[family-name:var(--font-bai-jamjuree)] font-bold text-current ${textClassName}`.trim()}
      >
        THCloud.AI
      </span>
    </span>
  );
}
