"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PATHS } from "@/utils/path";
import { useEffect, useState } from "react";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { getNextOnboardingPath } from "@/utils/getNextOnboardingPath";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { navigate, isNavigating } = usePageTransition();
  const { data: user, isLoading, error } = useCurrentUser();
  const [ready, setReady] = useState(false); // blocks rendering until redirect decision

  useEffect(() => {
    if (!isLoading) {
      // If not authenticated
      if ((error as any)?.status === 401) {
        navigate(PATHS.AUTH.LOGIN);
        return;
      }

      // Determine the next onboarding step
      const next = getNextOnboardingPath(user);

      // If we are not on the correct page, redirect
      if (!ready && next !== window.location.pathname) {
        navigate(next);
      } else {
        // Otherwise we are on the right page, mark ready
        setReady(true);
      }
    }
  }, [isLoading, error, user, navigate, ready]);

  // Show spinner while loading, navigating, or until ready
  if (isLoading || !ready || isNavigating)
    return <PageTransitionSpinner isVisible />;

  return <>{children}</>;
}
