import {
  GENDER_TYPES,
  RENT_TYPES,
  SEAT_TYPES,
  TRANSMISSION_TYPES,
} from "@/constants/enums";

// Gender
export const genderOptions = GENDER_TYPES.map((g) => ({
  value: g,
  label: g.charAt(0) + g.slice(1).toLowerCase(),
}));

// Rent type
export const rentTypeOptions = RENT_TYPES.map((r) => ({
  value: r,
  label: r
    .replace("_", " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase()),
}));

// Seats
export const seatOptions = SEAT_TYPES.map((s) => ({
  value: s,
  label: s,
}));

// Transmission
export const transmissionOptions = TRANSMISSION_TYPES.map((t) => ({
  value: t,
  label: t.charAt(0) + t.slice(1).toLowerCase(),
}));

// in case I need more control later in future

// export const transmissionOptions = [
//   { value: "MANUAL", label: "Manual" },
//   { value: "AUTOMATIC", label: "Automatic" },
//   { value: "ELECTRIC", label: "Electric" },
// ] as const;

// export const rentTypeOptions = [
//   { value: "SELF_DRIVE", label: "Self Drive" },
//   { value: "DRIVER", label: "Driver" },
// ] as const;
