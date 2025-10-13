import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, reset, incrementByAmount } from './redux/slices/CounterSlice'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(0)

  return (
    <div>
      <div>
        <button

          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <br />
        <input type="Number"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)} />
        <button
          aria-label="Increment value by Amount"
          onClick={() => dispatch(incrementByAmount(amount))}
        >
          Inc by Amount
        </button>
        <br />
        <button onClick={()=>dispatch(reset())}>
          Reset
        </button>
      </div>
    </div>
  )
}
export default App;