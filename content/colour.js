// --- Observers --- //
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

const targetElement = document.getElementById("yDmH0d");
calendarObserver.observe(targetElement, calendarObserverConfig);

function applyColorsToEvents() {
  chrome.storage.sync.get(null, (items) => {
    for (const eventId in items) {
      const color = items[eventId];
      if (color) {
        changeEventColor(eventId, color);
      }
    }
  });
}

// --- Event bar color change --- //
function changeEventColor(eventId, color) {
  const eventWrapperElements = document.querySelectorAll(
    `[data-eventid="${eventId}"]`
  );

  if (eventWrapperElements) {
    eventWrapperElements.forEach((eventWrapperElement) => {
      const eventElement = eventWrapperElement.querySelector(".g3dbUc");
      if (eventElement) {
        eventElement.style.backgroundColor = color;
      }

      const eventBorder = eventWrapperElement.querySelector(".zWcBU");
      if (eventBorder) {
        if (eventBorder.style.borderRightColor) {
          eventBorder.style.borderRightColor = color;
        }

        // Check if border-left-color is present
        if (eventBorder.style.borderLeftColor) {
          eventBorder.style.borderLeftColor = color;
        }
      }

      const accentElement = eventWrapperElement.querySelector(".T7dzVe");
      if (accentElement) {
        accentElement.style.backgroundColor = color;
      }
    });
  }
}
