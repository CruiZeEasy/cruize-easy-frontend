"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PATHS } from "@/utils/path";
import { useEffect } from "react";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import HostSidebar from "@/components/shared/HostSidebar";
import { UserRoles } from "@/constants/enums";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useCurrentUser();
  const { navigate, isNavigating } = usePageTransition();

  const isUser = user?.roles?.includes(UserRoles.USER);

  // Redirect if authenticated but not user
  useEffect(() => {
    if (!isLoading && user && !isUser) {
      navigate(PATHS.HOME);
    }
  }, [isLoading, user, isUser, navigate]);

  // Block render until we're 100% sure about auth state
  if (isLoading || isNavigating) return <PageTransitionSpinner isVisible />;

  // Authenticated but not host (redirect will trigger)
  if (!isUser) return <PageTransitionSpinner isVisible />;

  return (
    <div className="flex md:h-screen bg-neutral-100">
      {/* <HostSidebar />
      <main className="flex-1 md:overflow-y-auto">
        <div className="max-w-[1440px] w-full mx-auto">{children}</div>
      </main> */}

      {children}
    </div>
  );
}
