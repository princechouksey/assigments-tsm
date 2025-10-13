import React, { useState, useMemo } from "react";

const factorialOf = (n) => {
  console.log(`Calculating factorial for n = ${n}`);
  if (n === 0) {
    return 1;
  }

  if (n < 0) {
    return "Not defined for negative numbers";
  }

  return n * factorialOf(n - 1);
};

function Memoization() {
  const [number, setNumber] = useState(0);

  const [rerenderCount, setRerenderCount] = useState(0);

  // The useMemo hook's implementation does NOT change.
  // It still caches the final result based on the 'number' dependency.
  const factorial = useMemo(() => factorialOf(number), [number]);
  
  return (
    <div>
      <h2>Factorial Calculator (Recursive) with useMemo</h2>

      <p>
        Factorial of
        <input
          //   type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          style={{ marginLeft: "10px", width: "50px" }}
        />
        is: <strong>{factorial}</strong>
      </p>

      <hr />

      <button onClick={() => setRerenderCount((c) => c + 1)}>
        Force Re-render
      </button>
      <p>Component has re-rendered {rerenderCount} times.</p>
    </div>
  );
}

export default Memoization;
