// --- Observers --- //

const calendarObserver = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    console.log("Calendar observer triggered.");
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
        changeCalendarEventColor(eventId, color);
      }
    }
  });
}

// --- Event bar color change --- //
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

      const accentElement = eventWrapperElement.querySelector(".T7dzVe");
      if (accentElement) {
        accentElement.style.backgroundColor = color;
      }
    });
  }
}
