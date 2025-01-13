const { Icon } = require("@chakra-ui/react");
// --- Observers --- //
const calendarObserver = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    try {
      updateEventColorsFromStorage();
    } catch (error) {
      if (error.message === 'Extension context invalidated.') {
        console.log('Extension was reloaded, updated, or the background page was closed.');
      } else {
        throw error;
      }
    }
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
        changeColorSelectorColor(eventId, color);
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
      handleTextColors(element, color);
    });
  }
}


function handleTextColors(element, color) {
  let childElement = element.querySelector('span.WBi6vc');
  if (childElement) {
    if (isColorTooDark(color)) {
      childElement.style.color = '#ffffff';
    } else {
      childElement.style.color = '#000000';
    }
  }
}

function isColorTooDark(color) {
  let r, g, b;
  if (color.charAt(0) === '#') {
    let colorValue = parseInt(color.slice(1), 16);
    r = colorValue >> 16;
    g = (colorValue >> 8) & 255;
    b = colorValue & 255;
  }
  // Calculate the luminance value
  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}


function changeColorSelectorColor(eventId, color) {
  const currentUrl = window.location.href;

  // Case 1: editing an event
  if (currentUrl.includes('/eventedit/') && currentUrl.includes(eventId)) {
    let editPageColorSelector = document.querySelector(`div[jsname="QPiGnd"]`);
    if (editPageColorSelector) {
      editPageColorSelector.style.backgroundColor = color;
    }
  }
  // Case 2: creating an event
  else {
    let createModalColorSelector = document.querySelector(`div[data-eventid="${eventId}"] div[jsname="QPiGnd"]`);
    if (createModalColorSelector) {
      createModalColorSelector.style.backgroundColor = color;
    }
  }
}