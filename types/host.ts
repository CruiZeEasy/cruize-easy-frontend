// export interface Host {
//   totalEarnings: number;
//   totalVehicles: number;
//   totalBookings: number;
//   totalReviews: number;
//   averageRating: number;
//   walletStatus: "ACTIVE" | null;
// }

import { GenderType, UserStatusType } from "@/constants/enums";
import { Vehicle } from "./vehicle";

export interface Host {
  totalEarnings: number;
  totalVehicles: number;
  totalBookings: number;
  totalReviews: number;
  averageRating: number;
  walletStatus: "ACTIVE" | null;
}

export interface PublicHostProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;

  phoneNo: string;
  gender: GenderType;
  dateOfBirth: string | null;
  status: UserStatusType;

  totalEarnings: number;
  totalVehicles: number;
  totalBookings: number;
  totalReviews: number;
  averageRating: number;

  profileImageUrl: string | null;
  bankingInfo: any | null;
  vehicles: Vehicle[];

  createdAt: string;
  approvedAt: string | null;
  lastActiveAt: string;
}
