import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandLockup } from "./BrandLockup";

export function TopBar({
  actionLabel,
  actionHref,
  locale,
}: {
  actionLabel?: string;
  actionHref?: string;
  locale?: string;
}) {
  const brandHref = locale ? `/${locale}` : "/th";
  return (
    <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
      <Link href={brandHref} className="flex items-center gap-2">
        <BrandLockup textClassName="text-xl" />
      </Link>
      {actionLabel && actionHref && (
        <Button
          asChild
          variant="outline"
          className="border-white/25 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white"
        >
          <a href={actionHref}>{actionLabel}</a>
        </Button>
      )}
    </header>
  );
}
