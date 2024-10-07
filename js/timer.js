// get input timer digits
const timer = document.getElementById("my-timer");
const timerContainer = timer.querySelector("#timer-container");
const timerDash = timerContainer.querySelector("#timer-dash");
const timerButtons = timerContainer.querySelector("#timer-buttons");

// timer dash
let hoursEntry = timerDash.querySelector("#hours-entry");
let minutesEntry = timerDash.querySelector("#minutes-entry");
let secondsEntry = timerDash.querySelector("#seconds-entry");
const originalTitle = document.title;

// timer buttons
const startButton = timerButtons.querySelector("#start-button");
const pauseButton = timerButtons.querySelector("#pause-button");
const resetButton = timerButtons.querySelector("#reset-button");
let timerInterval;
let isPlay = false;
let isPaused = false;
let isAlarm = false;

// import alarm functions
import {
  playAlertSound,
  playFlashTitle,
  stopAlertSound,
  stopFlashTitle,
} from "./alarm.js";

window.addEventListener("load", () => {
  // Update the count down every 1 second
  function startTimer() {
    // unpause if paused
    if (isPaused) {
      isPaused = false;
    }

    // re-select inputs
    hoursEntry = timerDash.querySelector("#hours-entry");
    minutesEntry = timerDash.querySelector("#minutes-entry");
    secondsEntry = timerDash.querySelector("#seconds-entry");

    // grab data from dash
    let hoursToAdd = parseInt(hoursEntry.innerHTML);
    let minutesToAdd = parseInt(minutesEntry.innerHTML);
    let secondsToAdd = parseInt(secondsEntry.innerHTML);

    // Function to add time in hours, minutes, and seconds
    function addTime(hours, minutes, seconds) {
      // Get the current date and time in milliseconds
      let currentDate = new Date();
      let currentTimeInMs = currentDate.getTime();

      // compute time diff in miliseconds
      const millisecondsToAdd = (hours * 3600 + minutes * 60 + seconds) * 1000;
      return currentTimeInMs + millisecondsToAdd + 100;
    }

    // Calculate the new date and time
    let countDownDate = addTime(hoursToAdd, minutesToAdd, secondsToAdd);

    // start interval
    timerInterval = setInterval(function () {
      console.log(hoursToAdd, minutesToAdd, secondsToAdd);
      if (!isPaused) {
        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;
        console.log(distance);

        // Time calculations for days, hours, minutes and seconds
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // update dash
        if (distance > 0) {
          hoursEntry = timerDash.querySelector("#hours-entry");
          minutesEntry = timerDash.querySelector("#minutes-entry");
          secondsEntry = timerDash.querySelector("#seconds-entry");

          // replace inputs with spans
          hoursEntry.outerHTML = `<span class="text-4xl" id="hours-entry">${hours}</span>`;
          minutesEntry.outerHTML = `<span class="text-4xl" id="minutes-entry">${minutes}</span>`;
          secondsEntry.outerHTML = `<span class="text-4xl" id="seconds-entry">${seconds}</span>`;
        }

        // If the count down is finished, write some text
        if (distance <= 0) {
          clearInterval(timerInterval);
          playAlertSound();
          playFlashTitle();
          isAlarm = true;
          // alertUser();
        }
      }
    }, 1000);
  }

  // start functionality
  function startUpdateDash() {
    // get values from timer dash inputs - set default value for each to 0
    let hourVal = 0;
    let minVal = 0;
    let secVal = 0;
    if (hoursEntry.value) {
      hourVal = parseInt(hoursEntry.value);
    }
    if (minutesEntry.value) {
      minVal = parseInt(minutesEntry.value);
    }
    if (secondsEntry.value) {
      secVal = parseInt(secondsEntry.value);
    }

    // replace inputs with spans
    hoursEntry.outerHTML = `<span class="text-4xl" id="hours-entry">${hourVal}</span>`;
    minutesEntry.outerHTML = `<span class="text-4xl" id="minutes-entry">${minVal}</span>`;
    secondsEntry.outerHTML = `<span class="text-4xl" id="seconds-entry">${secVal}</span>`;
  }

  // start button functionality
  function start() {
    if (!isPlay) {
      // update dash
      startUpdateDash();

      // update isPlay flag
      isPlay = true;
    }

    // start timer
    startTimer();
  }

  function pause() {
    // update isPaused flag
    isPaused = true;

    // remove start event listener
    clearInterval(timerInterval);

    // cancel alarm
    if (isAlarm) {
      stopAlertSound();
      stopFlashTitle();
      isAlarm = false;
    }
  }

  // add listener to start button
  startButton.addEventListener("click", start);

  // add listener to pause button
  pauseButton.addEventListener("click", pause);
});
