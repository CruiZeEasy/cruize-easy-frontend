import { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { SignUpClient } from "./_components/SignUpClient";

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      }
    >
      <SignUpClient />
    </Suspense>
  );
}
