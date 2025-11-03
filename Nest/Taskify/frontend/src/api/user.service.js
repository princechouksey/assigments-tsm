import axios from "../api/axios";
import toast from "react-hot-toast";

const handleRequest = async (promise, successMessage) => {
  try {
    const res = await promise;
    if (successMessage) toast.success(successMessage);
    console.log(res.data);
    return res.data;
  } catch (err) {
    const message =
      err?.response?.data?.message || "Something went wrong. Please try again.";
    toast.error(message);
    throw err;
  }
};

export const singup = (data) =>
  handleRequest(axios.post("/auth/register", data), "Registration successful!");

export const login = (data) =>
  handleRequest(axios.post("/auth/login", data), "Login successful!");

export const profile = () =>
  handleRequest(axios.get("/user/me"));

export const update = (data) =>
  handleRequest(axios.patch("/user/update", data), "Profile updated successfully!");
