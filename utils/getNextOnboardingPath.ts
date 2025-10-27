import { PATHS } from "@/utils/path";

export function getNextOnboardingPath(user: any): string {
  if (!user) return PATHS.AUTH.LOGIN;

  const { profileCompleted, allowLocation, emailNotificationsEnabled } = user;

  // If user hasn't completed profile, go there first
  if (!profileCompleted) {
    return PATHS.ONBOARDING.COMPLETE_PROFILE;
  }

  // Next: location step
  if (!allowLocation) {
    return PATHS.ONBOARDING.ALLOW_LOCATION;
  }

  // Next: notification step
  if (!emailNotificationsEnabled) {
    return PATHS.ONBOARDING.ALLOW_NOTIFICATIONS;
  }

  // All onboarding done
  return PATHS.HOME;
}
