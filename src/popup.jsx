import React, { useState } from "react";
import { render } from "react-dom";
import { BlockPicker } from "react-color";

function Popup() {
  const [background, setBackground] = useState("#d9e3f0");

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  return (
    <div>
      <img
        src={chrome.runtime.getURL("logo.png")}
        alt="Logo"
        style={{ width: "60px" }}
      />


      <BlockPicker color={background} onChangeComplete={handleChangeComplete} />
    </div>
  );
}

render(<Popup />, document.getElementById("react-target"));
