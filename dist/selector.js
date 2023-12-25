/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/selector.jsx ***!
  \**************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
            // Create the Ly0WL HTML for each color. All custom Ly0WL elements have event-color-index = "hue".
            var ly0WLHTML = "<div jsname=\"Ly0WL\" jsaction=\"click:rhcxd; keydown:Hq2uPe; focus:htbtNd\" tabindex=\"0\" role=\"menuitem\" class=\"A1wrjc kQuqUe pka1xd\" data-color=\"".concat(color, "\" data-color-index=\"hue\" aria-label=\"Color, set event color\" style=\"background-color: ").concat(color, ";\"><i class=\"google-material-icons meh4fc hggPq lLCaB M8B6kc\" aria-hidden=\"true\">bigtop_done</i><div class=\"oMnJrf\" aria-hidden=\"true\" jscontroller=\"eg8UTd\" jsaction=\"focus: eGiyHb;mouseenter: eGiyHb; touchstart: eGiyHb\" data-text=\"Color\" data-tooltip-position=\"top\" data-tooltip-vertical-offset=\"0\" data-tooltip-horizontal-offset=\"0\" data-tooltip-only-if-necessary=\"false\"></div></div>");
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = ly0WLHTML;
            var colorElement = tempDiv.firstChild;
            colorDivGroup.appendChild(colorElement);

            // Add click event to the color element
            colorElement.addEventListener('click', function () {
              var eventId = findParentDataEventId(colorElement).getAttribute('data-eid');
              chrome.storage.local.set(_defineProperty({}, eventId, color));
            });

            // Every 6 colors, append the colorDivGroup to the innerDiv and create a new colorDivGroup
            if ((index + 1) % 6 === 0) {
              innerDiv.appendChild(colorDivGroup);
              colorDivGroup = document.createElement('div');
              colorDivGroup.className = 'vbVGZb colorDivGroup';
            }
          });
          var divElements = document.querySelectorAll('div[jsname="Ly0WL"]');
          divElements.forEach(function (divElement) {
            hideCheckmarkIcon(divElement);
            if (divElement.getAttribute('data-color-index') !== 'hue') {
              divElement.addEventListener('click', function () {
                var eventId = findParentDataEventId(divElement).getAttribute('data-eid');
                chrome.storage.local.remove(eventId);
              });
            }
          });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNSLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO2dCQUN6QyxJQUFNQyxPQUFPLEdBQUdDLHFCQUFxQixDQUFDTSxVQUFVLENBQUMsQ0FBQ0wsWUFBWSxDQUFDLFVBQVUsQ0FBQztnQkFDMUUzQixNQUFNLENBQUNDLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDZ0MsTUFBTSxDQUFDVCxPQUFPLENBQUM7Y0FDdEMsQ0FBQyxDQUFDO1lBQ0o7VUFDRixDQUFDLENBQUM7VUFFRixJQUFJbkIsV0FBVyxDQUFDNkIsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEN4QixRQUFRLENBQUNZLFdBQVcsQ0FBQ1gsYUFBYSxDQUFDO1VBQ3JDO1FBQ0Y7TUFDRjtJQUNGO0lBQ0FmLFFBQVEsQ0FBQ0gsT0FBTyxDQUFDQyxRQUFRLEVBQUVQLHFCQUFxQixDQUFDO0VBQ25ELENBQUMsQ0FBQztBQUNKO0FBRUEsU0FBUzZDLGlCQUFpQkEsQ0FBQ0csYUFBYSxFQUFFO0VBQ3hDLElBQU1DLG1CQUFtQixHQUFHRCxhQUFhLENBQUN0QyxhQUFhLENBQ3JELHlEQUNGLENBQUM7RUFDRCxJQUFJdUMsbUJBQW1CLEVBQUU7SUFDdkJBLG1CQUFtQixDQUFDdkIsU0FBUyxHQUMzQixpREFBaUQ7RUFDckQ7QUFDRjtBQUVBLFNBQVNZLHFCQUFxQkEsQ0FBQ1ksT0FBTyxFQUFFO0VBQ3RDLE9BQU9BLE9BQU8sSUFBSSxDQUFDQSxPQUFPLENBQUNYLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtJQUNuRFcsT0FBTyxHQUFHQSxPQUFPLENBQUNGLGFBQWE7RUFDakM7RUFDQSxPQUFPRSxPQUFPO0FBQ2hCLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nY2FsLWh1ZS8uL3NyYy9zZWxlY3Rvci5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gLS0tIEluamVjdCBidXR0b24gaW50byB0aGUgRE9NIC0tLSAvL1xyXG5jb25zdCBwYWxldHRlT2JzZXJ2ZXJDb25maWcgPSB7XHJcbiAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gIHN1YnRyZWU6IHRydWUsXHJcbn07XHJcblxyXG5jb25zdCBwYWxldHRlT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihpbmplY3RDb2xvclBhbGV0dGUpO1xyXG5wYWxldHRlT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwgcGFsZXR0ZU9ic2VydmVyQ29uZmlnKTtcclxuXHJcbmZ1bmN0aW9uIGluamVjdENvbG9yUGFsZXR0ZShtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikge1xyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3JEaXZHcm91cCcpKSByZXR1cm47XHJcbiAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG5cclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1wiY29sb3JQYWxldHRlXCJdLCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICBpZiAocmVzdWx0LmNvbG9yUGFsZXR0ZSkge1xyXG4gICAgICBjb25zdCB2YWxpZENvbG9ycyA9IHJlc3VsdC5jb2xvclBhbGV0dGUuZmlsdGVyKGNvbG9yID0+IC9eIyhbMC05QS1GXXszfSl7MSwyfSQvaS50ZXN0KGNvbG9yKSk7XHJcbiAgICAgIC8vIEZpbmQgdGhlIHBhcmVudCBjb2xvciBzZWxlY3RvciBkaXZcclxuICAgICAgY29uc3QgcGFyZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkI3UEFtYy56dEtaM2QnKTtcclxuICAgICAgaWYgKHBhcmVudERpdikge1xyXG4gICAgICAgIGNvbnN0IGlubmVyRGl2ID0gcGFyZW50RGl2LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpO1xyXG4gICAgICAgIGlmIChpbm5lckRpdikge1xyXG4gICAgICAgICAgbGV0IGNvbG9yRGl2R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgIGNvbG9yRGl2R3JvdXAuY2xhc3NOYW1lID0gJ3ZiVkdaYiBjb2xvckRpdkdyb3VwJztcclxuXHJcbiAgICAgICAgICB2YWxpZENvbG9ycy5mb3JFYWNoKChjb2xvciwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBMeTBXTCBIVE1MIGZvciBlYWNoIGNvbG9yLiBBbGwgY3VzdG9tIEx5MFdMIGVsZW1lbnRzIGhhdmUgZXZlbnQtY29sb3ItaW5kZXggPSBcImh1ZVwiLlxyXG4gICAgICAgICAgICBjb25zdCBseTBXTEhUTUwgPSBgPGRpdiBqc25hbWU9XCJMeTBXTFwiIGpzYWN0aW9uPVwiY2xpY2s6cmhjeGQ7IGtleWRvd246SHEydVBlOyBmb2N1czpodGJ0TmRcIiB0YWJpbmRleD1cIjBcIiByb2xlPVwibWVudWl0ZW1cIiBjbGFzcz1cIkExd3JqYyBrUXVxVWUgcGthMXhkXCIgZGF0YS1jb2xvcj1cIiR7Y29sb3J9XCIgZGF0YS1jb2xvci1pbmRleD1cImh1ZVwiIGFyaWEtbGFiZWw9XCJDb2xvciwgc2V0IGV2ZW50IGNvbG9yXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTtcIj48aSBjbGFzcz1cImdvb2dsZS1tYXRlcmlhbC1pY29ucyBtZWg0ZmMgaGdnUHEgbExDYUIgTThCNmtjXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+YmlndG9wX2RvbmU8L2k+PGRpdiBjbGFzcz1cIm9NbkpyZlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGpzY29udHJvbGxlcj1cImVnOFVUZFwiIGpzYWN0aW9uPVwiZm9jdXM6IGVHaXlIYjttb3VzZWVudGVyOiBlR2l5SGI7IHRvdWNoc3RhcnQ6IGVHaXlIYlwiIGRhdGEtdGV4dD1cIkNvbG9yXCIgZGF0YS10b29sdGlwLXBvc2l0aW9uPVwidG9wXCIgZGF0YS10b29sdGlwLXZlcnRpY2FsLW9mZnNldD1cIjBcIiBkYXRhLXRvb2x0aXAtaG9yaXpvbnRhbC1vZmZzZXQ9XCIwXCIgZGF0YS10b29sdGlwLW9ubHktaWYtbmVjZXNzYXJ5PVwiZmFsc2VcIj48L2Rpdj48L2Rpdj5gO1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gbHkwV0xIVE1MO1xyXG4gICAgICAgICAgICBjb25zdCBjb2xvckVsZW1lbnQgPSB0ZW1wRGl2LmZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgICAgIGNvbG9yRGl2R3JvdXAuYXBwZW5kQ2hpbGQoY29sb3JFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBjbGljayBldmVudCB0byB0aGUgY29sb3IgZWxlbWVudFxyXG4gICAgICAgICAgICBjb2xvckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgZXZlbnRJZCA9IGZpbmRQYXJlbnREYXRhRXZlbnRJZChjb2xvckVsZW1lbnQpLmdldEF0dHJpYnV0ZSgnZGF0YS1laWQnKTtcclxuICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBbZXZlbnRJZF06IGNvbG9yIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRXZlcnkgNiBjb2xvcnMsIGFwcGVuZCB0aGUgY29sb3JEaXZHcm91cCB0byB0aGUgaW5uZXJEaXYgYW5kIGNyZWF0ZSBhIG5ldyBjb2xvckRpdkdyb3VwXHJcbiAgICAgICAgICAgIGlmICgoaW5kZXggKyAxKSAlIDYgPT09IDApIHtcclxuICAgICAgICAgICAgICBpbm5lckRpdi5hcHBlbmRDaGlsZChjb2xvckRpdkdyb3VwKTtcclxuICAgICAgICAgICAgICBjb2xvckRpdkdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgY29sb3JEaXZHcm91cC5jbGFzc05hbWUgPSAndmJWR1piIGNvbG9yRGl2R3JvdXAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBjb25zdCBkaXZFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltqc25hbWU9XCJMeTBXTFwiXScpO1xyXG4gICAgICAgICAgZGl2RWxlbWVudHMuZm9yRWFjaCgoZGl2RWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBoaWRlQ2hlY2ttYXJrSWNvbihkaXZFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKGRpdkVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbG9yLWluZGV4JykgIT09ICdodWUnKSB7XHJcbiAgICAgICAgICAgICAgZGl2RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50SWQgPSBmaW5kUGFyZW50RGF0YUV2ZW50SWQoZGl2RWxlbWVudCkuZ2V0QXR0cmlidXRlKCdkYXRhLWVpZCcpO1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKGV2ZW50SWQpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAodmFsaWRDb2xvcnMubGVuZ3RoICUgNiAhPT0gMCkge1xyXG4gICAgICAgICAgICBpbm5lckRpdi5hcHBlbmRDaGlsZChjb2xvckRpdkdyb3VwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHBhbGV0dGVPYnNlcnZlckNvbmZpZyk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVDaGVja21hcmtJY29uKHBhcmVudEVsZW1lbnQpIHtcclxuICBjb25zdCBleGlzdGluZ0ljb25FbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgXCIuZ29vZ2xlLW1hdGVyaWFsLWljb25zLm1laDRmYy5oZ2dQcS5sTENhQi5NOEI2a2MuZU8yWmZkXCJcclxuICApO1xyXG4gIGlmIChleGlzdGluZ0ljb25FbGVtZW50KSB7XHJcbiAgICBleGlzdGluZ0ljb25FbGVtZW50LmNsYXNzTmFtZSA9XHJcbiAgICAgIFwiZ29vZ2xlLW1hdGVyaWFsLWljb25zIG1laDRmYyBoZ2dQcSBsTENhQiBNOEI2a2NcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRQYXJlbnREYXRhRXZlbnRJZChlbGVtZW50KSB7XHJcbiAgd2hpbGUgKGVsZW1lbnQgJiYgIWVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1laWRcIikpIHtcclxuICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgfVxyXG4gIHJldHVybiBlbGVtZW50O1xyXG59XHJcbiJdLCJuYW1lcyI6WyJwYWxldHRlT2JzZXJ2ZXJDb25maWciLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwicGFsZXR0ZU9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsImluamVjdENvbG9yUGFsZXR0ZSIsIm9ic2VydmUiLCJkb2N1bWVudCIsIm11dGF0aW9uc0xpc3QiLCJvYnNlcnZlciIsInF1ZXJ5U2VsZWN0b3IiLCJkaXNjb25uZWN0IiwiY2hyb21lIiwic3RvcmFnZSIsImxvY2FsIiwiZ2V0IiwicmVzdWx0IiwiY29sb3JQYWxldHRlIiwidmFsaWRDb2xvcnMiLCJmaWx0ZXIiLCJjb2xvciIsInRlc3QiLCJwYXJlbnREaXYiLCJpbm5lckRpdiIsImNvbG9yRGl2R3JvdXAiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZm9yRWFjaCIsImluZGV4IiwibHkwV0xIVE1MIiwiY29uY2F0IiwidGVtcERpdiIsImlubmVySFRNTCIsImNvbG9yRWxlbWVudCIsImZpcnN0Q2hpbGQiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudElkIiwiZmluZFBhcmVudERhdGFFdmVudElkIiwiZ2V0QXR0cmlidXRlIiwic2V0IiwiX2RlZmluZVByb3BlcnR5IiwiZGl2RWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGl2RWxlbWVudCIsImhpZGVDaGVja21hcmtJY29uIiwicmVtb3ZlIiwibGVuZ3RoIiwicGFyZW50RWxlbWVudCIsImV4aXN0aW5nSWNvbkVsZW1lbnQiLCJlbGVtZW50Il0sInNvdXJjZVJvb3QiOiIifQ==