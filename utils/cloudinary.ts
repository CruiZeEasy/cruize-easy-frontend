// const CLOUD_NAME = "ds3on5hx3";

// type CloudinaryQuality = "best" | "good" | "eco" | "low";

// export const getOptimizedImage = (
//   urlOrPublicId: string,
//   quality: CloudinaryQuality = "good"
// ): string => {
//   // Handle full URLs
//   if (urlOrPublicId.startsWith("http")) {
//     // Skip if not Cloudinary
//     if (!urlOrPublicId.includes("cloudinary.com")) return urlOrPublicId;

//     // Skip if already optimized
//     if (urlOrPublicId.includes("q_auto")) return urlOrPublicId;

//     // Extract publicId
//     const match = urlOrPublicId.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
//     if (!match) return urlOrPublicId;

//     const publicId = match[1];
//     return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto:${quality},f_auto/${publicId}`;
//   }

//   return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto:${quality},f_auto/${urlOrPublicId}`;
// };

const CLOUD_NAME = "ds3on5hx3";

type CloudinaryQualityLevel = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

export const getOptimizedImage = (
  urlOrPublicId: string,
  quality: CloudinaryQualityLevel = 80 // default to 80
): string => {
  // Helper to build Cloudinary URL
  const buildUrl = (publicId: string) =>
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_${quality}/${publicId}`;

  // If it's already a full URL
  if (urlOrPublicId.startsWith("http")) {
    // Skip if not a Cloudinary URL
    if (!urlOrPublicId.includes("cloudinary.com")) return urlOrPublicId;

    // Skip if already has a quality param
    if (/q_\d+/.test(urlOrPublicId)) return urlOrPublicId;

    // Extract publicId from URL
    const match = urlOrPublicId.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
    if (!match) return urlOrPublicId;

    const publicId = match[1];
    return buildUrl(publicId);
  }

  // If it's just a publicId
  return buildUrl(urlOrPublicId);
};
