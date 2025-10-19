import { PATHS } from "./path";

export const goToSignup = (role: "user" | "host") => {
  return `${PATHS.AUTH.SIGNUP}?role=${role}`;
};
