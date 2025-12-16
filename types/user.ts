import { GenderType, UserRoles, UserStatusType } from "@/constants/enums";

export interface KYC {
  id: string;
  userId: string;
  driverLicenseNumber: string;
  driverLicenseExpiry: string;
  driverLicenseImageUrl: string;
  driverLicensePublicId: string;
  driverLicenseVerified: boolean;
  identityType: string;
  identityNumber: string;
  identityImageUrl: string;
  identityPublicId: string;
  identityVerified: boolean;
  verifiedAt: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;

  roles: UserRoles[];

  phoneNo: string;
  dateOfBirth: string | null;
  gender: GenderType;
  profileImageUrl: string | null;

  profileCompleted: boolean;
  allowLocation: boolean;
  emailNotificationsEnabled: boolean;

  createdAt: string;
  updatedAt: string | null;

  hasWallet: boolean;
  walletBalance: number | null;
  walletNumber: string | null;
  walletStatus: "ACTIVE" | null;
}

export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  email: string;
  phoneNo: string;
  gender: GenderType;
  dateOfBirth: string | null;
  profileImageUrl: string;

  kyc: KYC | null;

  status: UserStatusType;

  favoriteVehicleIds: string[] | null;
  preferredLocations: string[] | null;

  totalRentals: number;
  averageRating: number;
  totalReviews: number;
  totalSpent: number;

  backgroundCheckCompleted: boolean;
  backgroundCheckDate: string | null;

  violationCount: number;
  isBanned: boolean;
  banReason: string | null;

  hasWallet: boolean;
  walletBalance: number | null;
  walletNumber: string | null;
  walletStatus: "ACTIVE" | null;

  createdAt: string;
  updatedAt: string | null;
}

export interface UpdateUserProfilePayload {
  fullName?: string;
  username?: string;
  phoneN0?: string;
  gender?: GenderType;
  profileCompleted?: boolean;
  profileImageUrl?: string;
  allowLocation?: boolean;
  emailNotificationsEnabled?: boolean;
}
