import React, { useState } from "react";

function ChildComponent(props) {
    // console.log(onDataFromChild);
    console.log(props.dataa);
    const handleChange = (e)=>{
        const dataToSend  = e.target.value;
        props.onDataFromChild(dataToSend);
    }
    return (
        <div>
            <h3>Child Component</h3>
            <input type="text"
            placeholder="Yahan type karo..."
            onChange={handleChange} />
        </div>
    )
  
}

function ChildtoParent() {
  const [dataFromChild, setDataFromChild] = useState("");

  const handleDataFromChild = (data)=>{
    console.log(data);
    setDataFromChild(data);
  }

  return (
    <div>
      <h1>Parent Component</h1>
      <h2>Child se aaya data: "{dataFromChild}"</h2>
      <hr />

      <ChildComponent dataa = {dataFromChild} onDataFromChild={handleDataFromChild} />
    </div>
  );
}

export default ChildtoParent;
