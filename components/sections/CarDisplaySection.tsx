import Image from "next/image";
import React from "react";

export function CarDisplaySection() {
  return (
    <section className="container">
      <div className="relative h-[250px] sm:h-[450px] border border-red-500 bg-white flex items-center justify-center">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[30px] sm:w-[60px] h-[160px] sm:h-[282px] z-0 bg-gradient-to-b from-[#223766]  to-[#111827] to-50%"></div>

        {/* Car */}
        <div className="relative">
          <Image
            src="/images/cars/featured.png"
            alt="Car Display"
            width={600}
            height={407}
            quality={100}
            className="relative z-10 w-[300px] sm:w-[600px] h-auto"
          />

          <Image
            src="/images/shapes/car-shadow.png"
            alt="Background Shape Left"
            width={450}
            height={50}
            className="absolute left-9 -bottom-2 hidden"
          />
        </div>

        <div className="absolute bottom-4 border-[0.67px] sm:border-2 border-[#1C2E53] w-32 sm:w-44 py-3 rounded-full z-10"></div>

        <div className="absolute right-0 sm:w-38 md:w-72  h-full z-0 bg-gradient-to-b from-[#223766]  to-[#111827] to-50%"></div>
      </div>
    </section>
  );
}
