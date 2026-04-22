import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { AdminLoginForm } from "@/components/crm/AdminLoginForm";
import { isAdminCookieAuthenticated } from "@/lib/admin-auth";

export default async function CrmLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();

  if (isAdminCookieAuthenticated(cookieStore)) {
    redirect(`/${locale}/crm`);
  }

  return (
    <main className="min-h-screen bg-brand-dark text-white">
      <TopBar locale={locale} />
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-6 pb-12">
        <AdminLoginForm locale={locale} />
      </section>
    </main>
  );
}
