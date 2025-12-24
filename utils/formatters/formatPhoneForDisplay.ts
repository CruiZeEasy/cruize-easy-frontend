export const formatPhoneForDisplay = (phone: string) => {
  if (!phone) return "";

  let local = phone.startsWith("+234") ? phone.slice(4) : phone;

  if (!local.startsWith("0")) local = "0" + local;

  const firstFour = local.slice(0, 4);
  return `${firstFour} *** ****`;
};
