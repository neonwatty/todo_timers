const alertSound = document.getElementById("alertSound");
const pageTitle = document.title;

function playFlashTitle() {
  let flashCount = 0;
  titleFlasher = setInterval(() => {
    if (flashCount < 10) {
      document.title = flashCount % 2 === 0 ? pageTitle : "⚠️ Time is up!";
      flashCount++;
    } else {
      clearInterval(flashInterval);
      document.title = pageTitle; // Reset title
    }
  }, 1000); // Flash every second
}

function stopFlashTitle() {
  clearInterval(titleFlasher);
  document.title = pageTitle;
}

function playAlertSound() {
  alertSound.currentTime = 0;
  alertSound.play().catch((error) => {
    console.log("Error playing sound:", error);
  });
}

function stopAlertSound() {
  alertSound.pause();
}

export { playAlertSound, playFlashTitle, stopAlertSound, stopFlashTitle };
