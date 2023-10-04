// -- Inject CSS into the DOM -- //
const eventBarClass = ".g3dbUc";

function changeCalendarEventColor(eventId, color) {
  console.log(eventId)
  const eventWrapperElement = document.querySelector(
    `[data-eventid="${eventId}"]`
  );

  if (eventWrapperElement) {
    const eventElement = eventWrapperElement.querySelector(".g3dbUc");

    if (eventElement) {
      eventElement.style.backgroundColor = color;
    }
  }
}

const colorChangeObserverConfig = {
  childList: true,
  subtree: true,
};
const colorChangeObserver = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    // Extract the eventId from the mutation record
    const eventId = mutation.target.getAttribute("data-eventid");

    // Retrieve the color associated with this eventId from chrome.storage.sync
    chrome.storage.sync.get(eventId, (items) => {
      const color = items[eventId];
      
      if (color) {
        changeCalendarEventColor(eventId, color);
      }
    });
  });
});
colorChangeObserver.observe(document, colorChangeObserverConfig);


// --- Inject button into the DOM --- //
function injectButton() {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = "Change Event Color";
  buttonElement.style.margin = "5px";
  buttonElement.addEventListener("click", (event) => {
    // Traverse the DOM to find the event_id associated with the clicked button
    const eventWrapperElement = findEventWrapperElement(event.target);

    if (eventWrapperElement) {
      const eventId = eventWrapperElement.getAttribute("data-eid");
      const color = prompt("Enter a color (e.g., #FF0000):");
      if (color) {
        chrome.storage.sync.set({ [eventId]: color }).then(() => {
          changeCalendarEventColor(eventId, color);
        });
      }
    }
  });

  const parentElement = document.querySelector('[jsname="hklcae"]');

  if (parentElement) {
    if (!parentElement.querySelector("button")) {
      parentElement.appendChild(buttonElement);
    }
  }
}

function findEventWrapperElement(element) {
  while (element && !element.getAttribute("data-eid")) {
    element = element.parentElement;
  }
  return element;
}

const buttonObserverConfig = {
  childList: true,
  subtree: true,
};

const buttonObserver = new MutationObserver(injectButton);
buttonObserver.observe(document, buttonObserverConfig);
