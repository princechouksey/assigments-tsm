import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Book Data:", data);
    alert("Book Added Successfully!");
    reset();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-8 bg-white text-black shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-cyan-500">
          Add New Book
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Row 1: Title + Author */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Book Title"
              className="flex-1 border p-4 rounded-lg border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              {...register("title", { required: "Book Title is required" })}
            />
            <input
              type="text"
              placeholder="Author"
              className="flex-1 border p-4 rounded-lg border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              {...register("author", { required: "Author is required" })}
            />
          </div>
          {(errors.title || errors.author) && (
            <p className="text-red-500 text-sm">
              {errors.title?.message || errors.author?.message}
            </p>
          )}

          {/* Row 2: ISBN + Category */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="ISBN Number"
              className="flex-1 border p-4 rounded-lg border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              {...register("isbn", { required: "ISBN Number is required" })}
            />
            <select
              className="flex-1 border p-4 rounded-lg border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-400"
              {...register("category", { required: "Category is required" })}
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="Management">Management</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {errors.isbn || errors.category ? (
            <p className="text-red-500 text-sm">
              {errors.isbn?.message || errors.category?.message}
            </p>
          ) : null}

          {/* Row 3: Year + Copies + Shelf */}
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Publication Year"
              className="flex-1 border p-4 rounded-lg border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              {...register("publicationYear", { required: "Year is required" })}
            />
            <input
              type="number"
              placeholder="Copies"
              className="flex-1 border p-4 rounded-lg border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              {...register("copies", { required: "Number of Copies is required" })}
            />
            <input
              type="text"
              placeholder="Shelf (Optional)"
              className="flex-1 border p-4 rounded-lg border-black focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              {...register("shelf")}
            />
          </div>
          {(errors.publicationYear || errors.copies) && (
            <p className="text-red-500 text-sm">
              {errors.publicationYear?.message || errors.copies?.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-cyan-500 text-black py-3 rounded-lg mt-6 hover:bg-cyan-600 transition font-medium text-lg"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
