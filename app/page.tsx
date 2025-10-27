import React from "react";
import { CarDisplaySection } from "@/components/sections/CarDisplaySection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PopularCarsSection } from "@/components/sections/PopularCarsSection";
import { WhatOurCustomersSaySection } from "@/components/sections/WhatOurCustomersSaySection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";

export default async function LandingPage() {
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
    </div>
  );
}

// "use client";

// import { CarDisplaySection } from "@/components/sections/CarDisplaySection";
// import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
// import { PopularCarsSection } from "@/components/sections/PopularCarsSection";
// import { WhatOurCustomersSaySection } from "@/components/sections/WhatOurCustomersSaySection";
// import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
// import { Footer } from "@/components/shared/Footer";
// import { Header } from "@/components/shared/Header";
// import React, { useEffect, useState } from "react";
// import { getCurrentUser } from "@/services/userService";
// import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
// import { usePageTransition } from "@/hooks/usePageTransition";
// import { APIError } from "@/utils/apiClient";
// import { Toast } from "@/components/ui/Toast";

// export default function LandingPage() {
//   const { isNavigating } = usePageTransition();
//   const [toast, setToast] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const user = await getCurrentUser();
//         console.log("Current User:", user);
//       } catch (err: any) {
//         const message =
//           err instanceof APIError
//             ? err.message
//             : "Couldn't connect. Check your internet connection.";
//         setToast({ message, type: "error" });
//       }
//     }

//     fetchUser();
//   }, []);

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

//       {/* Toast */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       {/* Page Transition Spinner */}
//       <PageTransitionSpinner isVisible={isNavigating} />
//     </div>
//   );
// }
