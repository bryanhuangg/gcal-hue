// -- Inject CSS into the DOM -- //
const eventBarClass = ".g3dbUc";
function changeCalendarEventColor() {
  const eventIdToSelect =
    "MjAyMzEwMDlfN2tqdHBrdDNoZGd2Mmc3OHJ2MXIzcGkxcDAgZW4uY2FuYWRpYW4ub2ZmaWNpYWwjaG9saWRheUB2";
  const eventWrapperElement = document.querySelector(
    `[data-eventid="${eventIdToSelect}"]`
  );

  if (eventWrapperElement) {
    const eventElement = eventWrapperElement.querySelector(eventBarClass);

    if (eventElement) {
      eventElement.style.backgroundColor = "orange";
    } else {
      console.log("Child element not found");
    }
  } else {
    console.log("Wrapper element not found");
  }
}

const colorChangeObserverConfig = {
  childList: true,
  subtree: true,
};
const colorChangeObserver = new MutationObserver(changeCalendarEventColor);
colorChangeObserver.observe(document, colorChangeObserverConfig);



// --- Inject button into the DOM --- //
function injectButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Change Event Color";
    buttonElement.style.margin = "5px"; 
    buttonElement.addEventListener("click", () => {
      changeCalendarEventColor(); 
    });
    const parentElement = document.querySelector('[jsname="hklcae"]');
  
    if (parentElement) {
      if (!parentElement.querySelector("button")) {
        parentElement.appendChild(buttonElement);
      }
    } else {
      console.log("Parent element not found");
    }
  }
  
  const buttonObserverConfig = {
    childList: true,
    subtree: true, 
  };
  
  const buttonObserver = new MutationObserver(injectButton);
  buttonObserver.observe(document, buttonObserverConfig);

  