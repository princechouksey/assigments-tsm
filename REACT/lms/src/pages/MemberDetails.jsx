import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bell, ArrowLeft } from "lucide-react";

// Dummy data
const dummyMemberData = {
  enrollmentId: "M101",
  name: "Alice Johnson",
  contact: "alice@example.com",
  branch: "CSE",
  year: "3rd",
  booksIssued: [ 
    {
      bookId: "B101",
      title: "React Basics",
      issueDate: "2025-09-20",
      dueDate: "2025-10-05",
      returned: false,
      returnDate: null,
      fine: 0,
    },
    {
      bookId: "B102",
      title: "Node.js in Depth",
      issueDate: "2025-09-25",
      dueDate: "2025-10-12",
      returned: true,
      returnDate: "2025-10-10",
      fine: 0,
    },
  ],
};

const MemberDetails = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);

  useEffect(() => {
    // Replace with API fetch in real app
    setMember(dummyMemberData);
  }, [memberId]);

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    return today > due;
  };

  const handleSendReminder = (book) => {
    alert(`Reminder sent for book "${book.title}" due on ${new Date(book.dueDate).toLocaleDateString()}`);
  };

  if (!member) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-4xl font-extrabold text-cyan-600">{member.name}</h1>
        <button
          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* Member Info Card */}
     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
  {/* Profile Card */}
  <div className="bg-white shadow-xl rounded-3xl p-6 flex flex-col items-center gap-4 border border-gray-100  transition-all duration-300">
    <div className="w-20 h-20 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-3xl font-bold">
      {member.name.split(" ").map(n => n[0]).join("")} {/* Initials */}
    </div>
    <h2 className="text-xl sm:text-2xl font-bold text-cyan-700">{member.name}</h2>
    <p className="text-gray-500 text-center">{member.contact}</p>
    <div className="flex gap-3 flex-wrap justify-center mt-2">
      <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-xl font-medium border border-cyan-100">Branch: {member.branch}</span>
      <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-xl font-medium border border-cyan-100">Year: {member.year}</span>
    </div>
  </div>

  {/* Total Books Card */}
  <div className="bg-white shadow-xl rounded-3xl p-6 flex flex-col items-center justify-center gap-10 border border-gray-100  transition-all duration-300">
    <h2 className="text-3xl font-medium text-gray-500">Total Books Issued</h2>
    <span className="text-5xl font-bold text-cyan-600">{member.booksIssued.length}</span>
  </div>

  {/* Due Books Card */}
  <div className="bg-white shadow-xl rounded-3xl p-6 flex flex-col items-center justify-center gap-10 border border-gray-100  transition-all duration-300">
    <h2 className="text-3xl font-medium text-gray-500">Due / Overdue Books</h2>
    <span className="text-5xl font-bold text-red-600">
      {member.booksIssued.filter(b => !b.returned && new Date(b.dueDate) < new Date()).length}
    </span>
  </div>
</div>


      {/* Books Issued Table */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Books Issued</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Book ID", "Title", "Issue Date", "Due Date", "Returned", "Return Date", "Fine", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {member.booksIssued.map((book) => (
                <tr key={book.bookId} className={`hover:bg-gray-50 transition ${isOverdue(book.dueDate) && !book.returned ? "bg-red-50" : ""}`}>
                  <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-700">{book.bookId}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-800">{book.title}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-600">{new Date(book.issueDate).toLocaleDateString()}</td>
                  <td className={`px-4 py-2 whitespace-nowrap font-semibold ${
                    isOverdue(book.dueDate) && !book.returned ? "text-red-600" : "text-green-600"
                  }`}>
                    {new Date(book.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{book.returned ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{book.returnDate ? new Date(book.returnDate).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{book.fine}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {!book.returned && (
                      <button
                        className="flex items-center justify-center p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition"
                        onClick={() => handleSendReminder(book)}
                      >
                        <Bell size={18} className="text-yellow-600" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
