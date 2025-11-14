import Cookies from "js-cookie";
import { API_BASE_URL } from "./api";
import { API_ROUTES } from "./apiRoutes";
import { tokenConfig } from "@/config/tokenConfig";
import { PATHS } from "./path";

export interface FetchOptions extends RequestInit {
  timeout?: number;
}

export class APIError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

export async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
) {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new APIError(
        data?.message || `Request failed with status ${response.status}`,
        response.status
      );
    }

    return data;
  } catch (err: any) {
    if (err.name === "AbortError")
      throw new APIError("Request timed out. Please try again.");
    throw err;
  } finally {
    clearTimeout(id);
  }
}

// export async function apiClient(
//   endpoint: string,
//   options: FetchOptions & { skipAuthHandling?: boolean } = {}
// ) {
//   let token = Cookies.get("access_token");

//   const isFormData = options.body instanceof FormData;

//   async function handleUnauthorized() {
//     console.log("Unauthorized. Removing tokens and redirecting...");
//     Cookies.remove("access_token");
//     Cookies.remove("refresh_token");

//     if (typeof window !== "undefined") {
//       setTimeout(() => {
//         window.location.replace(PATHS.AUTH.LOGIN);
//       }, 1500);
//     }
//   }

//   try {
//     return await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
//       ...options,
//       headers: {
//         ...(isFormData ? {} : { "Content-Type": "application/json" }),
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         ...options.headers,
//       },
//     });
//   } catch (err: any) {
//     if (
//       !options.skipAuthHandling &&
//       err instanceof APIError &&
//       err.status === 401
//     ) {
//       const refreshToken = Cookies.get("refresh_token");
//       if (refreshToken) {
//         try {
//           const refreshRes = await fetchWithTimeout(
//             `${API_BASE_URL}${API_ROUTES.AUTH.REFRESH_TOKEN}`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ refreshToken }),
//             }
//           );

//           if (refreshRes?.accessToken) {
//             // Save new tokens
//             Cookies.set("access_token", refreshRes.accessToken, {
//               expires: tokenConfig.accessTokenExpiryDays,
//               secure: true,
//               sameSite: "Strict",
//               path: "/",
//             });
//             Cookies.set("refresh_token", refreshRes.refreshToken, {
//               expires: tokenConfig.refreshTokenExpiryDays,
//               secure: true,
//               sameSite: "Strict",
//               path: "/",
//             });
//             token = refreshRes.accessToken;

//             // Retry original request
//             return await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
//               ...options,
//               headers: {
//                 ...(isFormData ? {} : { "Content-Type": "application/json" }),
//                 Authorization: `Bearer ${token}`,
//                 ...options.headers,
//               },
//             });
//           }
//         } catch {
//           // failed refresh — fall through to unauthorized handler
//         }
//       }

//       // Any 401 that reaches here — remove cookies and redirect
//       await handleUnauthorized();
//       throw new APIError("Session expired. Please log in again.", 401);
//     }

//     throw err;
//   }
// }

export async function apiClient(
  endpoint: string,
  options: FetchOptions & { skipAuthHandling?: boolean } = {}
) {
  let token = Cookies.get("access_token");

  const isOriginalFormData = options.body instanceof FormData;

  // ---------------------------------------------------------
  // Clone FormData if needed (so retry works)
  // ---------------------------------------------------------
  let clonedBody: any = options.body;
  if (isOriginalFormData) {
    clonedBody = new FormData();
    (options.body as FormData).forEach((value, key) => {
      clonedBody.append(key, value);
    });
  }
  // ---------------------------------------------------------

  async function handleUnauthorized() {
    console.log("Unauthorized. Removing tokens and redirecting...");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.location.replace(PATHS.AUTH.LOGIN);
      }, 1500);
    }
  }

  try {
    return await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
      ...options,
      // ---------------------------------------------------------
      // Always use clonedBody
      // ---------------------------------------------------------
      body: clonedBody,
      headers: {
        ...(isOriginalFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch (err: any) {
    if (
      !options.skipAuthHandling &&
      err instanceof APIError &&
      err.status === 401
    ) {
      const refreshToken = Cookies.get("refresh_token");
      if (refreshToken) {
        try {
          const refreshRes = await fetchWithTimeout(
            `${API_BASE_URL}${API_ROUTES.AUTH.REFRESH_TOKEN}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            }
          );

          if (refreshRes?.accessToken) {
            Cookies.set("access_token", refreshRes.accessToken, {
              expires: tokenConfig.accessTokenExpiryDays,
              secure: true,
              sameSite: "Strict",
              path: "/",
            });
            Cookies.set("refresh_token", refreshRes.refreshToken, {
              expires: tokenConfig.refreshTokenExpiryDays,
              secure: true,
              sameSite: "Strict",
              path: "/",
            });
            token = refreshRes.accessToken;

            // ---------------------------------------------------------
            // Retry ALSO uses clonedBody + FormData header logic
            // ---------------------------------------------------------
            return await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
              ...options,
              body: clonedBody,
              headers: {
                ...(isOriginalFormData
                  ? {}
                  : { "Content-Type": "application/json" }),
                Authorization: `Bearer ${token}`,
                ...options.headers,
              },
            });
          }
        } catch {
          // refresh failed
        }
      }

      await handleUnauthorized();
      throw new APIError("Session expired. Please log in again.", 401);
    }

    throw err;
  }
}
