import React, { useState } from "react";

const ErrorBoundries = () => {
  const [count, setCount] = useState(0);

  if (count === 5) {
    throw new Error("💥 I Crashed!!!");
  }

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
           Error Boundary Demo
        </h1>
        <p className="mb-4 text-gray-600">
          Click the button until the counter reaches <b>5</b>.  
          The app will crash and be caught by the <span className="font-semibold">ErrorBoundary</span>.
        </p>

        <div className="flex items-center gap-5 justify-center">
          <button
            className="px-6 py-2 rounded-xl bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition-all"
            onClick={() => setCount(count + 1)}
          >
            Click Me
          </button>
          <h1 className="text-4xl font-bold text-gray-700">{count}</h1>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundries;
