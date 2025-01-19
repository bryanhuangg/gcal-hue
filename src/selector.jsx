// --- Observers --- //
const paletteObserverConfig = {
  childList: true,
  subtree: true,
};

const paletteObserver = new MutationObserver(getColorPaletteAndModifyColorPicker);
paletteObserver.observe(document, paletteObserverConfig);

// --- Constants --- //
const SCENARIO = {
  /*
    Scenarios that triggers color picker:
    0. CONTEXT: When user is in Calendar view and right clicks on an event.
    1. NEWEVENT: When user is creating a new event.
    2. EVENTEDIT: When user is editing an existing event.
  */
  CONTEXT: 0,
  NEWEVENT: 1,
  EVENTEDIT: 2,
}

// --- Functions --- //
function getColorPaletteAndModifyColorPicker(mutationsList, observer) {
  /*
    Get color palette from chrome storage and modify color picker. Parent function for all color picker modifications.

    @param {MutationRecord[]} mutationsList
    @param {MutationObserver} observer
  */
  if (document.querySelector('.colorDivGroup')) return;
  observer.disconnect();

  chrome.storage.local.get(["colorPalette"], function (result) {
    if (result.colorPalette) {
      const validColors = result.colorPalette.filter(color => /^#([0-9A-F]{3}){1,2}$/i.test(color));
      injectColorPalette(validColors);
      modifyBuiltInColors();
    }
    observer.observe(document, paletteObserverConfig);
  });
}

function injectColorPalette(validColors) {
  /*
    Inject user's color palette into google calendar's color picker.

    @param {string[]} validColors: user's color palette in hex format
  */
  const colorSelectorDiv = document.querySelector('.B7PAmc');
  if (colorSelectorDiv) {
    const innerColorSelectorDiv = colorSelectorDiv.querySelector('div');
    if (innerColorSelectorDiv) {

      const scenario = findColorPickerScenario(colorSelectorDiv);
      const rowSize = scenario === SCENARIO.CONTEXT ? 6 : 2;
      
      let colorDivGroup = document.createElement('div');
      colorDivGroup.className = 'vbVGZb colorDivGroup';

      validColors.forEach((color, index) => {
        const colorElement = customColorOnClick(color, scenario);
        colorDivGroup.appendChild(colorElement);

        if ((index + 1) % rowSize === 0) {
          innerColorSelectorDiv.appendChild(colorDivGroup);
          colorDivGroup = document.createElement('div');
          colorDivGroup.className = 'vbVGZb colorDivGroup';
        }
      });

      if (validColors.length % rowSize !== 0) {
        innerColorSelectorDiv.appendChild(colorDivGroup);
      }
    }
  }
}

function findColorPickerScenario(colorSelectorDiv) {
  /*
    Helper function to determine the scenario of the color picker.

    @param {HTMLElement} colorSelectorDiv: color picker div element
    @return {number} senario: scenario context
  */
  if (colorSelectorDiv.classList.contains('ztKZ3d')) {
    return SCENARIO.CONTEXT;
  }

  const currentUrl = window.location.href;
  if (currentUrl.includes('/eventedit/')) {
    return SCENARIO.EVENTEDIT;
  }

  return SCENARIO.NEWEVENT;
}


function customColorOnClick(color, scenario) {
  /*
    handle onclick event for custom color element

    @param {string} color: color in hex format
    @param {number} scenario: scenario context
    @return {HTMLElement} colorElement: color
  */
  let ly0WLHTML = `<div jsname="Ly0WL" jsaction="click:rhcxd; keydown:Hq2uPe; focus:htbtNd" tabindex="0" role="menuitemradio" class="A1wrjc kQuqUe pka1xd" data-color="${color}" data-color-index="-2" aria-label="Color, set event color" style="background-color: ${color};"><i class="google-material-icons meh4fc hggPq lLCaB M8B6kc" aria-hidden="true">bigtop_done</i><div class="oMnJrf" aria-hidden="true" jscontroller="eg8UTd" jsaction="focus: eGiyHb;mouseenter: eGiyHb; touchstart: eGiyHb" data-text="Color" data-tooltip-position="top" data-tooltip-vertical-offset="0" data-tooltip-horizontal-offset="0" data-tooltip-only-if-necessary="false"></div></div>`;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = ly0WLHTML;
  const colorElement = tempDiv.firstChild;

  colorElement.addEventListener('click', async () => {
    // Actual ID is stored as 36 character base64 encoded string, followed with date and email,
    // we only need the ID part, so we slice it out. Also allows color to be set for series events.
    const eventId = findEventIdByScenario(scenario).slice(0, 36) 
    chrome.storage.local.set({ [eventId]: color });
    chrome.storage.local.get(null, function() {
      console.log(items);
    });
  });
  return colorElement;
}


function modifyBuiltInColors() {
  /*
    Hide checkmark icon and modify built-in colors in the color picker:
    - Hide checkmark icon
    - Remove color from storage when built-in color is selected
    - ...
  */
  const builtInColorElement = document.querySelectorAll('div[jsname="Ly0WL"]');
  builtInColorElement.forEach((element) => {
      hideCheckmarkIcon(element);
      if (element.getAttribute('data-color-index') !== '-2') {
        element.addEventListener('click', () => {
          const colorSelectorDiv = document.querySelector('.B7PAmc');
          const scenario = findColorPickerScenario(colorSelectorDiv);
          const eventId = findEventIdByScenario(scenario).slice(0, 36) ;

          chrome.storage.local.remove(eventId);
          chrome.storage.local.get(null, function() {
            console.log(items);
          });
        });
      }
  });
}

function hideCheckmarkIcon(parentElement) {
  /*  
    Helper that hides the checkmark icon in the color picker

    @param {HTMLElement} parentElement: parent element of the checkmark icon
  */
  const existingIconElement = parentElement.querySelector(
    ".google-material-icons.meh4fc.hggPq.lLCaB.M8B6kc.eO2Zfd"
  );
  if (existingIconElement) {
    existingIconElement.className = "google-material-icons meh4fc hggPq lLCaB M8B6kc";
  }
}

function findEventIdByScenario(scenario) {
  /*
    Helper function to find the event ID based on the scenario.

    @param {number} scenario: scenario context
  */

  if (SCENARIO.EVENTEDIT === scenario) {
    const currentUrl = window.location.href;
    return currentUrl.split('/eventedit/')[1];
  }
  else if (SCENARIO.NEWEVENT === scenario) {
    return findNewEventMenuEventId();
  }
  else if (SCENARIO.CONTEXT === scenario) {
    return findContextMenuEventId();
  }
  else {
    console.error("Unsupported scenario");
  }
}

function findNewEventMenuEventId() {
  /*
    Helper function to find the event ID when user is creating a new event.
  */
  const eventIdAttribute = "data-eventid"
  // Needs the [jsname] attribute in this selector because there can be many div[data-eventid] elements
  let element = document.querySelector(`div[${eventIdAttribute}][jsname]`);
  if (element === null || element.getAttribute(eventIdAttribute) === null) {
    console.error("Failed getting event ID");
  }
  return element.getAttribute(eventIdAttribute);
}

function findContextMenuEventId() {
  /*
    Helper function to find the event ID when user is right clicking on an event.
  */
  const eventIdAttribute = "data-eid"
  let element = document.querySelector(`div[${eventIdAttribute}]`);

  if (element === null || element.getAttribute(eventIdAttribute) === null) {
    console.error("Failed getting event ID");
  }

  return element.getAttribute(eventIdAttribute)
}
