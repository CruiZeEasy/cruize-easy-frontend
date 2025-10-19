import { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { VerifyOtpClient } from "./_components/VerifyOtpClient";

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
