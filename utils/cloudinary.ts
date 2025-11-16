const CLOUD_NAME = "ds3on5hx3";

type CloudinaryQuality = "best" | "good" | "eco" | "low";

export const getOptimizedImage = (
  urlOrPublicId: string,
  quality: CloudinaryQuality = "good"
): string => {
  // Handle full URLs
  if (urlOrPublicId.startsWith("http")) {
    // Skip if not Cloudinary
    if (!urlOrPublicId.includes("cloudinary.com")) return urlOrPublicId;

    // Skip if already optimized
    if (urlOrPublicId.includes("q_auto")) return urlOrPublicId;

    // Extract publicId
    const match = urlOrPublicId.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
    if (!match) return urlOrPublicId;

    const publicId = match[1];
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto:${quality},f_auto/${publicId}`;
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto:${quality},f_auto/${urlOrPublicId}`;
};
