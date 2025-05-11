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

const COLOR_SELECTOR_OPTIONS_SELECTOR = 'div[jsname="Ly0WL"]';
const COLOR_SELECTOR_DISPLAY_SELECTOR = 'div[jsname="QPiGnd"]';
const MONTH_VIEW_EVENT_CIRCLE_SELECTOR = 'div.VlNR9e';
const EVENT_TEXT_SELECTORS = 'span.WBi6vc, span.I0UMhf, div.lhydbb';

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
  const allEventElements = document.querySelectorAll('[data-eventid]');

  allEventElements.forEach((element) => {
    const currentId = element.getAttribute('data-eventid').slice(0, 36);
    if (currentId === eventId) {
      updateColorOfEventElement(element, color);
    }
  });
}


function updateColorOfEventElement(eventWrapperElement, color) {
  const elements = [eventWrapperElement, ...eventWrapperElement.querySelectorAll('*')];
  const stylesToChange = ['backgroundColor', 'borderColor', 'borderLeftColor', 'borderRightColor'];

  // The background will be the custom color, unless we are in 'month' view and the event is a limited time event,
  // in which case the background is white
  const actualBGColor = elements.find((element) => {
    return element.matches(MONTH_VIEW_EVENT_CIRCLE_SELECTOR)
  }) ? '#ffffff' : color;

  for (let element of elements) {
    // Avoid changing colors of the options in the color picker menu
    if (!element.matches(COLOR_SELECTOR_OPTIONS_SELECTOR)) {
      stylesToChange.forEach(style => {
        if (element.style[style]) {
          element.style[style] = color;
        }
        handleTextColors(element, actualBGColor);
      });
    }
  }
}


function handleTextColors(element, color) {
  let elements = element.querySelectorAll(EVENT_TEXT_SELECTORS);
  let textColor = isColorTooDark(color) ? '#ffffff' : '#000000';
  for (let element of elements) {
    element.style.color = textColor;
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

// Note: color selector's color change in event creation modal is already covered by other functions
function changeColorSelectorColor(eventId, color) {
  const currentUrl = window.location.href;

  // Case: editing an event
  if (currentUrl.includes('/eventedit/') && currentUrl.includes(eventId)) {
    let editPageColorSelector = document.querySelector(COLOR_SELECTOR_DISPLAY_SELECTOR);
    if (editPageColorSelector) {
      editPageColorSelector.style.backgroundColor = color;
    }
  }
}