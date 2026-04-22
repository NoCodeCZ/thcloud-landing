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
        src="/brand/thcloud-mark.svg"
        alt="THCloud.AI logo"
        width={32}
        height={32}
        className={`h-8 w-8 shrink-0 ${iconClassName}`.trim()}
        priority
      />
      <span
        className={`font-[family-name:var(--font-bai-jamjuree)] font-bold text-white ${textClassName}`.trim()}
      >
        THCloud.AI
      </span>
    </span>
  );
}
