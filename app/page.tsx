// import React from "react";
// import { CarDisplaySection } from "@/components/sections/CarDisplaySection";
// import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
// import { PopularCarsSection } from "@/components/sections/PopularCarsSection";
// import { WhatOurCustomersSaySection } from "@/components/sections/WhatOurCustomersSaySection";
// import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
// import { Footer } from "@/components/shared/Footer";
// import { Header } from "@/components/shared/Header";

// export default async function LandingPage() {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       <main className="py-12 sm:py-28 flex-1">
//         <HowItWorksSection />
//         <WhyChooseUsSection />
//         <PopularCarsSection />
//         <WhatOurCustomersSaySection />
//         <CarDisplaySection />
//       </main>
//       <Footer />
//     </div>
//   );
// }

"use client";

import { CarDisplaySection } from "@/components/sections/CarDisplaySection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PopularCarsSection } from "@/components/sections/PopularCarsSection";
import { WhatOurCustomersSaySection } from "@/components/sections/WhatOurCustomersSaySection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import React, { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "@/services/userService";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { usePageTransition } from "@/hooks/usePageTransition";
import Cookies from "js-cookie";
import { APIError } from "@/utils/apiClient";
import { PATHS } from "@/utils/path";
import { Toast } from "@/components/ui/Toast";

export default function LandingPage() {
  const { navigate, isNavigating } = usePageTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const hasRedirected = useRef(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        console.log("Current User:", user);
      } catch (err: any) {
        if (
          err instanceof APIError &&
          err.status === 401 &&
          !hasRedirected.current
        ) {
          hasRedirected.current = true;
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");

          setToast({
            message: "Your session expired. Please sign in again.",
            type: "error",
          });

          setTimeout(() => {
            navigate(PATHS.AUTH.LOGIN);
          }, 1800);
        }
      }
    }

    fetchUser();
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="py-12 sm:py-28 flex-1">
        <HowItWorksSection />
        <WhyChooseUsSection />
        <PopularCarsSection />
        <WhatOurCustomersSaySection />
        <CarDisplaySection />
      </main>

      <Footer />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </div>
  );
}
