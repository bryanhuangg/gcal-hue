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

// --- Event bar color change --- //
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

  // trigger hide checkmark
}



// --- Event  --- //
