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
}
