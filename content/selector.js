// --- Inject button into the DOM --- //
const buttonObserverConfig = {
    childList: true,
    subtree: true,
  };
  
  const buttonObserver = new MutationObserver(injectColorPickerInput);
  buttonObserver.observe(document, buttonObserverConfig);

function injectColorPickerInput() {
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
        changeCalendarEventColor(eventId, color);
      });
    }
  });

  const parentElement = document.querySelector('[jsname="hklcae"]');
  if (parentElement) {
    hideCheckmarkIcon(parentElement);
    if (!parentElement.querySelector("input[type='color']")) {
      parentElement.appendChild(colorPickerInput);
    }
  }
}



function hideCheckmarkIcon(parentElement) {
  const existingIconElement = parentElement.querySelector(
    ".google-material-icons.meh4fc.hggPq.lLCaB.M8B6kc.eO2Zfd"
  );
  if (existingIconElement) {
    existingIconElement.className = "google-material-icons meh4fc hggPq lLCaB M8B6kc";
  }
}


function findParentDataEventId(element) {
  while (element && !element.getAttribute("data-eid")) {
    element = element.parentElement;
  }
  return element;
}
