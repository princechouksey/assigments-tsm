import React, { useEffect, useState } from "react";
import { getAllUsers } from "../API/userService";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const [users, setUsers] = useState([]);
  const navigate= useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);
  const currentUser = localStorage.getItem("user");
  const startPrivateChat = (user) => {
  console.log(user);
  const roomId = [currentUser, user.username].sort().join("_");
  navigate(`/chat/${roomId}` )
};

  return (
    <div className="h-screen w-full bg-gray-900 p-5 flex flex-col gap-4 items-center">
      <h1 className="text-4xl text-center font-bold text-white">Chat List</h1>

      <div className="h-full w-[30vw] rounded-xl p-3 bg-gray-800 overflow-y-auto">
        {users.length === 0 ? (
          <p className="text-center text-gray-400 text-lg mt-5">
            No users available
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="w-full h-[12vh] bg-gray-700 mb-3 flex items-center justify-center rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              onClick={() => startPrivateChat(user)}
            >
              <h1 className="text-white text-2xl font-semibold">
                {user.username}
              </h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
