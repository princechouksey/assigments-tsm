import React, { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-red-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[400px] text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Counter App
        </h1>

        <p className="text-xl font-semibold mb-6 text-gray-700">
          Count: <span className="text-indigo-600">{counter}</span>
        </p>

        <div className="flex flex-col gap-4">
          {/* Increment & Decrement */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCounter(counter + 1)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition"
            >
              Increment
            </button>
            <button
              onClick={() => setCounter(counter - 1)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
            >
              Decrement
            </button>
          </div>

          <div className="flex gap-3 justify-center items-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-24 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Value"
            />
            <button
              onClick={() => {setCounter(counter + Number(amount)) ; setAmount(0)}}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
            >
              Add Value
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={() => {setCounter(0);setAmount(0)}}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
