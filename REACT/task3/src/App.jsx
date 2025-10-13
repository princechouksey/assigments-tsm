import React, { useState } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Add Task
  const handleClick = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  // Toggle Complete
  const completeTaskHandler = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  // Remove Task
  const removeTaskHandler = (index) => {
  const newTodos = [...todos]; 
  newTodos.splice(index, 1);   
  setTodos(newTodos); 
  };

  return (
    <div className="w-full h-screen bg-red-100 flex items-center justify-center">
      <div className="w-[40vw] h-[70vh] bg-amber-50 rounded-lg shadow-lg">
        
        {/* Input Section */}
        <div className="bg-amber-50 p-5 flex items-start gap-4">
          <input
            type="text"
            placeholder="Enter Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-[70%] py-2 px-3 border rounded outline-0"
          />
          <button
            className="ml-5 px-4 py-2 bg-blue-400 rounded-xl text-white"
            onClick={handleClick}
          >
            Add Task
          </button>
        </div>

        {/* Todo List */}
        {todos.length > 0 && (
          <div className="p-5 space-y-3">
            {todos.map((elem, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
              >
                <li
                  onClick={() => completeTaskHandler(index)}
                  className={`cursor-pointer list-none ${
                    elem.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {elem.text}
                </li>
                <button
                  onClick={() => removeTaskHandler(index)}
                  className="px-3 py-1 bg-red-500 rounded text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
