// --- Inject button into the DOM --- //
const paletteObserverConfig = {
  childList: true,
  subtree: true,
};

const paletteObserver = new MutationObserver(injectColorPalette);
paletteObserver.observe(document, paletteObserverConfig);


function injectColorPalette(mutationsList, observer) {
  if (document.querySelector('.colorDivGroup')) return;
  observer.disconnect();

  chrome.storage.local.get(["colorPalette"], function (result) {
    if (result.colorPalette) {
      const validColors = result.colorPalette.filter(color => /^#([0-9A-F]{3}){1,2}$/i.test(color));

      // Find the parent color selector div
      const parentDiv = document.querySelector('.B7PAmc.ztKZ3d');
      if (parentDiv) {
        const innerDiv = parentDiv.querySelector('div');
        if (innerDiv) {
          let colorDivGroup = document.createElement('div');
          colorDivGroup.className = 'vbVGZb colorDivGroup';

          validColors.forEach((color, index) => {
            // Create the Ly0WL HTML for each color
            const ly0WLHTML = `<div jsname="Ly0WL" jsaction="click:rhcxd; keydown:Hq2uPe; focus:htbtNd" tabindex="0" role="menuitem" class="A1wrjc kQuqUe pka1xd" data-color="${color}" data-color-index="-1" aria-label="Color, set event color" style="background-color: ${color};"><i class="google-material-icons meh4fc hggPq lLCaB M8B6kc" aria-hidden="true">bigtop_done</i><div class="oMnJrf" aria-hidden="true" jscontroller="eg8UTd" jsaction="focus: eGiyHb;mouseenter: eGiyHb; touchstart: eGiyHb" data-text="Color" data-tooltip-position="top" data-tooltip-vertical-offset="0" data-tooltip-horizontal-offset="0" data-tooltip-only-if-necessary="false"></div></div>`;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = ly0WLHTML;
            colorDivGroup.appendChild(tempDiv.firstChild);

            // Every 6 colors, append the colorDivGroup to the innerDiv and create a new colorDivGroup
            if ((index + 1) % 6 === 0) {
              innerDiv.appendChild(colorDivGroup);
              colorDivGroup = document.createElement('div');
              colorDivGroup.className = 'vbVGZb colorDivGroup';
            }
          });

          // If there are any remaining colors, append the colorDivGroup to the innerDiv
          if (validColors.length % 6 !== 0) {
            innerDiv.appendChild(colorDivGroup);
          }
        }
      }
    }
    observer.observe(document, paletteObserverConfig);
  });
}

function hideCheckmarkIcon(parentElement) {
  const existingIconElement = parentElement.querySelector(
    ".google-material-icons.meh4fc.hggPq.lLCaB.M8B6kc.eO2Zfd"
  );
  if (existingIconElement) {
    existingIconElement.className =
      "google-material-icons meh4fc hggPq lLCaB M8B6kc";
  }
}

function findParentDataEventId(element) {
  while (element && !element.getAttribute("data-eid")) {
    element = element.parentElement;
  }
  return element;
}
