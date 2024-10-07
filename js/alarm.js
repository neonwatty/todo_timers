const alertSound = document.getElementById("alertSound");

function playAlertSound() {
  alertSound.currentTime = 0;
  alertSound.play().catch((error) => {
    console.log("Error playing sound:", error);
  });
}

function stopAlertSound() {
  alertSound.pause();
}

export { playAlertSound, stopAlertSound };
