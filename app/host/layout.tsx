"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PATHS } from "@/utils/path";
import { useEffect } from "react";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { Sidebar } from "@/components/shared/Sidebar";
import { UserRoles } from "@/constants/enums";

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useCurrentUser();
  const { navigate, isNavigating } = usePageTransition();

  const isHost = user?.roles?.includes(UserRoles.HOST);

  // Redirect if authenticated but not host
  useEffect(() => {
    if (!isLoading && user && !isHost) {
      navigate(PATHS.HOME);
    }
  }, [isLoading, user, isHost, navigate]);

  // Block render until we're 100% sure about auth state
  if (isLoading || isNavigating) return <PageTransitionSpinner isVisible />;

  // Authenticated but not host (redirect will trigger)
  if (!isHost) return <PageTransitionSpinner isVisible />;

  return (
    <div className="flex md:h-screen bg-neutral-100">
      <Sidebar role="host" />
      <main className="flex-1 md:overflow-y-auto">
        <div className="max-w-[1440px] w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
