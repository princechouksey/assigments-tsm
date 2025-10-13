import React, { useState, useMemo } from 'react';

function slowFibonacci(n) {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
}

export default function FibonacciCalculator({ number }) {
  const [time, setTime] = useState(new Date());
  // Without useMemo, this slow function runs every time the component re-renders
  // const result = slowFibonacci(number);

  // With useMemo, the result is cached and only re-calculated if 'number' changes
  const result = useMemo(() => {
    console.log('Calculating Fibonacci...');
    return slowFibonacci(number);
  }, [number]);

  return (
    <div>
      <p>Fibonacci of {number} is: {result}</p>
      <button onClick={() => setTime(new Date())}>Re-render component</button>
      <p>Current Time: {time.toLocaleTimeString()}</p>
    </div>
  );
}
