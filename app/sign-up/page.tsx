'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import AuthForm from "@/components/auth-form";

export default function SignUpPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (isMounted && data?.user) {
          router.push("/");
          return;
        }
        if (isMounted) {
          setChecked(true);
        }
      } catch (error) {
        // User not signed up, continue to signup page
        if (isMounted) {
          setChecked(true);
        }
      }
    };
    checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // Show loading while checking session
  if (!checked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <AuthForm mode="sign-up" />;
}
