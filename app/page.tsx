import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DashboardClient } from "@/components/dashboard-client";

export const metadata = {
  title: "Dashboard - EduGenie",
  description: "Your personalized learning dashboard",
};

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) {
    redirect("/sign-in");
  }

  return <DashboardClient user={session.user} />;
}
