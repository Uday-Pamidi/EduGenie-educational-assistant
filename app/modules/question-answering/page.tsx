import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import QuestionAnsweringModule from "@/components/modules/question-answering";

export const metadata = {
  title: "Ask Questions - EduGenie",
  description: "Get instant answers to your educational questions",
};

export default async function QuestionAnsweringPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/sign-in");

  return <QuestionAnsweringModule />;
}
