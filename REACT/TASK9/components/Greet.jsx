import React, { useEffect } from 'react'

const Greet = ({name}) => {
    useEffect(() => {
       setTimeout(() => {
        console.log("Hello world");
        
       }, 1000);
      
    }, [])
    
  return (
    <div>
        <h1> Hello {name}</h1>
    </div>
  )
}

export default Greet