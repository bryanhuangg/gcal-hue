// --- Inject button into the DOM --- //
const buttonObserverConfig = {
  childList: true,
  subtree: true,
};

const buttonObserver = new MutationObserver(injectColorPickerInput);
buttonObserver.observe(document, buttonObserverConfig);




function injectColorPickerInput() {
  // Bordered Container
  const borderedContainer = document.createElement("div");
  borderedContainer.style.border = "1px solid #ccc"; 
  borderedContainer.style.padding = "10px"; 
  borderedContainer.style.borderRadius = "5px";
  borderedContainer.style.marginTop = "10px";

  // Label
  const textElement = document.createElement("span");
  textElement.textContent = "HUE Overlay";
  textElement.style.fontFamily = "Courier New, Courier, monospace"; // Set the monospace font
  textElement.style.marginLeft = "4px";


  const containerElement = document.createElement("div");
  containerElement.style.display = "flex"; 

  // Color Picker Button
  const colorPickerInput = document.createElement("input");
  colorPickerInput.type = "color";
  colorPickerInput.style.margin = "5px";
  colorPickerInput.style.width = "30px";
  colorPickerInput.value = "#4287f5";

  colorPickerInput.addEventListener("change", (event) => {
    const eventWrapperElement = findParentDataEventId(event.target);
    if (eventWrapperElement) {
      const eventId = eventWrapperElement.getAttribute("data-eid");
      const color = event.target.value;
      chrome.storage.sync.set({ [eventId]: color }).then(() => {
        changeEventColor(eventId, color);
      });
    }
  });

  // Clear Button as Image
  const clearButton = document.createElement("img");
  clearButton.src = "images/icon.png";
  clearButton.alt = "Clear"; 
  clearButton.style.width = "30px";
  clearButton.style.height = "30px";
  clearButton.style.cursor = "pointer";

  clearButton.addEventListener("click", () => {
    const eventWrapperElement = findParentDataEventId(colorPickerInput);

    if (eventWrapperElement) {
      const eventId = eventWrapperElement.getAttribute("data-eid");
      chrome.storage.sync.remove(eventId).then(() => {
        // TODO: find a better way to get back the original color
        location.reload();
      });
    }
  });

  // Append Color Picker and Clear Button to Container
  containerElement.appendChild(colorPickerInput);
  containerElement.appendChild(clearButton);

  // Append Text and Container to Bordered Container
  borderedContainer.appendChild(textElement);
  borderedContainer.appendChild(containerElement);

  // Append Bordered Container to Parent Element
  const parentElement = document.querySelector('[jsname="hklcae"]');
  if (parentElement) {
    if (!parentElement.querySelector("input[type='color']")) {
      parentElement.appendChild(borderedContainer);
    }
  }
}




function hideCheckmarkIcon(parentElement) {
  const existingIconElement = parentElement.querySelector(
    ".google-material-icons.meh4fc.hggPq.lLCaB.M8B6kc.eO2Zfd"
  );
  if (existingIconElement) {
    existingIconElement.className =
      "google-material-icons meh4fc hggPq lLCaB M8B6kc";
  }
}

function findParentDataEventId(element) {
  while (element && !element.getAttribute("data-eid")) {
    element = element.parentElement;
  }
  return element;
}