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
      changeEventMainColor(eventWrapperElement, color);
      changeEventBorderColor(eventWrapperElement, color);
      changeEventSideBarColor(eventWrapperElement, color);
      changeMaterialIconColor(eventWrapperElement, color);
    });
  }
}

// --- Color change helpers -- //

function changeEventMainColor(eventWrapperElement, color) {
  let eventElement = eventWrapperElement.querySelector(".VrDepf");
  if (eventElement) {
    // eventElement is a dot (specific time)
    eventElement.style.borderColor = color;
  } else {
    // event Element is a bar (all day event)
    eventElement = eventWrapperElement.querySelector(".g3dbUc");
    if (eventElement) {
      eventElement.style.backgroundColor = color;
    }
  }
}

function changeMaterialIconColor(eventWrapperElement, color) {
  const materialIconElement = eventWrapperElement.querySelector(".T7dzVe");
  if (materialIconElement) {
    materialIconElement.style.backgroundColor = color;
  }
}

function changeEventSideBarColor(eventWrapperElement, color) {
  const sidebarElement = eventWrapperElement.querySelector('.zhRc7');

  if (sidebarElement) {
    sidebarElement.style.backgroundColor = color;
  }
}

function changeEventBorderColor(eventWrapperElement, color) {
  const eventBorder = eventWrapperElement.querySelector(".zWcBU");
  if (eventBorder) {
    if (eventBorder.style.borderRightColor) {
      eventBorder.style.borderRightColor = color;
    } else if (eventBorder.style.borderLeftColor) {
      eventBorder.style.borderLeftColor = color;
    }
  }
}


// Check storage usage
chrome.storage.sync.getBytesInUse(null, function(bytesUsed) {
  console.log("Storage used: " + bytesUsed + " bytes");
});
