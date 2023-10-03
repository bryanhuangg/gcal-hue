console.log("GCal Hue Injected: content.js loaded");

function changeCalendarEventColor() {
  const eventIdToSelect =
    "MzIzMmM1a2RlZjc3NG40dm84OG5iYjBsZXQgYjJkMG83NGcwbWVyZzdkaWhoNGNnNDQ0cG9AZw";

  const eventWrapperElement = document.querySelector(
    `[data-eventid="${eventIdToSelect}"]`
  );

  if (eventWrapperElement) {
    const eventElement = eventWrapperElement.querySelector(".g3dbUc");

    if (eventElement) {
      eventElement.style.backgroundColor = "orange";
    } else {
      console.log("Child element not found");
    }
  } else {
    console.log("Wrapper element not found");
  }
}
 
const observerConfig = {
  childList: true, // Watch for changes to the structure of the DOM
  subtree: true, // Watch for changes in the entire subtree
};

const observer = new MutationObserver(changeCalendarColor);

observer.observe(document, observerConfig);
