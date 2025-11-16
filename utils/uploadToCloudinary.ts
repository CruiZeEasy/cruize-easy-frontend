import { apiClient } from "./apiClient";
import { API_ROUTES } from "./apiRoutes";

interface CloudinarySignature {
  api_key: string;
  cloudName: string;
  expiresInSeconds: number;
  folder: string;
  instructions: string;
  signature: string;
  timestamp: number;
  uploadUrl: string;
}

export async function getUserProfileImageSignature(): Promise<CloudinarySignature> {
  return apiClient(API_ROUTES.CLOUDINARY.PROFILE_IMAGE_SIGNATURE, {
    method: "POST",
  });
}

export async function getDocumentSignature(): Promise<CloudinarySignature> {
  return apiClient(API_ROUTES.CLOUDINARY.DOCUMENT_SIGNATURE, {
    method: "POST",
  });
}

export async function getImageSignature(): Promise<CloudinarySignature> {
  return apiClient(API_ROUTES.CLOUDINARY.IMAGE_SIGNATURE, { method: "POST" });
}

export async function uploadToCloudinary(
  file: File,
  signatureData: CloudinarySignature
) {
  const { timestamp, signature, api_key, folder, uploadUrl } = signatureData;

  console.log(signatureData);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("folder", folder);

  const res = await fetch(uploadUrl, { method: "POST", body: formData });

  if (!res.ok) {
    throw new Error(`Cloudinary upload failed with status ${res.status}`);
  }

  const data = await res.json();

  return {
    url: data.secure_url,
    publicId: data.public_id,
    size: data.bytes,
    uploadedAt: data.created_at,
  };
}
