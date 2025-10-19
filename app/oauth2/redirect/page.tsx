import { Suspense } from "react";
import { OAuthRedirectClient } from "./_components/OAuthRedirectClient";
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
      <OAuthRedirectClient />
    </Suspense>
  );
}
