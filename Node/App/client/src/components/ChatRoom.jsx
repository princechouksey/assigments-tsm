import { useEffect, useState, useRef, useCallback } from "react";
import socket from "../socket";
import axios from "../API/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

export default function ChatRoom() {
  const navigate = useNavigate()
  const { roomId } = useParams() 
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [typingUser, setTypingUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);
 
useEffect(() => {
  const user = localStorage.getItem("user");
  setCurrentUser(user)  
}
, [])


const startVideoChat = ()=>{
  navigate(`/video-chat/${roomId}`)
}
const friend  =currentUser === roomId.split("_")[1] ? roomId.split("_")[0]:roomId.split("_")[1];
console.log(friend);
 



  
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNewMessage = useCallback(
    (message) => setMessages((prev) => [...prev, message]),
    []
  );

  const handleTyping = useCallback(
    ({ username, isTyping }) => setTypingUser(isTyping ? username : null),
    []
  );

  const handleRoomHistory = useCallback((history) => setMessages(history), []);

  // Socket setup
  useEffect(() => {
    if (!currentUser) return;

    socket.emit("join_room", { room: roomId, username: currentUser });

    socket.on("new_message", handleNewMessage);
    socket.on("typing", handleTyping);
    socket.on("room_history", handleRoomHistory);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.off("room_history", handleRoomHistory);
      socket.emit("leave_room", { room: roomId, username: currentUser });
    };
  }, [roomId, currentUser, handleNewMessage, handleTyping, handleRoomHistory]);

  const sendMessage = () => {
    if (!content.trim() || !currentUser) return;

    socket.emit("send_message", { room: roomId, content });
    setContent("");
  };

  const handleTypingInput = (e) => {
    setContent(e.target.value);
    if (!currentUser) return;

    socket.emit("typing", {
      room: roomId,
      isTyping: true,
      username: currentUser,
    });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", {
        room: roomId,
        isTyping: false,
        username: currentUser,
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden h-[100vh]">
      {/* Header */}
      <div className="bg-gray-800 px-5 py-3 text-lg font-semibold border-b border-gray-700 flex items-center justify-between">
         <span className="text-blue-400">{friend}</span>
         <h2 className="px-3 py-1 bg-white text-gray-900 rounded-4xl cursor-pointer"
         onClick={()=>startVideoChat()}
         >Video chat</h2>
      </div>

      {/* Messages */}
      <div className=" msg flex-1 overflow-y-auto px-5 py-4 space-y-3 scrollbar-none">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-5">No messages yet</p>
        )}

        {messages.map((msg, idx) => {
          const isMe = msg.sender.username === currentUser;
          return (
            <div
              key={idx}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-xl shadow-md ${
                  isMe
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-700 text-gray-100 rounded-bl-none"
                }`}
              >
                <p className="text-sm font-semibold mb-1">
                  {msg.sender.username}
                </p>
                <p>{msg.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {typingUser && typingUser !== currentUser && (
        <div className="px-5 py-1 text-sm text-gray-400 italic animate-pulse">
          {typingUser} is typing...
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 border-t border-gray-700">
        <input
          value={content}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents line break in input
              sendMessage();
            }
          }}
          onChange={handleTypingInput}
          placeholder="Type a message..."
          className="flex-1 bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-full font-semibold shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
