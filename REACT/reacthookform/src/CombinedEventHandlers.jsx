import React, { useState } from 'react';

// This single component demonstrates various event handlers.
function CombinedEventHandlers() {
    const [isActive, setisActive] = useState(false)
  // 1. STATE MANAGEMENT
  // State for the input field's value
  const [inputValue, setInputValue] = React.useState('');
  // State to show a message after form submission
  const [submitMessage, setSubmitMessage] = React.useState('');
  // State for mouse enter/leave feedback
  const [mouseStatus, setMouseStatus] = React.useState('Mouse is outside.');
  // State for focus/blur feedback
  const [focusStatus, setFocusStatus] = React.useState('Input is not focused.');

  // 2. EVENT HANDLERS

  // --- Form Events ---
  const handleSubmit = (event) => {
    // Prevents the default form submission behavior (page reload)
    event.preventDefault();
    setSubmitMessage(`Form submitted with text: "${inputValue}"`);
  };

  const activeHandler = (e)=>{
    setisActive(!isActive)

  }

  // --- Input Events ---
  const handleChange = (event) => {
    // Updates the state with the current value of the input
    setInputValue(event.target.value);
  };

  // --- Keyboard Events ---
  const handleKeyDown = (event) => {
    // Logs the key that was pressed down
    console.log(`Key pressed: ${event.key}`);
  };

  // --- Mouse Events ---
  const handleMouseEnter = () => {
    setMouseStatus('Mouse has entered the area!');
  };

  const handleMouseLeave = () => {
    setMouseStatus('Mouse has left the area.');
  };
  
  const handleClick = () => {
    alert('The clickable area was clicked!');
  };

  // --- Focus Events ---
  const handleFocus = () => {
    setFocusStatus('Input is now focused.');
  };

  const handleBlur = () => {
    setFocusStatus('Input has lost focus.');
  };

  // 3. JSX TO RENDER THE COMPONENT
  return (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.8' }}>
      <h1>React Event Handlers Demo</h1>

      {/* --- Form, Input, and Keyboard Events --- */}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Form and Input Events</legend>
          <label htmlFor="text-input">Type here: </label>
          <input
            id="text-input"
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <button type="submit">Submit</button>
          <p>
            <strong>Current Input Value:</strong> {inputValue}
          </p>
          <p>
            <strong>Focus Status:</strong> {focusStatus}
          </p>
           <p>
            <strong>Submit Status:</strong> {submitMessage}
          </p>
          <small>(Check the console for keydown events)</small>
        </fieldset>
      </form>

      <hr />

      {/* --- Mouse Events --- */}
      <fieldset>
        <legend>Mouse Events</legend>
        <div
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            padding: '20px',
            border: '2px dashed navy',
            backgroundColor: '#eef',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          Hover over me or click me!
        </div>
        <p>
          <strong>Mouse Status:</strong> {mouseStatus}
        </p>
      </fieldset>


       <div
       onClick={activeHandler}
      className={isActive ? "bg-green-500 text-white p-4" : "bg-red-500 text-black p-4"}
    >
      {isActive ? "Active" : "Inactive"}
    </div>
    </div>
  );
}

export default CombinedEventHandlers;