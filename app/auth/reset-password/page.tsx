import React, { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { ResetPasswordClient } from "./_components/ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
