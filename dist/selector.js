/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/selector.jsx ***!
  \**************************/
// --- Inject button into the DOM --- //
var paletteObserverConfig = {
  childList: true,
  subtree: true
};
var paletteObserver = new MutationObserver(injectColorPalette);
paletteObserver.observe(document, paletteObserverConfig);
function injectColorPalette(mutationsList, observer) {
  if (document.querySelector('.colorDivGroup')) return;
  observer.disconnect();
  chrome.storage.local.get(["colorPalette"], function (result) {
    if (result.colorPalette) {
      var validColors = result.colorPalette.filter(function (color) {
        return /^#([0-9A-F]{3}){1,2}$/i.test(color);
      });

      // Find the parent color selector div
      var parentDiv = document.querySelector('.B7PAmc.ztKZ3d');
      if (parentDiv) {
        var innerDiv = parentDiv.querySelector('div');
        if (innerDiv) {
          var colorDivGroup = document.createElement('div');
          colorDivGroup.className = 'vbVGZb colorDivGroup';
          validColors.forEach(function (color, index) {
            // Create the Ly0WL HTML for each color
            var ly0WLHTML = "<div jsname=\"Ly0WL\" jsaction=\"click:rhcxd; keydown:Hq2uPe; focus:htbtNd\" tabindex=\"0\" role=\"menuitem\" class=\"A1wrjc kQuqUe pka1xd\" data-color=\"".concat(color, "\" data-color-index=\"-1\" aria-label=\"Color, set event color\" style=\"background-color: ").concat(color, ";\"><i class=\"google-material-icons meh4fc hggPq lLCaB M8B6kc\" aria-hidden=\"true\">bigtop_done</i><div class=\"oMnJrf\" aria-hidden=\"true\" jscontroller=\"eg8UTd\" jsaction=\"focus: eGiyHb;mouseenter: eGiyHb; touchstart: eGiyHb\" data-text=\"Color\" data-tooltip-position=\"top\" data-tooltip-vertical-offset=\"0\" data-tooltip-horizontal-offset=\"0\" data-tooltip-only-if-necessary=\"false\"></div></div>");
            var tempDiv = document.createElement('div');
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
  var existingIconElement = parentElement.querySelector(".google-material-icons.meh4fc.hggPq.lLCaB.M8B6kc.eO2Zfd");
  if (existingIconElement) {
    existingIconElement.className = "google-material-icons meh4fc hggPq lLCaB M8B6kc";
  }
}
function findParentDataEventId(element) {
  while (element && !element.getAttribute("data-eid")) {
    element = element.parentElement;
  }
  return element;
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUdBLE9BQU8sQ0FBQ0gsYUFBYTtFQUNqQztFQUNBLE9BQU9HLE9BQU87QUFDaEIsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2djYWwtaHVlLy4vc3JjL3NlbGVjdG9yLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0gSW5qZWN0IGJ1dHRvbiBpbnRvIHRoZSBET00gLS0tIC8vXHJcbmNvbnN0IHBhbGV0dGVPYnNlcnZlckNvbmZpZyA9IHtcclxuICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgc3VidHJlZTogdHJ1ZSxcclxufTtcclxuXHJcbmNvbnN0IHBhbGV0dGVPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGluamVjdENvbG9yUGFsZXR0ZSk7XHJcbnBhbGV0dGVPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCBwYWxldHRlT2JzZXJ2ZXJDb25maWcpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGluamVjdENvbG9yUGFsZXR0ZShtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikge1xyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3JEaXZHcm91cCcpKSByZXR1cm47XHJcbiAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG5cclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1wiY29sb3JQYWxldHRlXCJdLCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICBpZiAocmVzdWx0LmNvbG9yUGFsZXR0ZSkge1xyXG4gICAgICBjb25zdCB2YWxpZENvbG9ycyA9IHJlc3VsdC5jb2xvclBhbGV0dGUuZmlsdGVyKGNvbG9yID0+IC9eIyhbMC05QS1GXXszfSl7MSwyfSQvaS50ZXN0KGNvbG9yKSk7XHJcblxyXG4gICAgICAvLyBGaW5kIHRoZSBwYXJlbnQgY29sb3Igc2VsZWN0b3IgZGl2XHJcbiAgICAgIGNvbnN0IHBhcmVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5CN1BBbWMuenRLWjNkJyk7XHJcbiAgICAgIGlmIChwYXJlbnREaXYpIHtcclxuICAgICAgICBjb25zdCBpbm5lckRpdiA9IHBhcmVudERpdi5xdWVyeVNlbGVjdG9yKCdkaXYnKTtcclxuICAgICAgICBpZiAoaW5uZXJEaXYpIHtcclxuICAgICAgICAgIGxldCBjb2xvckRpdkdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICBjb2xvckRpdkdyb3VwLmNsYXNzTmFtZSA9ICd2YlZHWmIgY29sb3JEaXZHcm91cCc7XHJcblxyXG4gICAgICAgICAgdmFsaWRDb2xvcnMuZm9yRWFjaCgoY29sb3IsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgTHkwV0wgSFRNTCBmb3IgZWFjaCBjb2xvclxyXG4gICAgICAgICAgICBjb25zdCBseTBXTEhUTUwgPSBgPGRpdiBqc25hbWU9XCJMeTBXTFwiIGpzYWN0aW9uPVwiY2xpY2s6cmhjeGQ7IGtleWRvd246SHEydVBlOyBmb2N1czpodGJ0TmRcIiB0YWJpbmRleD1cIjBcIiByb2xlPVwibWVudWl0ZW1cIiBjbGFzcz1cIkExd3JqYyBrUXVxVWUgcGthMXhkXCIgZGF0YS1jb2xvcj1cIiR7Y29sb3J9XCIgZGF0YS1jb2xvci1pbmRleD1cIi0xXCIgYXJpYS1sYWJlbD1cIkNvbG9yLCBzZXQgZXZlbnQgY29sb3JcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1wiPjxpIGNsYXNzPVwiZ29vZ2xlLW1hdGVyaWFsLWljb25zIG1laDRmYyBoZ2dQcSBsTENhQiBNOEI2a2NcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5iaWd0b3BfZG9uZTwvaT48ZGl2IGNsYXNzPVwib01uSnJmXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIganNjb250cm9sbGVyPVwiZWc4VVRkXCIganNhY3Rpb249XCJmb2N1czogZUdpeUhiO21vdXNlZW50ZXI6IGVHaXlIYjsgdG91Y2hzdGFydDogZUdpeUhiXCIgZGF0YS10ZXh0PVwiQ29sb3JcIiBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJ0b3BcIiBkYXRhLXRvb2x0aXAtdmVydGljYWwtb2Zmc2V0PVwiMFwiIGRhdGEtdG9vbHRpcC1ob3Jpem9udGFsLW9mZnNldD1cIjBcIiBkYXRhLXRvb2x0aXAtb25seS1pZi1uZWNlc3Nhcnk9XCJmYWxzZVwiPjwvZGl2PjwvZGl2PmA7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBseTBXTEhUTUw7XHJcbiAgICAgICAgICAgIGNvbG9yRGl2R3JvdXAuYXBwZW5kQ2hpbGQodGVtcERpdi5maXJzdENoaWxkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEV2ZXJ5IDYgY29sb3JzLCBhcHBlbmQgdGhlIGNvbG9yRGl2R3JvdXAgdG8gdGhlIGlubmVyRGl2IGFuZCBjcmVhdGUgYSBuZXcgY29sb3JEaXZHcm91cFxyXG4gICAgICAgICAgICBpZiAoKGluZGV4ICsgMSkgJSA2ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgaW5uZXJEaXYuYXBwZW5kQ2hpbGQoY29sb3JEaXZHcm91cCk7XHJcbiAgICAgICAgICAgICAgY29sb3JEaXZHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgIGNvbG9yRGl2R3JvdXAuY2xhc3NOYW1lID0gJ3ZiVkdaYiBjb2xvckRpdkdyb3VwJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIGFueSByZW1haW5pbmcgY29sb3JzLCBhcHBlbmQgdGhlIGNvbG9yRGl2R3JvdXAgdG8gdGhlIGlubmVyRGl2XHJcbiAgICAgICAgICBpZiAodmFsaWRDb2xvcnMubGVuZ3RoICUgNiAhPT0gMCkge1xyXG4gICAgICAgICAgICBpbm5lckRpdi5hcHBlbmRDaGlsZChjb2xvckRpdkdyb3VwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHBhbGV0dGVPYnNlcnZlckNvbmZpZyk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVDaGVja21hcmtJY29uKHBhcmVudEVsZW1lbnQpIHtcclxuICBjb25zdCBleGlzdGluZ0ljb25FbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgXCIuZ29vZ2xlLW1hdGVyaWFsLWljb25zLm1laDRmYy5oZ2dQcS5sTENhQi5NOEI2a2MuZU8yWmZkXCJcclxuICApO1xyXG4gIGlmIChleGlzdGluZ0ljb25FbGVtZW50KSB7XHJcbiAgICBleGlzdGluZ0ljb25FbGVtZW50LmNsYXNzTmFtZSA9XHJcbiAgICAgIFwiZ29vZ2xlLW1hdGVyaWFsLWljb25zIG1laDRmYyBoZ2dQcSBsTENhQiBNOEI2a2NcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRQYXJlbnREYXRhRXZlbnRJZChlbGVtZW50KSB7XHJcbiAgd2hpbGUgKGVsZW1lbnQgJiYgIWVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1laWRcIikpIHtcclxuICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgfVxyXG4gIHJldHVybiBlbGVtZW50O1xyXG59XHJcbiJdLCJuYW1lcyI6WyJwYWxldHRlT2JzZXJ2ZXJDb25maWciLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwicGFsZXR0ZU9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsImluamVjdENvbG9yUGFsZXR0ZSIsIm9ic2VydmUiLCJkb2N1bWVudCIsIm11dGF0aW9uc0xpc3QiLCJvYnNlcnZlciIsInF1ZXJ5U2VsZWN0b3IiLCJkaXNjb25uZWN0IiwiY2hyb21lIiwic3RvcmFnZSIsImxvY2FsIiwiZ2V0IiwicmVzdWx0IiwiY29sb3JQYWxldHRlIiwidmFsaWRDb2xvcnMiLCJmaWx0ZXIiLCJjb2xvciIsInRlc3QiLCJwYXJlbnREaXYiLCJpbm5lckRpdiIsImNvbG9yRGl2R3JvdXAiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZm9yRWFjaCIsImluZGV4IiwibHkwV0xIVE1MIiwiY29uY2F0IiwidGVtcERpdiIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwiZmlyc3RDaGlsZCIsImxlbmd0aCIsImhpZGVDaGVja21hcmtJY29uIiwicGFyZW50RWxlbWVudCIsImV4aXN0aW5nSWNvbkVsZW1lbnQiLCJmaW5kUGFyZW50RGF0YUV2ZW50SWQiLCJlbGVtZW50IiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==