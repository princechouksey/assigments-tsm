// src/pages/Register.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { singup } from "../api/user.service";
import { Link } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await singup(data);
      alert(res.data.message || "Registration successful!");
      reset();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        {/* Name */}
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-white font-semibold transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Already Registered */}
        <p className="text-center text-sm text-gray-400 mt-3">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
