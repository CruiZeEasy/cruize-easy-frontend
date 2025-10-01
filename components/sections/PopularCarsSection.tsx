import Image from "next/image";
import React from "react";

export function PopularCarsSection() {
  return (
    <section className="container">
      <div className="flex flex-col items-center text-center space-y-6 mb-12">
        <h2 className="text-3xl sm:text-4xl font-gilroy-bold">Popular Cars</h2>
        <p className=" text-neutral-600 font-gilroy-medium">
          Choose from our selection of premium vehicles for your next adventure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border-[#e4e4e4] shadow-md p-4">
          <span>
            <Image
              src="/images/icons/heart.svg"
              width={50}
              height={50}
              alt="heart icon"
              className="size-4"
            />
          </span>
          <div className="flex justify-center">
            <Image
              src="/images/cars/1.png"
              width={250}
              height={100}
              alt="Car Image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
