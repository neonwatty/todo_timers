// Function to save name-value pair to Local Storage
function saveSlider(name, value) {
  localStorage.setItem(name, value);
}

// Function to load name-value pairs from storage
function loadSliders() {
  // load each slider pair
  const startSliderActual = localStorage.getItem("start_slider_actual");
  return startSliderActual;
}

// Function to clear sliders from Local Storage
function clearSliders() {
  localStorage.removeItem("start_slider_actual");
}

export { clearSliders, loadSliders, saveSlider };
