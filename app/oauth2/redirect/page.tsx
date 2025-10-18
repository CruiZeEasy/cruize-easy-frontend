import { Suspense } from "react";
import { OAuthRedirectClient } from "./OauthRedirectClient";

export default function OAuthRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <OAuthRedirectClient />
    </Suspense>
  );
}
