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

function removeHoverClassIfMobile(element) {
  if (isUserMobile()) {
    const hoverClass = getHoverClass(element);
    const classString = element.className;
    let cleanedClassString = classString.replace(hoverClass, "").trim();
    const finalClassString = cleanedClassString.replace(/\s+/g, " ");
    element.className = finalClassString;
    element.hoverClass = hoverClass;
  }
}

function flickerHoverClass(element) {
  if (isUserMobile()) {
    // get hover class of button
    const hoverClass = element.hoverClass;

    // add hover class to element
    element.classList.add(hoverClass);

    // adjust button activation for mobile
    setTimeout(() => {
      element.className = element.className
        .replace(hoverClass, "")
        .trim()
        .replace(/\s+/g, " ");
    }, 200);
  }
}

export { flickerHoverClass, removeHoverClassIfMobile };
