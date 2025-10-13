import React from "react";
import { BookCopy, User, BookOpenCheck, Clock, Wallet } from "lucide-react";

const StatsCard = () => {
  const Adminstats = [
    {
      title: "Total Registered Books",
      value: 15452,
      icon: BookCopy,
    },
    {
      title: "Total Registered Users", // Made title more specific
      value: 3890,
      icon: User,
    },
    {
      title: "Total Books Currently Issued",
      value: 1000,
      icon: BookOpenCheck,
    },
    {
      title: "Overdue Books",
      value: 80,
      icon: Clock,
    },
  ];
  const studentStats = [
    {
      title: "Books Issued",
      value: 5, // Example: number of books the student has currently issued
      icon: BookOpenCheck,
    },
    {
      title: "Books Returned",
      value: 12, // Example: total books returned by this student
      icon: BookCopy,
    },
    {
      title: "Pending Returns",
      value: 2, // Example: books not yet returned
      icon: Clock,
    },
    {
      title: "Fines Due",
      value: "₹150", // Example: pending fine
      icon: Wallet, // you can use a different icon like DollarSign, Wallet, or Receipt
    },
  ];
   
  let role = localStorage.getItem("role")
  

  return (
    <div className="flex  items-center justify-center gap-6 p-4">
      {role && role == "admin"
        ? Adminstats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.title}
                className="w-full sm:w-1/2 md:w-1/4 max-w-xs min-w-[250px] h-[250px] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 p-4 transform hover:scale-105 transition-transform duration-300 bg-gradient-to-tl from-teal-50 to-white  "
              >
                <IconComponent size={60} className="text-cyan-500" />
                <h2 className="text-lg text-center text-gray-600 font-medium">
                  {stat.title}
                </h2>
                <p className="text-4xl text-black font-bold">
                  {stat.value.toLocaleString()}
                </p>
              </div>
            );
          })
        : studentStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.title}
                className="w-full sm:w-1/2 md:w-1/4 max-w-xs min-w-[250px] h-[250px] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 p-4 transform hover:scale-105 transition-transform duration-300 bg-gradient-to-tl from-teal-50 to-white  "
              >
                <IconComponent size={60} className="text-cyan-500" />
                <h2 className="text-lg text-center text-gray-600 font-medium">
                  {stat.title}
                </h2>
                <p className="text-4xl text-black font-bold">
                  {stat.value.toLocaleString()}
                </p>
              </div>
            );
          })}
    </div>
  );
};

export default StatsCard;
