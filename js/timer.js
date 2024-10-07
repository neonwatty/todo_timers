// get input timer digits
const timer = document.getElementById("my-timer");
const timerContainer = timer.querySelector("#timer-container");
const hoursEntry = timerContainer.querySelector("#hours-entry");
const minutesEntry = timerContainer.querySelector("#minutes-entry");
const secondsEntry = timerContainer.querySelector("#seconds-entry");

window.addEventListener("load", () => {
  let countDownDate = new Date("Jan 5, 2030 15:37:25").getTime();

  // Update the count down every 1 second
  let x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    hoursEntry.innerHTML = days;
    minutesEntry.innerHTML = minutes;
    secondsEntry.innerHTML = seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.innerHTML = "EXPIRED";
    }
  }, 1000);
});
