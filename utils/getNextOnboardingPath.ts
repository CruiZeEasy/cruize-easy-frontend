
import { UserRoles } from "@/constants/enums";
import { PATHS } from "@/utils/path";

export function getNextOnboardingPath(user: any): string {
  if (!user) return PATHS.AUTH.LOGIN;

  const { profileCompleted, allowLocation, emailNotificationsEnabled, roles } =
    user;

  // Onboarding steps
  if (!profileCompleted) return PATHS.ONBOARDING.COMPLETE_PROFILE;
  if (!allowLocation) return PATHS.ONBOARDING.ALLOW_LOCATION;
  if (!emailNotificationsEnabled) return PATHS.ONBOARDING.ALLOW_NOTIFICATIONS;

  // All onboarding done → redirect based on role
  const primaryRole = roles?.[0];

  switch (primaryRole) {
    case UserRoles.USER:
      return PATHS.USER.HOME; // /dashboard
    case UserRoles.HOST:
      return PATHS.HOST.HOME; // /host
    case UserRoles.ADMIN:
      return PATHS.ADMIN.HOME; // /admin
    default:
      return PATHS.HOME; // fallback
  }
}
