import axios from "../api/axios";
import toast from "react-hot-toast";

// 🧾 Signup
export const signup = async (data) => {
  try {
    const res = await axios.post("/auth/register", data);
    toast.success("Registration successful!");
    // backend wraps responses as { success, timestamp, data }
    return res.data?.data;
  } catch (err) {
    const message =
      err?.response?.data?.message || "Something went wrong. Please try again.";
    toast.error(message);
    throw err;
  }
};

// 🔑 Login
export const login = async (data) => {
  try {
    const res = await axios.post("/auth/login", data);
    const payload = res.data?.data;
    const token = payload?.token;
    if (token) localStorage.setItem("token", token);
    toast.success("Login successful!");
    return payload;

  } catch (err) {
    const message =
      err?.response?.data?.message || "Invalid credentials or server error.";
    toast.error(message);
    throw err;
  }
};

// 👤 Get User Profile
export const profile = async () => {
  try {
    const res = await axios.get("/user/me");
    return res.data?.data;

  } catch (err) {
    const message =
      err?.response?.data?.message || "Failed to fetch user profile.";
    toast.error(message);
    throw err;
  }
};

// 🛠️ Update User Profile
export const update = async (data) => {
  try {
    const res = await axios.patch("/user/update", data);
    toast.success("Profile updated successfully!");
    return res.data?.data;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      "Failed to update profile. Please try again.";
    toast.error(message);
    throw err;
  }
};
