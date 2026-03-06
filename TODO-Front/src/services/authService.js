import api from "./api";

export async function loginUser(formData) {
  const res = await api.post("/login", formData);
  return res.data;
}

export async function registerUser(formData) {
  const res = await api.post("/register", formData);
  return res.data;
}
