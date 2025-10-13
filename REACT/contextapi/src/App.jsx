import React, { Suspense } from "react";
import { ThemeProvider } from "./ThemeProvider";
import Home from "./Home";
import FibonacciCalculator from "./Fibonacci.jsx";

export default function App() {
    const ImageGallery = React.lazy(()=>import("./ImageGallery.jsx"));

  return (
    //  <ThemeProvider>
    //   {/* <Home /> */}
    //   <FibonacciCalculator number={10} />
      
    //  </ThemeProvider>

    <div>
      <h1>My App</h1>
      <Suspense fallback = {<div>Loading Gallery...</div>}>
        <ImageGallery />
      </Suspense>
    </div>


     






  );
}
