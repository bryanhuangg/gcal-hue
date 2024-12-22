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
      hideCheckmarkAndModifyBuiltInColors();
    }
    observer.observe(document, paletteObserverConfig);
  });
}

function injectColorPalette(validColors) {
  const colorSelectorDiv = document.querySelector('.B7PAmc');
  if (colorSelectorDiv) {
    const innerColorSelectorDiv = colorSelectorDiv.querySelector('div');
    if (innerColorSelectorDiv) {

      const scenario = findColorPickerScenario(colorSelectorDiv);
      let rowSize = 2;
      if (scenario == SCENARIO.CONTEXT) 
        rowSize = 6;
      

      let colorDivGroup = document.createElement('div');
      colorDivGroup.className = 'vbVGZb colorDivGroup';

      validColors.forEach((color, index) => {
        const colorElement = createColorElement(color, scenario);
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
  if (colorSelectorDiv.classList.contains('ztKZ3d')) {
    return SCENARIO.CONTEXT;
  }

  const currentUrl = window.location.href;
  if (currentUrl.includes('/eventedit/')) {
    return SCENARIO.EVENTEDIT;
  }

  return SCENARIO.NEWEVENT;
}


function createColorElement(color, scenario) {
  
  let ly0WLHTML = `<div jsname="Ly0WL" jsaction="click:rhcxd; keydown:Hq2uPe; focus:htbtNd" tabindex="0" role="menuitemradio" class="A1wrjc kQuqUe pka1xd" data-color="${color}" data-color-index="-2" aria-label="Color, set event color" style="background-color: ${color};"><i class="google-material-icons meh4fc hggPq lLCaB M8B6kc" aria-hidden="true">bigtop_done</i><div class="oMnJrf" aria-hidden="true" jscontroller="eg8UTd" jsaction="focus: eGiyHb;mouseenter: eGiyHb; touchstart: eGiyHb" data-text="Color" data-tooltip-position="top" data-tooltip-vertical-offset="0" data-tooltip-horizontal-offset="0" data-tooltip-only-if-necessary="false"></div></div>`;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = ly0WLHTML;
  const colorElement = tempDiv.firstChild;


  colorElement.addEventListener('click', async () => {
    const eventId = findEventIdByScenario(scenario);
    chrome.storage.local.set({ [eventId]: color });
    // chrome.storage.local.get(null, function(items) {
    //   console.log(items);
    // });
  });
  return colorElement;
}


function hideCheckmarkAndModifyBuiltInColors() {
  const builtInColorElement = document.querySelectorAll('div[jsname="Ly0WL"]');
  builtInColorElement.forEach((element) => {
      hideCheckmarkIcon(element);
      if (element.getAttribute('data-color-index') !== '-2') {
        element.addEventListener('click', () => {
          const colorSelectorDiv = document.querySelector('.B7PAmc');
          const scenario = findColorPickerScenario(colorSelectorDiv);
          const eventId = findEventIdByScenario(scenario);

          chrome.storage.local.remove(eventId);
          // chrome.storage.local.get(null, function(itemsback) {
          //   console.log(items);
          // });
        });
      }
  });
}

function hideCheckmarkIcon(parentElement) {
  const existingIconElement = parentElement.querySelector(
    ".google-material-icons.meh4fc.hggPq.lLCaB.M8B6kc.eO2Zfd"
  );
  if (existingIconElement) {
    existingIconElement.className = "google-material-icons meh4fc hggPq lLCaB M8B6kc";
  }
}

function findEventIdByScenario(scenario) {
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
  const eventIdAttribute = "data-eventid"

  // need the [jsname] attribute in this selector bc there can be many div[data-eventid] elements
  let element = document.querySelector(`div[${eventIdAttribute}][jsname]`);

  if (element === null || element.getAttribute(eventIdAttribute) === null) {
    console.error("Failed getting event ID");
  }

  return element.getAttribute(eventIdAttribute);
}

function findContextMenuEventId() {
  const eventIdAttribute = "data-eid"

  let element = document.querySelector(`div[${eventIdAttribute}]`);

  if (element === null || element.getAttribute(eventIdAttribute) === null) {
    console.error("Failed getting event ID");
  }

  return element.getAttribute(eventIdAttribute)
}
