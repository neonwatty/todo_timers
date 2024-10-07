// Function to update the currently focused element
function updateFocus() {
  console.log("here we are");
  const focusedElement = document.activeElement;

  // Display the ID of the currently focused element
  const pattern = /^my-timer-\d+$/;

  // Check if the focused element's ID matches the pattern
  if (pattern.test(focusedElement.id)) {
    const message = `Currently focused element ID: ${focusedElement.id}`;
    console.log(message);
  }
}

// Add event listeners for focus and blur events
document.addEventListener("focus", updateFocus, true);
document.addEventListener("blur", updateFocus, true);
