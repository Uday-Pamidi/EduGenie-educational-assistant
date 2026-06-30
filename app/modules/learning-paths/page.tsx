import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LearningPathsModule from "@/components/modules/learning-paths";

export const metadata = {
  title: "Learning Paths - EduGenie",
  description: "Get personalized learning recommendations",
};

export default async function LearningPathsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/sign-in");

  return <LearningPathsModule />;
}
