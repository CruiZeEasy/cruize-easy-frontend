// import Cookies from "js-cookie";
// import { API_BASE_URL } from "./api";
// import { API_ROUTES } from "./apiRoutes";

// export async function apiClient(endpoint: string, options: RequestInit = {}) {
//   const token = Cookies.get("access_token");

//   const headers = {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...options.headers,
//   };

//   const res = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...options,
//     headers,
//   });

//   if (!res.ok) {
//     // Optionally handle 401 globally
//     // if (res.status === 401) {
//     //   Cookies.remove("access_token");
//     //   window.location.href = "/auth/login";
//     // }
//   }

//   return res.json();
// }

// export async function apiClient(
//   endpoint: string,
//   options: RequestInit = {}
// ) {
//   let token = Cookies.get("access_token");
//   let res = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...options.headers,
//     },
//   });

//   if (res.status === 401) {
//     // Try refreshing token
//     const refreshToken = Cookies.get("refresh_token");
//     if (refreshToken) {
//       const refreshRes = await fetch(
//         `${API_BASE_URL}${API_ROUTES.AUTH.REFRESH_TOKEN}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ refreshToken }),
//         }
//       );

//       const refreshData = await refreshRes.json();
//       if (refreshRes.ok && refreshData.accessToken) {
//         Cookies.set("access_token", refreshData.accessToken, { secure: true });
//         Cookies.set("refresh_token", refreshData.refreshToken, {
//           secure: true,
//         });
//         token = refreshData.accessToken;

//         // Retry original request
//         res = await fetch(`${API_BASE_URL}${endpoint}`, {
//           ...options,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//             ...options.headers,
//           },
//         });
//       } else {
//         // Refresh failed → force logout
//         Cookies.remove("access_token");
//         Cookies.remove("refresh_token");
//         window.location.href = "/auth/login";
//         return;
//       }
//     }
//   }

//   return res.json();
// }

import Cookies from "js-cookie";
import { API_BASE_URL } from "./api";
import { API_ROUTES } from "./apiRoutes";

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  let token = Cookies.get("access_token");

  let res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  let data = await res.json();

  // Treat backend generic error as "access token expired" for now
  if (
    !res.ok ||
    (data.success === false && data.message.includes("unexpected error"))
  ) {
    const refreshToken = Cookies.get("refresh_token");
    if (refreshToken) {
      // Attempt refresh
      const refreshRes = await fetch(
        `${API_BASE_URL}${API_ROUTES.AUTH.REFRESH_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      const refreshData = await refreshRes.json();

      if (refreshRes.ok && refreshData.accessToken) {
        // Save new tokens
        Cookies.set("access_token", refreshData.accessToken, { secure: true });
        Cookies.set("refresh_token", refreshData.refreshToken, {
          secure: true,
        });
        token = refreshData.accessToken;

        // Retry original request
        res = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
          },
        });

        return res.json();
      } else {
        // Refresh failed → force logout
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.href = "/auth/login";
        return;
      }
    } else {
      // No refresh token → force logout
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.href = "/auth/login";
      return;
    }
  }

  return data;
}
