import { BookOpen, IdCard, LaptopMinimal, Settings,LayoutDashboard, BookCopy, User, LogOut } from "lucide-react";

import React from "react";import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role")
  console.log(role);

  // Dynamic menu items
  const menuItems = [
    { icon: BookOpen, label: "Books", path: "/books" },
    { icon: IdCard, label: "Members", path: "/members" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: LogOut, label: "Logout", path: "/logout" },
  ];

const studentMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
  { icon: BookCopy, label: "My Books", path: "/student/my-books" },
  { icon: User, label: "My Account", path: "/student/account" },
  { icon: LogOut, label: "Logout", path: "/logout" },
];

  return (
   <div className="flex">
  <div className="w-[10vw] min-h-screen bg-blue-950 text-white flex flex-col items-center py-4 shadow-lg">
    {/* Logo Section */}
    <div className="p-4 rounded-2xl">
      <LaptopMinimal size={50} />
    </div>

    {/* Sidebar Menu */}
    <div className="flex flex-col gap-10 mt-12 flex-grow">
      {role && role === "admin"
        ? menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center group text-gray-300 hover:bg-cyan-500 hover:text-white rounded-2xl py-1"
              >
                <div className="py-1 px-5 rounded-xl transition">
                  <Icon size={40} />
                </div>
                <span className="text-sm group-hover:text-white">{item.label}</span>
              </button>
            );
          })
        : studentMenuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center group text-gray-300 hover:bg-cyan-500 hover:text-white rounded-2xl py-1"
              >
                <div className="py-1 px-5 rounded-xl transition">
                  <Icon size={40} />
                </div>
                <span className="text-sm group-hover:text-white">{item.label}</span>
              </button>
            );
          })}
    </div>
  </div>

  <Topbar />
</div>

  );
};

export default Sidebar;
