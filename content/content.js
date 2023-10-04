const calendarObserver = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    applyColorsToEvents();
  });
});

const calendarObserverConfig = {
  childList: true,
  subtree: true,
};

calendarObserver.observe(document, calendarObserverConfig);


function applyColorsToEvents() {
  chrome.storage.sync.get(null, (items) => {
    for (const eventId in items) {
      const color = items[eventId];
      if (color) {
        changeCalendarEventColor(eventId, color);
      }
    }
  });
}

// -- Inject CSS into the DOM -- //
const eventClass = ".g3dbUc";
function changeCalendarEventColor(eventId, color) {
  const eventWrapperElements = document.querySelectorAll(
    `[data-eventid="${eventId}"]`
  );

  if (eventWrapperElements) {
    eventWrapperElements.forEach((eventWrapperElement) => {
      const eventElement = eventWrapperElement.querySelector(".g3dbUc");
      if (eventElement) {
        eventElement.style.backgroundColor = color;
      }
    });
  }
}

// --- Inject button into the DOM --- //
function injectColorChangeButton() {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = "Change Event Color";
  buttonElement.style.margin = "5px";
  buttonElement.addEventListener("click", (event) => {
    const eventWrapperElement = findParentDataEventId(event.target);
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

const buttonObserver = new MutationObserver(injectColorChangeButton);
buttonObserver.observe(document, buttonObserverConfig);
