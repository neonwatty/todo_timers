function is_touch_enabled() {
  // Check if touch is enabled
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function isUserMobile() {
  if (is_touch_enabled()) {
    return true;
  }
  return false;
}

function getHoverClass(element) {
  const classString = element.className;
  const hoverClasses = classString.match(/hover:[\w-]+/g);
  return hoverClasses[0];
}

function removeHoverClasses(element) {
  const classString = element.className;
  let cleanedClassString = classString.replace(/hover(?:\:[\w-]+)/g, "").trim();
  const finalClassString = cleanedClassString.replace(/\s+/g, " ");
  return finalClassString;
}

function flickerHoverClass(button) {
  if (isUserMobile()) {
    // get hover class of button
    const hoverClass = getHoverClass(button);

    // adjust button activation for mobile
    setTimeout(() => {
      button.className = button.className
        .replace(hoverClass, "")
        .trim()
        .replace(/\s+/g, " ");
    }, 350);
    button.classList.add(hoverClass);
  }
}

export { flickerHoverClass };
