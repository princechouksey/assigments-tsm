import React, { useState } from "react";

const IssueBook = () => {
  const [enrollment, setEnrollment] = useState("");
  const [isbn, setIsbn] = useState("");
  const [issued, setIssued] = useState(false);

  const handleIssue = (e) => {
    e.preventDefault();
    if (enrollment && isbn) {
      setIssued(true);
    }
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="flex items-center justify-center min-h-screen  text-white">
      <div className="bg-white text-black shadow-2xl rounded-2xl p-8 w-[28rem]">
        <h2 className="text-2xl font-bold text-center text-cyan-500 mb-6">
          Issue a Book
        </h2>
        
        <form onSubmit={handleIssue} className="flex flex-col gap-5">
          {/* Enrollment */}
          <div>
            <label className="block text-sm font-medium mb-2">Enrollment No.</label>
            <input
              type="text"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              placeholder="Enter Enrollment No."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-sm font-medium mb-2">Book ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="Enter Book ISBN"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white font-semibold py-2 rounded-lg hover:bg-cyan-600 transition"
          >
            Issue Book
          </button>
        </form>

        {/* Output */}
        {issued && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-black">
            <p><span className="font-semibold">Enrollment:</span> {enrollment}</p>
            <p><span className="font-semibold">ISBN:</span> {isbn}</p>
            <p><span className="font-semibold">Issued On:</span> {currentDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueBook;
