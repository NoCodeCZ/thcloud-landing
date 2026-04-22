import { TopBar } from "@/components/layout/TopBar";
import { LeadKanbanBoard } from "@/components/crm/LeadKanbanBoard";

export default async function CrmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-brand-dark text-white">
      <TopBar locale={locale} />
      <LeadKanbanBoard locale={locale} />
    </main>
  );
}
