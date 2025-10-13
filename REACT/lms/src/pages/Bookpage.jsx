import React, { useState } from "react";
import { Search, Filter, PlusCircle, BookOpen, Edit, Trash2, User } from "lucide-react";
import BookTable from "../components/Tables/BookTable";
import { useNavigate } from "react-router-dom";

const BookPage = () => {
  // Dummy role: change to "student" to test student view
  const role = "admin";
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-cyan-500">📚 Book Management</h1>

        {/* Admin Quick Actions */}
         
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-cyan-600"
            onClick={ ()=>navigate("/add-book")}>
              <PlusCircle size={20} /> Add Book
            </button>
            <button className="flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-cyan-600"
            onClick={()=>navigate("/issue-book")}>
              <BookOpen size={20} /> Issue Book

            </button>
          </div>
        
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center w-full border border-gray-300 rounded-xl px-3 py-2">
          <Search className="text-cyan-500 mr-2" />
          <input
            type="text"
            placeholder="Search by title, author, ISBN..."
            className="flex-1 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100">
          <Filter size={18} /> Filter
        </button>
      </div>
     
    <BookTable />
    </div>
  );
};

export default BookPage;


