import React from "react";
import { PopularCar } from "./PopularCar";
import { OtherListings } from "./OtherListings";

export function ListingsOverview() {
  return (
    <section className="md:col-span-3  mt-4 md:mt-0 min-h-screen min-w-0 ">
      <PopularCar />
      <OtherListings />
    </section>
  );
}
