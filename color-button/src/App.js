import React, { useState } from "react";
import "./App.css";

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const newButtonColor = buttonColor === "MediumVioletRed" ? "MinightBlue" : "MediumVioletRed";
  const [disableButton, setDisableButton] = useState(false);

  return (
    <div className='App'>
      <button
        disabled={disableButton}
        style={{ backgroundColor: disableButton ? "grey" : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}>
        Change to {newButtonColor}
      </button>
      <input
        type='checkbox'
        id='disable-button-checkbox'
        name=''
        onClick={() => setDisableButton((prev) => !prev)}
      />
      <label htmlFor='disable-button-checkbox'>Disable button</label>
    </div>
  );
}

export default App;
