async function uploadToCloudinary(file: File) {
  // Request signed parameters from backend
  const res = await fetch("/api/cloudinary/signature", { method: "POST" });
  const { timestamp, signature, apiKey, cloudName, folder } = await res.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    { method: "POST", body: formData }
  );

  const data = await uploadRes.json();
  return data.secure_url;
}
