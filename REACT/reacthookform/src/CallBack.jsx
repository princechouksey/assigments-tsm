import React, { useState, useCallback } from "react";

function Child({ onClick }) {
  console.log("Child rendered!");
  return <button onClick={onClick}>Click Child Button</button>;
}

export default function CallBack() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); 

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>

    
  );
}
