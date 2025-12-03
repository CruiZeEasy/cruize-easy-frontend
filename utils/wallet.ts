export function generateIdempotencyKey(): string {
  const timestamp = new Date().toISOString().slice(0, 16).replace(/[-T:]/g, ""); // YYYYMMDDHHmm
  const randomStr = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 36)
      .toString(36)
      .toUpperCase()
  ).join("");
  return `FD${timestamp}${randomStr}`;
}
