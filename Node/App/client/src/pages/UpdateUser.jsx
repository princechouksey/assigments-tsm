import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {  updateProfileService } from "../API/userService";

const UpdateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await updateProfileService(data);
      console.log(res.data);
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      console.error(res.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-700"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">
          Update Profile
        </h2>

        {/* Username */}
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be more than 3 letters",
              },
            })}
            className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
              errors.username ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
              errors.email ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
              errors.password ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 py-2 rounded-lg font-semibold text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
