// "use client";

// import { useCurrentUser } from "@/hooks/useCurrentUser";
// import { usePageTransition } from "@/hooks/usePageTransition";
// import { PATHS } from "@/utils/path";
// import { useEffect, useState } from "react";
// import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
// import { getNextOnboardingPath } from "@/utils/getNextOnboardingPath";

// export default function OnboardingLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { navigate } = usePageTransition();
//   const { data: user, isLoading, error } = useCurrentUser();
//   const [ready, setReady] = useState(false); // <- block until redirect decision

//   useEffect(() => {
//     if (!isLoading) {
//       if ((error as any)?.status === 401) {
//         navigate(PATHS.AUTH.LOGIN);
//       } else if (user?.profileCompleted) {
//         const next = getNextOnboardingPath(user);
//         console.log("Next path:", next);
//         if (next !== PATHS.ONBOARDING.COMPLETE_PROFILE) {
//           navigate(next);
//         } else {
//           setReady(true);
//         }
//       } else {
//         setReady(true);
//       }
//     }
//   }, [isLoading, error, user, navigate]);

//   // show spinner while loading or until redirect decision is done
//   if (isLoading || !ready) return <PageTransitionSpinner isVisible />;

//   return <>{children}</>;
// }

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
  const { navigate } = usePageTransition();
  const { data: user, isLoading, error } = useCurrentUser();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if ((error as any)?.status === 401) {
        navigate(PATHS.AUTH.LOGIN);
      } else {
        const next = getNextOnboardingPath(user);

        // If the current page is not the correct next step, redirect
        if (next !== window.location.pathname) {
          navigate(next);
        } else {
          setReady(true);
        }
      }
    }
  }, [isLoading, error, user, navigate]);

  if (!ready) return <PageTransitionSpinner isVisible />;

  return <>{children}</>;
}
