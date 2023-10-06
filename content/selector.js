// --- Inject button into the DOM --- //
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
    if (!parentElement.querySelector("input[type='color']")) {
      parentElement.appendChild(colorPickerInput);
    }
  }
}

function findParentDataEventId(element) {
  while (element && !element.getAttribute("data-eid")) {
    element = element.parentElement;
  }
  return element;
}

const buttonObserverConfig = {
  childList: true,
  subtree: true,
};

const buttonObserver = new MutationObserver(injectColorPickerInput);
buttonObserver.observe(document, buttonObserverConfig);
