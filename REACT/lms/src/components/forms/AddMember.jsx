import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Student Data:", data);
    alert("Student Registered Successfully!");
    reset();
    navigate("/");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-50">
      <div className=" w-[40vw] p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-500">
          Student Registration
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="border p-4 rounded-xl border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
            {...register("name", { required: "Full Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          {/* Contact & Email in a row */}
          <div className="flex gap-4">
            <input
              type="tel"
              placeholder="Contact Number"
              className="flex-1 border p-4 rounded-xl border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 border p-4 rounded-xl border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
          </div>
          {(errors.contact || errors.email) && (
            <p className="text-red-500 text-sm">
              {errors.contact?.message || errors.email?.message}
            </p>
          )}

          {/* Enrollment & Branch */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enrollment Number"
              className="flex-1 border p-4 rounded-xl border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              {...register("enrollment", { required: "Enrollment Number is required" })}
            />
            <select
              className="flex-1 border p-4 rounded-xl border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-400"
              {...register("branch", { required: "Branch is required" })}
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="ME">ME</option>
              <option value="CE">CE</option>
            </select>
          </div>
          {(errors.enrollment || errors.branch) && (
            <p className="text-red-500 text-sm">
              {errors.enrollment?.message || errors.branch?.message}
            </p>
          )}

          {/* Year */}
          <select
            className="border p-4 rounded-xl border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-400"
            {...register("year", { required: "Year is required" })}
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-cyan-600 text-white py-3 rounded-xl mt-6 hover:bg-cyan-700 transition font-medium text-lg"
          >
            Register Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
