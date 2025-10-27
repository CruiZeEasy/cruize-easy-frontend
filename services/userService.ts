import { API_BASE_URL } from "@/utils/api";
import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";
import Cookies from "js-cookie";

export async function getCurrentUser() {
  return apiClient(API_ROUTES.USER.ME, {
    method: "GET",
  });
}

export async function updateUserProfile(data: {
  fullName?: string;
  username?: string;
  phoneNo?: string;
  gender?: "MALE" | "FEMALE";
  profileCompleted?: boolean;
  allowLocation?: boolean;
  emailNotificationsEnabled?: boolean;
}) {
  return apiClient(API_ROUTES.USER.ME, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// export async function uploadProfileImage(file: File) {
//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const res = await fetch(
//       `${API_BASE_URL}${API_ROUTES.USER.UPLOAD_PROFILE_IMAGE}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${Cookies.get("access_token") || ""}`,
//         },
//         body: formData,
//       }
//     );

//     const data = await res.json().catch(() => null);

//     if (!res.ok) {
//       switch (res.status) {
//         case 400:
//           throw new Error(
//             data?.message || "Invalid file. Max 5MB and supported formats only."
//           );
//         case 401:
//           Cookies.remove("access_token");
//           Cookies.remove("refresh_token");
//           if (typeof window !== "undefined") {
//             setTimeout(() => {
//               window.location.replace("/auth/login");
//             }, 1500); // show toast first
//           }
//           throw new Error(
//             data?.message || "Session expired. Please log in again."
//           );
//         case 404:
//           throw new Error("User not found.");
//         case 500:
//           throw new Error(
//             data?.message || "Server error. Please try again later."
//           );
//         default:
//           throw new Error(
//             data?.message || `Failed to upload image (status ${res.status})`
//           );
//       }
//     }

//     return data;
//   } catch (err: any) {
//     if (err.name === "AbortError") {
//       throw new Error("Request timed out. Please try again.");
//     }
//     throw err;
//   }
// }

export async function uploadProfileImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient(API_ROUTES.USER.UPLOAD_PROFILE_IMAGE, {
    method: "POST",
    body: formData,
  });
}
