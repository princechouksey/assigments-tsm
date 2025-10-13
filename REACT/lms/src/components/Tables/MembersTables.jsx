import React, { useState } from "react";
import { Edit, Trash2, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MembersTable = ({ searchTerm }) => {
  const navigate = useNavigate();

  // Dummy members data with due date
  const [members, setMembers] = useState([
    { id: "M101", name: "Alice Johnson", contact: "alice@example.com", branch: "CSE", year: "3rd", booksIssued: 2, dueDate: "2025-10-05" },
    { id: "M102", name: "Bob Smith", contact: "bob@example.com", branch: "IT", year: "2nd", booksIssued: 4, dueDate:"2025-12-05" },
    { id: "M103", name: "Charlie Brown", contact: "charlie@example.com", branch: "ECE", year: "1st", booksIssued: 1, dueDate: "2025-10-08" },
  ]);

  const role = "admin";

  const handleDelete = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSendReminder = (member) => {
    alert(`Reminder sent to ${member.name} to return books!`);
  };

  // Check if due date is exceeded
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    return today > due;
  };

  // Filter based on search term
  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-cyan-500 mb-6">Members List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["Enrollment ID", "Name", "Contact", "Branch", "Year", "Books Issued", "Due Date", "Actions"].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => {
                const overdue = isOverdue(member.dueDate);

                return (
                  <tr
                    key={member.id}
                    className={`hover:bg-gray-50 transition cursor-pointer ${overdue ? "bg-red-50" : ""}`}
                    onClick={() => navigate(`/member/${member.id}`)} // Redirect to member details page
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{member.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{member.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{member.branch}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{member.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{member.booksIssued}</td>
                    <td className={`px-6 py-4 whitespace-nowrap font-medium ${overdue ? "text-red-600" : "text-green-600"}`}>
                      {member.dueDate || "-"}
                    </td>
                    {role === "admin" && (
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2" onClick={(e) => e.stopPropagation()}>
                        {/* Stop propagation so clicking these buttons doesn't trigger row click */}
                        <button className="p-2 rounded-lg bg-cyan-100 hover:bg-cyan-200">
                          <Edit size={18} className="text-cyan-600" />
                        </button>
                        <button
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                        {member.booksIssued > 0 && (
                          <button
                            className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200"
                            onClick={() => handleSendReminder(member)}
                          >
                            <Bell size={18} className="text-yellow-600" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersTable;
