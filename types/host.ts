import { GenderType, UserRoles, UserStatusType } from "@/constants/enums";
import { Vehicle } from "./vehicle";

export interface Host {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  email: string;
  phoneNo: string;
  gender: GenderType;
  dateOfBirth: string | null;
  profileImageUrl: string;

  isKyc: boolean | null;

  roles: UserRoles[];
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
