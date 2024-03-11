/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/colour.jsx ***!
  \************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// --- Observers --- //
var calendarObserver = new MutationObserver(function (mutationsList) {
  mutationsList.forEach(function (mutation) {
    updateEventColorsFromStorage();
  });
});
var calendarObserverConfig = {
  childList: true,
  subtree: true
};
calendarObserver.observe(document, calendarObserverConfig);
var targetElement = document.getElementById("yDmH0d");
calendarObserver.observe(targetElement, calendarObserverConfig);

// --- Functions --- //
function updateEventColorsFromStorage() {
  chrome.storage.local.get(null, function (items) {
    for (var eventId in items) {
      var color = items[eventId];
      if (color && eventId != 'colorPalette') {
        changeSingleEventColor(eventId, color);
      }
    }
  });
}
function changeSingleEventColor(eventId, color) {
  var eventWrapperElements = document.querySelectorAll("[data-eventid=\"".concat(eventId, "\"]"));
  if (eventWrapperElements) {
    eventWrapperElements.forEach(function (eventWrapperElement) {
      updateColorOfEventElement(eventWrapperElement, color);
    });
  }
}
function updateColorOfEventElement(eventWrapperElement, color) {
  var elements = [eventWrapperElement].concat(_toConsumableArray(eventWrapperElement.querySelectorAll('*')));
  var stylesToChange = ['backgroundColor', 'borderColor', 'borderLeftColor', 'borderRightColor'];
  var _iterator = _createForOfIteratorHelper(elements),
    _step;
  try {
    var _loop = function _loop() {
      var element = _step.value;
      stylesToChange.forEach(function (style) {
        if (element.style[style]) {
          element.style[style] = color;
        }
      });
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3VyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBTUEsZ0JBQWdCLEdBQUcsSUFBSUMsZ0JBQWdCLENBQUMsVUFBQ0MsYUFBYSxFQUFLO0VBQy9EQSxhQUFhLENBQUNDLE9BQU8sQ0FBQyxVQUFDQyxRQUFRLEVBQUs7SUFDbENDLDRCQUE0QixDQUFDLENBQUM7RUFDaEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsSUFBTUMsc0JBQXNCLEdBQUc7RUFDN0JDLFNBQVMsRUFBRSxJQUFJO0VBQ2ZDLE9BQU8sRUFBRTtBQUNYLENBQUM7QUFFRFIsZ0JBQWdCLENBQUNTLE9BQU8sQ0FBQ0MsUUFBUSxFQUFFSixzQkFBc0IsQ0FBQztBQUUxRCxJQUFNSyxhQUFhLEdBQUdELFFBQVEsQ0FBQ0UsY0FBYyxDQUFDLFFBQVEsQ0FBQztBQUN2RFosZ0JBQWdCLENBQUNTLE9BQU8sQ0FBQ0UsYUFBYSxFQUFFTCxzQkFBc0IsQ0FBQzs7QUFFL0Q7QUFDQSxTQUFTRCw0QkFBNEJBLENBQUEsRUFBRztFQUN0Q1EsTUFBTSxDQUFDQyxPQUFPLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDQyxLQUFLLEVBQUs7SUFDeEMsS0FBSyxJQUFNQyxPQUFPLElBQUlELEtBQUssRUFBRTtNQUMzQixJQUFNRSxLQUFLLEdBQUdGLEtBQUssQ0FBQ0MsT0FBTyxDQUFDO01BQzVCLElBQUlDLEtBQUssSUFBSUQsT0FBTyxJQUFJLGNBQWMsRUFBRTtRQUN0Q0Usc0JBQXNCLENBQUNGLE9BQU8sRUFBRUMsS0FBSyxDQUFDO01BQ3hDO0lBQ0Y7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVBLFNBQVNDLHNCQUFzQkEsQ0FBQ0YsT0FBTyxFQUFFQyxLQUFLLEVBQUU7RUFDOUMsSUFBTUUsb0JBQW9CLEdBQUdYLFFBQVEsQ0FBQ1ksZ0JBQWdCLG9CQUFBQyxNQUFBLENBQ2xDTCxPQUFPLFFBQzNCLENBQUM7RUFFRCxJQUFJRyxvQkFBb0IsRUFBRTtJQUN4QkEsb0JBQW9CLENBQUNsQixPQUFPLENBQUMsVUFBQ3FCLG1CQUFtQixFQUFLO01BQ3BEQyx5QkFBeUIsQ0FBQ0QsbUJBQW1CLEVBQUVMLEtBQUssQ0FBQztJQUN2RCxDQUFDLENBQUM7RUFDSjtBQUNGO0FBRUEsU0FBU00seUJBQXlCQSxDQUFDRCxtQkFBbUIsRUFBRUwsS0FBSyxFQUFFO0VBQzdELElBQU1PLFFBQVEsSUFBSUYsbUJBQW1CLEVBQUFELE1BQUEsQ0FBQUksa0JBQUEsQ0FBS0gsbUJBQW1CLENBQUNGLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFDO0VBQ3BGLElBQU1NLGNBQWMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQztFQUFDLElBQUFDLFNBQUEsR0FBQUMsMEJBQUEsQ0FFN0VKLFFBQVE7SUFBQUssS0FBQTtFQUFBO0lBQUEsSUFBQUMsS0FBQSxZQUFBQSxNQUFBLEVBQUU7TUFBQSxJQUFyQkMsT0FBTyxHQUFBRixLQUFBLENBQUFHLEtBQUE7TUFDZE4sY0FBYyxDQUFDekIsT0FBTyxDQUFDLFVBQUFnQyxLQUFLLEVBQUk7UUFDOUIsSUFBSUYsT0FBTyxDQUFDRSxLQUFLLENBQUNBLEtBQUssQ0FBQyxFQUFFO1VBQ3hCRixPQUFPLENBQUNFLEtBQUssQ0FBQ0EsS0FBSyxDQUFDLEdBQUdoQixLQUFLO1FBQzlCO01BQ0YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQU5ELEtBQUFVLFNBQUEsQ0FBQU8sQ0FBQSxNQUFBTCxLQUFBLEdBQUFGLFNBQUEsQ0FBQVEsQ0FBQSxJQUFBQyxJQUFBO01BQUFOLEtBQUE7SUFBQTtFQU1DLFNBQUFPLEdBQUE7SUFBQVYsU0FBQSxDQUFBVyxDQUFBLENBQUFELEdBQUE7RUFBQTtJQUFBVixTQUFBLENBQUFZLENBQUE7RUFBQTtBQUNILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nY2FsLWh1ZS8uL3NyYy9jb2xvdXIuanN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLSBPYnNlcnZlcnMgLS0tIC8vXHJcbmNvbnN0IGNhbGVuZGFyT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zTGlzdCkgPT4ge1xyXG4gIG11dGF0aW9uc0xpc3QuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgIHVwZGF0ZUV2ZW50Q29sb3JzRnJvbVN0b3JhZ2UoKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5jb25zdCBjYWxlbmRhck9ic2VydmVyQ29uZmlnID0ge1xyXG4gIGNoaWxkTGlzdDogdHJ1ZSxcclxuICBzdWJ0cmVlOiB0cnVlLFxyXG59O1xyXG5cclxuY2FsZW5kYXJPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCBjYWxlbmRhck9ic2VydmVyQ29uZmlnKTtcclxuXHJcbmNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInlEbUgwZFwiKTtcclxuY2FsZW5kYXJPYnNlcnZlci5vYnNlcnZlKHRhcmdldEVsZW1lbnQsIGNhbGVuZGFyT2JzZXJ2ZXJDb25maWcpO1xyXG5cclxuLy8gLS0tIEZ1bmN0aW9ucyAtLS0gLy9cclxuZnVuY3Rpb24gdXBkYXRlRXZlbnRDb2xvcnNGcm9tU3RvcmFnZSgpIHtcclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQobnVsbCwgKGl0ZW1zKSA9PiB7XHJcbiAgICBmb3IgKGNvbnN0IGV2ZW50SWQgaW4gaXRlbXMpIHtcclxuICAgICAgY29uc3QgY29sb3IgPSBpdGVtc1tldmVudElkXTtcclxuICAgICAgaWYgKGNvbG9yICYmIGV2ZW50SWQgIT0gJ2NvbG9yUGFsZXR0ZScpIHtcclxuICAgICAgICBjaGFuZ2VTaW5nbGVFdmVudENvbG9yKGV2ZW50SWQsIGNvbG9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VTaW5nbGVFdmVudENvbG9yKGV2ZW50SWQsIGNvbG9yKSB7XHJcbiAgY29uc3QgZXZlbnRXcmFwcGVyRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgYFtkYXRhLWV2ZW50aWQ9XCIke2V2ZW50SWR9XCJdYFxyXG4gICk7XHJcblxyXG4gIGlmIChldmVudFdyYXBwZXJFbGVtZW50cykge1xyXG4gICAgZXZlbnRXcmFwcGVyRWxlbWVudHMuZm9yRWFjaCgoZXZlbnRXcmFwcGVyRWxlbWVudCkgPT4ge1xyXG4gICAgICB1cGRhdGVDb2xvck9mRXZlbnRFbGVtZW50KGV2ZW50V3JhcHBlckVsZW1lbnQsIGNvbG9yKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQ29sb3JPZkV2ZW50RWxlbWVudChldmVudFdyYXBwZXJFbGVtZW50LCBjb2xvcikge1xyXG4gIGNvbnN0IGVsZW1lbnRzID0gW2V2ZW50V3JhcHBlckVsZW1lbnQsIC4uLmV2ZW50V3JhcHBlckVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnKicpXTtcclxuICBjb25zdCBzdHlsZXNUb0NoYW5nZSA9IFsnYmFja2dyb3VuZENvbG9yJywgJ2JvcmRlckNvbG9yJywgJ2JvcmRlckxlZnRDb2xvcicsICdib3JkZXJSaWdodENvbG9yJ107XHJcblxyXG4gIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcclxuICAgIHN0eWxlc1RvQ2hhbmdlLmZvckVhY2goc3R5bGUgPT4ge1xyXG4gICAgICBpZiAoZWxlbWVudC5zdHlsZVtzdHlsZV0pIHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlW3N0eWxlXSA9IGNvbG9yO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImNhbGVuZGFyT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zTGlzdCIsImZvckVhY2giLCJtdXRhdGlvbiIsInVwZGF0ZUV2ZW50Q29sb3JzRnJvbVN0b3JhZ2UiLCJjYWxlbmRhck9ic2VydmVyQ29uZmlnIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsIm9ic2VydmUiLCJkb2N1bWVudCIsInRhcmdldEVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNocm9tZSIsInN0b3JhZ2UiLCJsb2NhbCIsImdldCIsIml0ZW1zIiwiZXZlbnRJZCIsImNvbG9yIiwiY2hhbmdlU2luZ2xlRXZlbnRDb2xvciIsImV2ZW50V3JhcHBlckVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImNvbmNhdCIsImV2ZW50V3JhcHBlckVsZW1lbnQiLCJ1cGRhdGVDb2xvck9mRXZlbnRFbGVtZW50IiwiZWxlbWVudHMiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJzdHlsZXNUb0NoYW5nZSIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJfbG9vcCIsImVsZW1lbnQiLCJ2YWx1ZSIsInN0eWxlIiwicyIsIm4iLCJkb25lIiwiZXJyIiwiZSIsImYiXSwic291cmNlUm9vdCI6IiJ9