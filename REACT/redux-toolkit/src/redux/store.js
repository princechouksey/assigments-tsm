import { configureStore } from "@reduxjs/toolkit";
import  counterSlice  from "./slices/CounterSlice";



export const store = configureStore({
   reducer: {
    counter: counterSlice
  },

})