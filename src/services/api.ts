
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });


if (!res.ok) {
  const error = await res.json();

  console.log("API ERROR:", error); // 👈 ADD THIS

  throw new Error(
    error?.errors?.[0]?.msg || error.message || "API Error"
  );
}

  return res.json();
};