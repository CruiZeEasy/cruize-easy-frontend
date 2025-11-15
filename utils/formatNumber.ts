export function formatNumber(value: string) {
  if (!value) return "";

  let cleaned = value.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  const integerPart = parts[0];
  const decimalPart = parts.slice(1).join("");
  const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (cleaned.includes(".")) {
    return decimalPart ? `${formattedInt}.${decimalPart}` : `${formattedInt}.`;
  }

  return formattedInt;
}
