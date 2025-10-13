import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        theme === "light" ? "bg-gray-100 text-gray-800" : "bg-gray-900 text-white"
      }`}
    >
      <div
        className={`p-8 rounded-xl text-center shadow-lg transition-all duration-300 ${
          theme === "light" ? "bg-white shadow-gray-300" : "bg-gray-800 shadow-black"
        }`}
      >
        <h1 className="text-3xl mb-5">🌗 Current Theme: {theme}</h1>
        <button
          onClick={toggleTheme}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            theme === "light" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default Home;
