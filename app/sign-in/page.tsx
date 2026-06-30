'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import AuthForm from "@/components/auth-form";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user) {
          router.push("/");
        }
      } catch (error) {
        // User not signed in, continue to login page
      }
    };
    checkSession();
  }, [router]);

  return <AuthForm mode="sign-in" />;
}
