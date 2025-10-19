import { CarDisplaySection } from "@/components/sections/CarDisplaySection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PopularCarsSection } from "@/components/sections/PopularCarsSection";
import { WhatOurCustomersSaySection } from "@/components/sections/WhatOurCustomersSaySection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import React from "react";

export default function LandingPage() {
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
// import React, { useEffect } from "react";
// import { getCurrentUser } from "@/services/userService";

// export default function LandingPage() {
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const user = await getCurrentUser();
//         console.log("Current User:", user);
//       } catch (err) {
//         console.error("Error fetching user:", err);
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
//     </div>
//   );
// }
