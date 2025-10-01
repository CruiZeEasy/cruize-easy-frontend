import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PopularCarsSection } from "@/components/sections/PopularCarsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import React from "react";

export default function LandingPage() {
  return (
    <main className="py-12 sm:py-28">
      <HowItWorksSection />
      <WhyChooseUsSection />
      <PopularCarsSection />
    </main>
  );
}
