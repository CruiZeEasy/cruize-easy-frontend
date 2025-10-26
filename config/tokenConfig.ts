export const tokenConfig = {
  accessTokenExpiryDays: Number(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_DAYS
  ),
  refreshTokenExpiryDays: Number(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_DAYS
  ),
};

// export const tokenConfig = {
//   accessTokenExpiryDays:
//     Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_HOURS) / 24,
//   refreshTokenExpiryDays: Number(
//     process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_DAYS
//   ),
// };
