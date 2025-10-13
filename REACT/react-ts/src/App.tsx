import React, { useState } from "react";
import Cart from "./Cart";
import InputField from "./components/InputField";
import type { Todo } from "./model"; // ✅ Correct import
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);


  const handleAdd = (e: React.FormEvent)=>{
    e.preventDefault();
    console.log(todo); 
    if(todo){
      setTodos([...todos, {
        id:Date.now(),
        todo,
        isDone:false
      }])
      console.log(todos);
      setTodo("")
    }

  }

  return (
    <div className="flex flex-col items-center h-screen p-3 bg-blue-700">
      <span className="text-4xl font-bold text-white mb-4">Taskify</span>

      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos ={ todos} setTodos={ setTodos}  />  
           </div>
  );
};

export default App;
 