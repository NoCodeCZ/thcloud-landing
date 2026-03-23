import { redirect } from "next/navigation";

// Blueprint content is now on the homepage.
// Redirect any old /blueprint links to the homepage.
export default async function BlueprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
