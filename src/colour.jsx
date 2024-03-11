// --- Observers --- //
const calendarObserver = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    updateEventColorsFromStorage();
  });
});

const calendarObserverConfig = {
  childList: true,
  subtree: true,
};

calendarObserver.observe(document, calendarObserverConfig);

const targetElement = document.getElementById("yDmH0d");
calendarObserver.observe(targetElement, calendarObserverConfig);

// --- Functions --- //
function updateEventColorsFromStorage() {
  chrome.storage.local.get(null, (items) => {
    for (const eventId in items) {
      const color = items[eventId];
      if (color && eventId != 'colorPalette') {
        changeSingleEventColor(eventId, color);
      }
    }
  });
}

function changeSingleEventColor(eventId, color) {
  const eventWrapperElements = document.querySelectorAll(
    `[data-eventid="${eventId}"]`
  );

  if (eventWrapperElements) {
    eventWrapperElements.forEach((eventWrapperElement) => {
      updateColorOfEventElement(eventWrapperElement, color);
    });
  }
}

function updateColorOfEventElement(eventWrapperElement, color) {
  const elements = [eventWrapperElement, ...eventWrapperElement.querySelectorAll('*')];
  const stylesToChange = ['backgroundColor', 'borderColor', 'borderLeftColor', 'borderRightColor'];

  for (let element of elements) {
    stylesToChange.forEach(style => {
      if (element.style[style]) {
        element.style[style] = color;
      }
    });
  }
}
