

import { Suspense } from "react";
import VerifyOtpClient from "./_components/VerifyOtpClient";
import { Spinner } from "@/components/ui/Spinner";

export default function OAuthRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      }
    >
      <VerifyOtpClient />
    </Suspense>
  );
}
