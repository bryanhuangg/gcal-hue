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
              chrome.storage.sync.set(_defineProperty({}, eventId, color));
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
                chrome.storage.sync.remove(eventId);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDVCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtnQkFDekMsSUFBTUMsT0FBTyxHQUFHQyxxQkFBcUIsQ0FBQ08sVUFBVSxDQUFDLENBQUNOLFlBQVksQ0FBQyxVQUFVLENBQUM7Z0JBQzFFM0IsTUFBTSxDQUFDQyxPQUFPLENBQUMyQixJQUFJLENBQUNPLE1BQU0sQ0FBQ1YsT0FBTyxDQUFDO2NBQ3JDLENBQUMsQ0FBQztZQUNKO1VBQ0YsQ0FBQyxDQUFDO1VBRUYsSUFBSW5CLFdBQVcsQ0FBQzhCLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hDekIsUUFBUSxDQUFDWSxXQUFXLENBQUNYLGFBQWEsQ0FBQztVQUNyQztRQUNGO01BQ0Y7SUFDRjtJQUNBZixRQUFRLENBQUNILE9BQU8sQ0FBQ0MsUUFBUSxFQUFFUCxxQkFBcUIsQ0FBQztFQUNuRCxDQUFDLENBQUM7QUFDSjtBQUVBLFNBQVM4QyxpQkFBaUJBLENBQUNHLGFBQWEsRUFBRTtFQUN4QyxJQUFNQyxtQkFBbUIsR0FBR0QsYUFBYSxDQUFDdkMsYUFBYSxDQUNyRCx5REFDRixDQUFDO0VBQ0QsSUFBSXdDLG1CQUFtQixFQUFFO0lBQ3ZCQSxtQkFBbUIsQ0FBQ3hCLFNBQVMsR0FDM0IsaURBQWlEO0VBQ3JEO0FBQ0Y7QUFFQSxTQUFTWSxxQkFBcUJBLENBQUNhLE9BQU8sRUFBRTtFQUN0QyxPQUFPQSxPQUFPLElBQUksQ0FBQ0EsT0FBTyxDQUFDWixZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7SUFDbkRZLE9BQU8sR0FBR0EsT0FBTyxDQUFDRixhQUFhO0VBQ2pDO0VBQ0EsT0FBT0UsT0FBTztBQUNoQixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2NhbC1odWUvLi9zcmMvc2VsZWN0b3IuanN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLSBJbmplY3QgYnV0dG9uIGludG8gdGhlIERPTSAtLS0gLy9cclxuY29uc3QgcGFsZXR0ZU9ic2VydmVyQ29uZmlnID0ge1xyXG4gIGNoaWxkTGlzdDogdHJ1ZSxcclxuICBzdWJ0cmVlOiB0cnVlLFxyXG59O1xyXG5cclxuY29uc3QgcGFsZXR0ZU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoaW5qZWN0Q29sb3JQYWxldHRlKTtcclxucGFsZXR0ZU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHBhbGV0dGVPYnNlcnZlckNvbmZpZyk7XHJcblxyXG5mdW5jdGlvbiBpbmplY3RDb2xvclBhbGV0dGUobXV0YXRpb25zTGlzdCwgb2JzZXJ2ZXIpIHtcclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG9yRGl2R3JvdXAnKSkgcmV0dXJuO1xyXG4gIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuXHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcImNvbG9yUGFsZXR0ZVwiXSwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgaWYgKHJlc3VsdC5jb2xvclBhbGV0dGUpIHtcclxuICAgICAgY29uc3QgdmFsaWRDb2xvcnMgPSByZXN1bHQuY29sb3JQYWxldHRlLmZpbHRlcihjb2xvciA9PiAvXiMoWzAtOUEtRl17M30pezEsMn0kL2kudGVzdChjb2xvcikpO1xyXG4gICAgICAvLyBGaW5kIHRoZSBwYXJlbnQgY29sb3Igc2VsZWN0b3IgZGl2XHJcbiAgICAgIGNvbnN0IHBhcmVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5CN1BBbWMuenRLWjNkJyk7XHJcbiAgICAgIGlmIChwYXJlbnREaXYpIHtcclxuICAgICAgICBjb25zdCBpbm5lckRpdiA9IHBhcmVudERpdi5xdWVyeVNlbGVjdG9yKCdkaXYnKTtcclxuICAgICAgICBpZiAoaW5uZXJEaXYpIHtcclxuICAgICAgICAgIGxldCBjb2xvckRpdkdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICBjb2xvckRpdkdyb3VwLmNsYXNzTmFtZSA9ICd2YlZHWmIgY29sb3JEaXZHcm91cCc7XHJcblxyXG4gICAgICAgICAgdmFsaWRDb2xvcnMuZm9yRWFjaCgoY29sb3IsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgTHkwV0wgSFRNTCBmb3IgZWFjaCBjb2xvci4gQWxsIGN1c3RvbSBMeTBXTCBlbGVtZW50cyBoYXZlIGV2ZW50LWNvbG9yLWluZGV4ID0gXCJodWVcIi5cclxuICAgICAgICAgICAgY29uc3QgbHkwV0xIVE1MID0gYDxkaXYganNuYW1lPVwiTHkwV0xcIiBqc2FjdGlvbj1cImNsaWNrOnJoY3hkOyBrZXlkb3duOkhxMnVQZTsgZm9jdXM6aHRidE5kXCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cIm1lbnVpdGVtXCIgY2xhc3M9XCJBMXdyamMga1F1cVVlIHBrYTF4ZFwiIGRhdGEtY29sb3I9XCIke2NvbG9yfVwiIGRhdGEtY29sb3ItaW5kZXg9XCJodWVcIiBhcmlhLWxhYmVsPVwiQ29sb3IsIHNldCBldmVudCBjb2xvclwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07XCI+PGkgY2xhc3M9XCJnb29nbGUtbWF0ZXJpYWwtaWNvbnMgbWVoNGZjIGhnZ1BxIGxMQ2FCIE04QjZrY1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPmJpZ3RvcF9kb25lPC9pPjxkaXYgY2xhc3M9XCJvTW5KcmZcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBqc2NvbnRyb2xsZXI9XCJlZzhVVGRcIiBqc2FjdGlvbj1cImZvY3VzOiBlR2l5SGI7bW91c2VlbnRlcjogZUdpeUhiOyB0b3VjaHN0YXJ0OiBlR2l5SGJcIiBkYXRhLXRleHQ9XCJDb2xvclwiIGRhdGEtdG9vbHRpcC1wb3NpdGlvbj1cInRvcFwiIGRhdGEtdG9vbHRpcC12ZXJ0aWNhbC1vZmZzZXQ9XCIwXCIgZGF0YS10b29sdGlwLWhvcml6b250YWwtb2Zmc2V0PVwiMFwiIGRhdGEtdG9vbHRpcC1vbmx5LWlmLW5lY2Vzc2FyeT1cImZhbHNlXCI+PC9kaXY+PC9kaXY+YDtcclxuICAgICAgICAgICAgY29uc3QgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0ZW1wRGl2LmlubmVySFRNTCA9IGx5MFdMSFRNTDtcclxuICAgICAgICAgICAgY29uc3QgY29sb3JFbGVtZW50ID0gdGVtcERpdi5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICBjb2xvckRpdkdyb3VwLmFwcGVuZENoaWxkKGNvbG9yRWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgY2xpY2sgZXZlbnQgdG8gdGhlIGNvbG9yIGVsZW1lbnRcclxuICAgICAgICAgICAgY29sb3JFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGV2ZW50SWQgPSBmaW5kUGFyZW50RGF0YUV2ZW50SWQoY29sb3JFbGVtZW50KS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZWlkJyk7XHJcbiAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBbZXZlbnRJZF06IGNvbG9yIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRXZlcnkgNiBjb2xvcnMsIGFwcGVuZCB0aGUgY29sb3JEaXZHcm91cCB0byB0aGUgaW5uZXJEaXYgYW5kIGNyZWF0ZSBhIG5ldyBjb2xvckRpdkdyb3VwXHJcbiAgICAgICAgICAgIGlmICgoaW5kZXggKyAxKSAlIDYgPT09IDApIHtcclxuICAgICAgICAgICAgICBpbm5lckRpdi5hcHBlbmRDaGlsZChjb2xvckRpdkdyb3VwKTtcclxuICAgICAgICAgICAgICBjb2xvckRpdkdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgY29sb3JEaXZHcm91cC5jbGFzc05hbWUgPSAndmJWR1piIGNvbG9yRGl2R3JvdXAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBjb25zdCBkaXZFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdltqc25hbWU9XCJMeTBXTFwiXScpO1xyXG4gICAgICAgICAgZGl2RWxlbWVudHMuZm9yRWFjaCgoZGl2RWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBoaWRlQ2hlY2ttYXJrSWNvbihkaXZFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKGRpdkVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbG9yLWluZGV4JykgIT09ICdodWUnKSB7XHJcbiAgICAgICAgICAgICAgZGl2RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50SWQgPSBmaW5kUGFyZW50RGF0YUV2ZW50SWQoZGl2RWxlbWVudCkuZ2V0QXR0cmlidXRlKCdkYXRhLWVpZCcpO1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5yZW1vdmUoZXZlbnRJZCk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmICh2YWxpZENvbG9ycy5sZW5ndGggJSA2ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlubmVyRGl2LmFwcGVuZENoaWxkKGNvbG9yRGl2R3JvdXApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwgcGFsZXR0ZU9ic2VydmVyQ29uZmlnKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZUNoZWNrbWFya0ljb24ocGFyZW50RWxlbWVudCkge1xyXG4gIGNvbnN0IGV4aXN0aW5nSWNvbkVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICBcIi5nb29nbGUtbWF0ZXJpYWwtaWNvbnMubWVoNGZjLmhnZ1BxLmxMQ2FCLk04QjZrYy5lTzJaZmRcIlxyXG4gICk7XHJcbiAgaWYgKGV4aXN0aW5nSWNvbkVsZW1lbnQpIHtcclxuICAgIGV4aXN0aW5nSWNvbkVsZW1lbnQuY2xhc3NOYW1lID1cclxuICAgICAgXCJnb29nbGUtbWF0ZXJpYWwtaWNvbnMgbWVoNGZjIGhnZ1BxIGxMQ2FCIE04QjZrY1wiO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFBhcmVudERhdGFFdmVudElkKGVsZW1lbnQpIHtcclxuICB3aGlsZSAoZWxlbWVudCAmJiAhZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWVpZFwiKSkge1xyXG4gICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICB9XHJcbiAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuIl0sIm5hbWVzIjpbInBhbGV0dGVPYnNlcnZlckNvbmZpZyIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJwYWxldHRlT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwiaW5qZWN0Q29sb3JQYWxldHRlIiwib2JzZXJ2ZSIsImRvY3VtZW50IiwibXV0YXRpb25zTGlzdCIsIm9ic2VydmVyIiwicXVlcnlTZWxlY3RvciIsImRpc2Nvbm5lY3QiLCJjaHJvbWUiLCJzdG9yYWdlIiwibG9jYWwiLCJnZXQiLCJyZXN1bHQiLCJjb2xvclBhbGV0dGUiLCJ2YWxpZENvbG9ycyIsImZpbHRlciIsImNvbG9yIiwidGVzdCIsInBhcmVudERpdiIsImlubmVyRGl2IiwiY29sb3JEaXZHcm91cCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJmb3JFYWNoIiwiaW5kZXgiLCJseTBXTEhUTUwiLCJjb25jYXQiLCJ0ZW1wRGl2IiwiaW5uZXJIVE1MIiwiY29sb3JFbGVtZW50IiwiZmlyc3RDaGlsZCIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50SWQiLCJmaW5kUGFyZW50RGF0YUV2ZW50SWQiLCJnZXRBdHRyaWJ1dGUiLCJzeW5jIiwic2V0IiwiX2RlZmluZVByb3BlcnR5IiwiZGl2RWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGl2RWxlbWVudCIsImhpZGVDaGVja21hcmtJY29uIiwicmVtb3ZlIiwibGVuZ3RoIiwicGFyZW50RWxlbWVudCIsImV4aXN0aW5nSWNvbkVsZW1lbnQiLCJlbGVtZW50Il0sInNvdXJjZVJvb3QiOiIifQ==