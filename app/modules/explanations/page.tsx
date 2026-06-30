import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ExplanationsModule from "@/components/modules/explanations";

export const metadata = {
  title: "Concept Explanations - EduGenie",
  description: "Understand complex concepts with detailed explanations",
};

export default async function ExplanationsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/sign-in");

  return <ExplanationsModule />;
}
