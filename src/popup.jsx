import React from "react";
import { render } from "react-dom";
import { BlockPicker } from "react-color";

function Popup() {
  return (
    <div>
      <BlockPicker/>
    </div>
  );
}

render(<Popup />, document.getElementById("react-target"));
