import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

const BookTable = () => {
  const navigate = useNavigate();

  // Dummy books data
  const [books, setBooks] = useState([
    {
      id: "B101",
      title: "React Basics",
      authors: "Dan Abramov",
      category: "CSE",
      totalCopies: 10,
      remainingCopies: 6,
    },
    {
      id: "B102",
      title: "Node.js in Depth",
      authors: "Ryan Dahl",
      category: "CSE",
      totalCopies: 5,
      remainingCopies: 0,
    },
    {
      id: "B103",
      title: "Data Structures in Java",
      authors: "Robert Lafore",
      category: "CSE",
      totalCopies: 7,
      remainingCopies: 2,
    },
  ]);

  const role = "admin"; // For demo purpose

  const handleRowClick = (bookId) => {
    navigate(`/books/${bookId}`); // Redirect to BookDetails page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-cyan-500 mb-6">📚 Book List</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISBN / Book ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author(s)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category / Branch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total / Remaining
                </th>
                {role === "admin" && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book) => {
                const availability =
                  book.remainingCopies === 0
                    ? "Issued"
                    : book.remainingCopies < book.totalCopies
                    ? "Reserved"
                    : "Available";

                return (
                  <tr
                    key={book.id}
                    className="hover:bg-cyan-50 cursor-pointer"
                    onClick={() => handleRowClick(book.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{book.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{book.authors}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{book.category}</td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap font-medium ${
                        availability === "Available"
                          ? "text-green-600"
                          : availability === "Reserved"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {availability}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {book.totalCopies} / {book.remainingCopies}
                    </td>
                    {role === "admin" && (
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click
                            alert("Edit functionality here");
                          }}
                          className="p-2 rounded-lg bg-cyan-100 hover:bg-cyan-200"
                        >
                          <Edit size={18} className="text-cyan-600" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click
                            alert("Delete functionality here");
                          }}
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
