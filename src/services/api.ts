import axios from "axios";
import { useAuthStore } from "../store/auth.store";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = useAuthStore.getState().token;


  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.log("API ERROR:", error);
    throw new Error(
      error?.errors?.[0]?.msg || error.message || "API Error"
    );
  }

  return res.json();
};




export const api = axios.create({
  baseURL: API_BASE,
  // withCredentials:true,
  headers: { "Content-type": "application/json" }
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const err = error.response?.data;

//     console.log("API ERROR:", err);

//     const message =
//       err?.errors?.[0]?.msg || err?.message || "API Error";

//     return Promise.reject(new Error(message));
//   }
// );