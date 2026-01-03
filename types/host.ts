// export interface Host {
//   totalEarnings: number;
//   totalVehicles: number;
//   totalBookings: number;
//   totalReviews: number;
//   averageRating: number;
//   walletStatus: "ACTIVE" | null;
// }

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
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string | null;
  status: "PENDING" | "ACTIVE" | "SUSPENDED";
  totalEarnings: number;
  totalVehicles: number;
  totalBookings: number;
  totalReviews: number;
  averageRating: number;
  profileImageUrl: string | null;
  bankingInfo: any | null;
  vehicles: any[] | null;
  createdAt: string;
  approvedAt: string | null;
  lastActiveAt: string;
}
