const timerContainer = document.querySelector("#timers-inner-container");

let focusId;
let focusIdCounter = 0;

// Function to update the currently focused element
export function updateFocus() {
  const focusedElement = document.activeElement;

  // Display the ID of the currently focused element
  const pattern = /^my-timer-\d+$/;

  // Check if the focused element's ID matches the pattern
  if (focusIdCounter === 0) {
    focusId = null;
  } else {
    focusIdCounter = 0;
    let usableFocusId = focusId;
    focusId = null;
    return usableFocusId;
  }
  if (pattern.test(focusedElement.id)) {
    focusId = focusedElement.id;
    focusIdCounter = 1;
  }

  return focusId;
}
timerContainer.addEventListener("focusin", updateFocus);
// Add event listeners for focus
window.addEventListener("load", () => {});
