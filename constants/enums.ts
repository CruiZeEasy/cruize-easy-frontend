export enum UserRoles {
  USER = "ROLE_USER",
  HOST = "ROLE_HOST",
  ADMIN = "ROLE_ADMIN",
}

export const GENDER_TYPES = ["MALE", "FEMALE"] as const;
export const RENT_TYPES = ["SELF_DRIVE", "DRIVER"] as const;
export const SEAT_TYPES = ["1", "2", "3", "4"] as const;
export const TRANSMISSION_TYPES = ["MANUAL", "AUTOMATIC", "ELECTRIC"] as const;

export type GenderType = (typeof GENDER_TYPES)[number];
export type RentType = (typeof RENT_TYPES)[number];
export type SeatType = (typeof SEAT_TYPES)[number];
export type TransmissionType = (typeof TRANSMISSION_TYPES)[number];
