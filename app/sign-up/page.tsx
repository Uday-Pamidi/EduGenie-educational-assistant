'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import AuthForm from "@/components/auth-form";

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user) {
          router.push("/");
        }
      } catch (error) {
        // User not signed up, continue to signup page
      }
    };
    checkSession();
  }, [router]);

  return <AuthForm mode="sign-up" />;
}
