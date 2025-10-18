import Cookies from "js-cookie";
import { API_BASE_URL } from "./api";

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const token = Cookies.get("access_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    // Optionally handle 401 globally
    // if (res.status === 401) {
    //   Cookies.remove("access_token");
    //   window.location.href = "/auth/login";
    // }
  }

  return res.json();
}
