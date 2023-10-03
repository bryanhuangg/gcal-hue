document.addEventListener('DOMContentLoaded', function () {
    const eventColorInput = document.getElementById('event-color');
    const saveButton = document.getElementById('save-button');
  
    // Load the saved color (if any)
    chrome.storage.sync.get('eventColor', function (data) {
      const savedColor = data.eventColor;
      if (savedColor) {
        eventColorInput.value = savedColor;
      }
    });
  
    eventColorInput.addEventListener('input', function () {
      // Handle color change preview if needed
    });
  
    saveButton.addEventListener('click', function () {
      const selectedColor = eventColorInput.value;
      chrome.storage.sync.set({ 'eventColor': selectedColor }, function () {
        console.log('Color saved:', selectedColor);
      });
    });
  });
  