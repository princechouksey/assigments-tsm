// src/pages/Register.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "../api/user.service";
import { Link, useNavigate } from "react-router-dom";
import { getAllTasks } from "../api/task.service";
import toast from "react-hot-toast";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await login(data);
      reset();
      // fetch existing tasks immediately after login so dashboard shows them
      try {
        const tasks = await getAllTasks();
        navigate('/', { state: { tasks } });
      } catch (e) {
        // fallback: navigate anyway and dashboard will fetch
        toast.error('Could not load tasks right away. Loading on dashboard...');
        navigate('/');
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex justify-center items-center min-h-screen bg-indigo-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 text-black"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600">TASKIFY</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

       
       

        {/* Email */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1 text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg text-white font-semibold transition disabled:opacity-60"
        >
          {loading ? "Logging In ..." : "Login"}
        </button>

        {/* Already Registered */}
        <p className="text-center text-sm text-gray-500 mt-3">
          Dont have an account? {" "}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
