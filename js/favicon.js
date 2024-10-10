// Function to update favicon based on theme
function updateFavicon() {
  const favicon = document.getElementById("favicon");

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  favicon.href = isDarkMode
    ? "images/stopwatch-light.svg"
    : "images/stopwatch-dark.svg";
}

// Initial favicon set based on the current theme
updateFavicon();

// Listen for changes in the color scheme
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    updateFavicon();
  });
