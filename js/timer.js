import {
  playAlertSound,
  playFlashTitle,
  stopAlertSound,
  stopFlashTitle,
} from "./alarm.js";

class Timer {
  constructor(timerElement) {
    this.timerElement = timerElement;
    this.timerContainer = timerElement.querySelector("#timer-container");
    this.timerDash = this.timerContainer.querySelector("#timer-dash");
    this.timerButtons = this.timerContainer.querySelector("#timer-buttons");

    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    this.startButton = this.timerButtons.querySelector("#start-button");
    this.pauseButton = this.timerButtons.querySelector("#pause-button");
    this.resetButton = this.timerButtons.querySelector("#reset-button");

    this.timerInterval = null;
    this.isPlay = false;
    this.isPaused = false;
    this.isAlarm = false;

    this.initialize();
  }

  initialize() {
    window.addEventListener("load", () => {
      this.startButton.addEventListener("click", () => this.start());
      this.pauseButton.addEventListener("click", () => this.pause());
      this.resetButton.addEventListener("click", () => this.reset());
    });
  }

  startTimer() {
    if (this.isPaused) {
      this.isPaused = false;
    }

    // re-select inputs
    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    // get timer values
    let hoursToAdd = parseInt(this.hoursEntry.innerHTML);
    let minutesToAdd = parseInt(this.minutesEntry.innerHTML);
    let secondsToAdd = parseInt(this.secondsEntry.innerHTML);

    const addTime = (hours, minutes, seconds) => {
      const currentDate = new Date();
      const currentTimeInMs = currentDate.getTime();
      const millisecondsToAdd = (hours * 3600 + minutes * 60 + seconds) * 1000;
      return currentTimeInMs + millisecondsToAdd + 100;
    };

    const countDownDate = addTime(hoursToAdd, minutesToAdd, secondsToAdd);

    this.timerInterval = setInterval(() => {
      if (!this.isPaused) {
        let now = new Date().getTime();
        let distance = countDownDate - now;

        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance > 0) {
          this.updateDash(hours, minutes, seconds);
        }

        if (distance <= 0) {
          clearInterval(this.timerInterval);
          this.isAlarm = true;
          playAlertSound();
          playFlashTitle();
        }
      }
    }, 1000);
  }

  updateDash(hours, minutes, seconds) {
    // re-select inputs
    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    this.hoursEntry.outerHTML = `<span class="text-4xl" id="hours-entry">${hours}</span>`;
    this.minutesEntry.outerHTML = `<span class="text-4xl" id="minutes-entry">${minutes}</span>`;
    this.secondsEntry.outerHTML = `<span class="text-4xl" id="seconds-entry">${seconds}</span>`;
  }

  startUpdateDash() {
    let hourVal = this.hoursEntry.value ? parseInt(this.hoursEntry.value) : 0;
    let minVal = this.minutesEntry.value
      ? parseInt(this.minutesEntry.value)
      : 0;
    let secVal = this.secondsEntry.value
      ? parseInt(this.secondsEntry.value)
      : 0;

    this.updateDash(hourVal, minVal, secVal);
  }

  start() {
    if (!this.isPlay) {
      this.startUpdateDash();
      this.isPlay = true;
    }
    this.startTimer();
  }

  pause() {
    this.isPaused = true;
    clearInterval(this.timerInterval);
    if (this.isAlarm) {
      stopAlertSound();
      stopFlashTitle();
      this.isAlarm = false;
    }
  }

  reset() {
    if (this.isAlarm) {
      stopAlertSound();
      stopFlashTitle();
      this.isAlarm = false;
    }

    this.hoursEntry.outerHTML =
      '<input class="text-3xl w-2/3 h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700" type="number" id="hours-entry" min="0" value="0" />';
    this.minutesEntry.outerHTML =
      '<input class="text-3xl w-2/3 h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700" type="number" id="minutes-entry" min="0" value="0" />';
    this.secondsEntry.outerHTML =
      '<input class="text-3xl w-2/3 h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700" type="number" id="seconds-entry" min="0" value="0" />';
  }
}

const timerElement = document.getElementById("my-timer");
const timer = new Timer(timerElement);
