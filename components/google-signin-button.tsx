"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000";

  // Add protocol if it's a bare Vercel domain
  url = url.startsWith("http") ? url : `https://${url}`;

  // Final safe join
  return `${url.replace(/\/+$/, "")}/complete-profile`;
};

export default function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getURL(),
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full gap-2"
      onClick={handleGoogleSignIn}
    >
      <FcGoogle className="h-5 w-5" />
      Sign in with Google
    </Button>
  );
}
