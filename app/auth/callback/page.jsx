"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // User logged in → redirect to dashboard
        router.replace("/dashboard");
      } else {
        // Not logged in → go back to login
        router.replace("/login");
      }
    };

    checkSession();
  }, [router]);

  return <p className="text-center mt-20 text-lg">Logging you in...</p>;
}
