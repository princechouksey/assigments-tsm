import React, { useState, useEffect } from "react";

const FormInput = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [users, setUsers] = useState([]);

  // Load users from localStorage when component mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const newUser = { name, email, phone };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Save entire list to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Clear fields after submit
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">
          User Registration
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-600">Name</label>
          <input
            className="w-full h-10 border rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-600">Email</label>
          <input
            className="w-full h-10 border rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-600">Phone</label>
          <input
            className="w-full h-10 border rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="tel"
            value={phone}
            placeholder="Enter your phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      {/* Submitted users list */}
      <div className="mt-8 bg-white shadow-md rounded-xl p-4 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Submitted Users
        </h2>
        {users.length === 0 ? (
          <p className="text-gray-500">No users yet.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((u, index) => (
              <li
                key={index}
                className="border-b last:border-b-0 pb-2 text-gray-700"
              >
                <span className="font-medium">{u.name}</span> <br />
                <span className="text-sm">{u.email}</span> <br />
                <span className="text-sm">{u.phone}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormInput;
