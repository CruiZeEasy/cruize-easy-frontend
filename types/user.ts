import { GenderType, UserRoles } from "@/constants/enums";

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  roles: UserRoles[];
  phoneNo?: string;
  dateOfBirth?: string;
  gender?: GenderType;
  profileImageUrl?: string;
  profileCompleted?: boolean;
  allowLocation?: boolean;
  emailNotificationsEnabled?: boolean;

  walletStatus: "ACTIVE" | null;
  walletBalance: number;
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
