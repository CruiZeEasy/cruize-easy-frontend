import React from "react";
import { PopularCar } from "./PopularCar";
import { OtherListings } from "./OtherListings";
import { useAvailableVehicles } from "@/hooks/useAvailableVehicles";

export function ListingsOverview() {
  const { data: vehicles, isLoading } = useAvailableVehicles();

  console.log(vehicles);
  return (
    <>
      <PopularCar />
      <OtherListings />
    </>
  );
}
