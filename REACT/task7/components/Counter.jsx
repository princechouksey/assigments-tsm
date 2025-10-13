import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0)
  return (
    <div><h1>Counter</h1>
        <h3>Count is {count}</h3>
        <button className='px-8 py-1 bg-amber-200 border-none mr-10 rounded-xl' onClick={()=>setCount(count +1)}>Inc</button>
        <button className='px-8 py-1 bg-red-600 border-none mr-10 rounded-xl' onClick={()=>setCount(count -1)}>Dec</button>

    </div>
    
  )
}

export default Counter