"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const checkSessionAndSaveUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const user = session.user;

        // Database me user insert / update
        await supabase.from("users").upsert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name ?? "",
        });

        // Redirect to dashboard
        router.replace("/dashboard");
      } else {
        router.replace("/auth");
      }
    };

    checkSessionAndSaveUser();
  }, [router]);

  return <p className="text-center mt-20 text-lg">Logging you in...</p>;
}
