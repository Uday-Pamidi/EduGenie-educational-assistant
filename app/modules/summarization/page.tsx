import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SummarizationModule from "@/components/modules/summarization";

export const metadata = {
  title: "Summarization - EduGenie",
  description: "Summarize learning materials efficiently",
};

export default async function SummarizationPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/sign-in");

  return <SummarizationModule />;
}
