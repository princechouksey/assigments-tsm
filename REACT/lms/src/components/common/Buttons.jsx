import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Pencil, BookUp, BookOpen, BookMarked, BookPlus, BookDown } from "lucide-react";

const memberActions = [
  { title: "Add New Member", icon: ClipboardList, path: "/add-member" },
  { title: "Add New Book", icon: Pencil, path: "/add-book" },
  { title: "Issue a Book", icon: BookUp, path: "/issue-book" },
];
const studentActions = [
  { title: "View Available Books", icon: BookOpen, path: "/available-books" },
  { title: "My Issued Books", icon: BookMarked, path: "/my-books" },
  { title: "Request a Book", icon: BookPlus, path: "/request-book" },
  { title: "Return a Book", icon: BookDown, path: "/return-book" },
];
const role = localStorage.getItem("role")


const Buttons = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 flex gap-6 flex-wrap">
      { role && role === "admin" ? (memberActions.map((elem, idx) => {
        const Icon = elem.icon;
        return (
          <button
            key={idx}
            onClick={() => navigate(elem.path)}
            className=" cursor-pointer rounded-4xl shadow-lg bg-white flex items-center justify-center gap-3 px-8 py-4 transition hover:bg-cyan-400 hover:text-white"
          >
            <Icon size={28} className="text-cyan-500" />
            <span className="text-lg font-medium text-gray-700">{elem.title}</span>
          </button>
        )
      }))
      :(studentActions.map((elem, idx) => {
        const Icon = elem.icon;
        return (
          <button
            key={idx}
            onClick={() => navigate(elem.path)}
            className=" cursor-pointer rounded-4xl shadow-lg bg-white flex items-center justify-center gap-3 px-8 py-4 transition hover:bg-cyan-400 hover:text-white"
          >
            <Icon size={28} className="text-cyan-500" />
            <span className="text-lg font-medium text-gray-700">{elem.title}</span>
          </button>
        )
        
      }))

    
    }
    </div>
  );
};

export default Buttons;
