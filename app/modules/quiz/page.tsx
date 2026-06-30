import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import QuizModule from "@/components/modules/quiz";

export const metadata = {
  title: "Quiz Generator - EduGenie",
  description: "Generate and take AI-powered quizzes",
};

export default async function QuizPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/sign-in");

  return <QuizModule />;
}
