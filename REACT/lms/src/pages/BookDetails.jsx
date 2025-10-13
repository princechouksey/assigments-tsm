// pages/BookDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit, Trash2, BookOpen } from "lucide-react";

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  // Dummy data
  useEffect(() => {
    const dummyBook = {
      bookId: "B101",
      title: "React Basics",
      authors: ["Alice Johnson"],
      isbn: "978-3-16-148410-0",
      edition: "1st",
      totalCopies: 5,
      availableCopies: 3,
      issuedBooks: 2,
      cover: "", // default icon
    };
    setBook(dummyBook);
  }, [bookId]);

  const handleDelete = () => {
    alert(`Book "${book.title}" deleted!`);
    navigate("/books");
  };

  if (!book) return <div className="p-6 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-50 to-cyan-100 p-8 flex justify-center items-start">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl p-8 space-y-8">
        {/* Top Row: Cover + Details + Actions */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          
          {/* Left: Cover & Title */}
          <div className="flex items-center gap-6 flex-1">
            <div className="w-36 h-48 bg-gray-100 flex items-center justify-center rounded-xl shadow-md overflow-hidden">
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <BookOpen size={56} className="text-gray-300" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-bold text-cyan-800">{book.title}</h2>
              <p className="text-gray-600 text-lg">{book.authors.join(", ")}</p>
              <p className="text-gray-500 text-sm">
                ISBN: <span className="font-medium text-gray-700">{book.isbn}</span>
              </p>
            </div>
          </div>

          {/* Middle: Book Info */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-cyan-50 p-6 rounded-2xl shadow-inner border border-cyan-100">
            <InfoCard label="Book ID" value={book.bookId} />
            <InfoCard label="Edition" value={book.edition} />
            <InfoCard label="Total Copies" value={book.totalCopies} />
            <InfoCard label="Available" value={book.availableCopies} color="green" />
            <InfoCard label="Issued" value={book.issuedBooks} color="red" />
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col gap-4 items-end">
            <button
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-cyan-100 hover:bg-cyan-200 text-cyan-800 font-semibold shadow-md transition-all duration-200"
              onClick={() => alert("Edit functionality here")}
            >
              <Edit size={18} /> Edit
            </button>
            <button
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-semibold shadow-md transition-all duration-200"
              onClick={handleDelete}
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>

        {/* Optional: Issued History or description */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Book Description</h3>
          <p className="text-gray-600 leading-relaxed">
            This book covers the fundamental concepts of React.js, including components, hooks, state management, and routing. Perfect for beginners who want to get started with modern frontend development.
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper component for Info Cards
const InfoCard = ({ label, value, color }) => {
  const textColor =
    color === "green"
      ? "text-green-600"
      : color === "red"
      ? "text-red-600"
      : "text-gray-800";
  return (
    <div className="flex flex-col gap-1">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className={`font-semibold ${textColor}`}>{value}</span>
    </div>
  );
};

export default BookDetails;
