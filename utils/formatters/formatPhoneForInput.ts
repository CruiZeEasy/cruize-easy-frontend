export const formatPhoneForInput = (phone: string) => {
  if (!phone) return "";

  // Remove +234 if present
  let local = phone.startsWith("+234") ? phone.slice(4) : phone;

  // Remove leading 0 if present (because +234 already implies it)
  if (local.startsWith("0")) local = local.slice(1);

  // Format as user would type: 0906 651 2151 → input only gets the "906 651 2151" part
  let formatted = local;
  if (local.length > 7) {
    formatted = local.replace(/(\d{3})(\d{3})(\d{0,4})/, "$1 $2 $3");
  } else if (local.length > 3) {
    formatted = local.replace(/(\d{3})(\d{0,3})/, "$1 $2");
  }

  return formatted.trim();
};
