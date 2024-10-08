import {
  playAlertSound,
  playFlashTitle,
  stopAlertSound,
  stopFlashTitle,
} from "./alarm.js";

import { deleteDict, loadDict, saveDict } from "./localStorage.js";

const timerContainer = document.querySelector("#timers-inner-container");

export class TimerFunc {
  constructor(timerName) {
    this.timerName = timerName;
    this.timerElement = timerContainer.querySelector(`#${timerName}`);
    this.timerDash = this.timerElement.querySelector("#timer-dash");
    this.timerButtons = this.timerElement.querySelector("#timer-buttons");

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
    this.startButton.addEventListener("click", () => this.start());
    this.pauseButton.addEventListener("click", () => this.pause());
    this.resetButton.addEventListener("click", () => this.reset());
  }

  getStaticValues() {
    // re-select inputs
    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    // get timer values
    let hoursToAdd = parseInt(this.hoursEntry.textContent);
    let minutesToAdd = parseInt(this.minutesEntry.textContent);
    let secondsToAdd = parseInt(this.secondsEntry.textContent);

    return [hoursToAdd, minutesToAdd, secondsToAdd];
  }

  getDynamicValues() {
    // re-select inputs
    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    // get timer values
    let hoursToAdd = parseInt(this.hoursEntry.value);
    let minutesToAdd = parseInt(this.minutesEntry.value);
    let secondsToAdd = parseInt(this.secondsEntry.value);

    return [hoursToAdd, minutesToAdd, secondsToAdd];
  }

  startTimer() {
    if (this.isPaused) {
      this.isPaused = false;
    }

    // get hoursToAdd, minutesToAdd, and secondsToAdd
    let [hoursToAdd, minutesToAdd, secondsToAdd] = this.getStaticValues();

    // function to create correct timer countdown
    const addTime = (hours, minutes, seconds) => {
      const currentDate = new Date();
      const currentTimeInMs = currentDate.getTime();
      const millisecondsToAdd = (hours * 3600 + minutes * 60 + seconds) * 1000;
      return currentTimeInMs + millisecondsToAdd + 100;
    };

    // map countdown
    const countDownDate = addTime(hoursToAdd, minutesToAdd, secondsToAdd);

    // create interal timer
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
          this.updateStaticDash(hours, minutes, seconds);
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

  updateStaticDash(hours, minutes, seconds) {
    // re-select inputs
    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    // assign values
    this.hoursEntry.outerHTML = `<span class="text-4xl" id="hours-entry">${hours}</span>`;
    this.minutesEntry.outerHTML = `<span class="text-4xl" id="minutes-entry">${minutes}</span>`;
    this.secondsEntry.outerHTML = `<span class="text-4xl" id="seconds-entry">${seconds}</span>`;
  }

  updateDynamicDash(hours, minutes, seconds) {
    // re-select inputs
    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    // assign values
    this.hoursEntry.outerHTML = `<input
                                  class="text-3xl text-right w-1/3 h-2/3 md:w-4/5 md:h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700"
                                  type="number"
                                  id="hours-entry"
                                  min="${hours}"
                                  value="0"
                                  />`;

    this.minutesEntry.outerHTML = `<input
                                    class="text-3xl text-right w-1/3 h-2/3 md:w-4/5 md:h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700"
                                    type="number"
                                    id="minutes-entry"
                                    min="${minutes}"
                                    value="0"
                                  />`;

    this.secondsEntry.outerHTML = `<input
                                    class="text-3xl text-right w-1/3 h-2/3 md:w-4/5 md:h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700"
                                    type="number"
                                    id="seconds-entry"
                                    min="${seconds}"
                                    value="0"
                                  />`;
  }

  start() {
    if (!this.isPlay) {
      // swap dynamic with static values
      let [hours, minutes, seconds] = this.getDynamicValues();
      console.log(hours, minutes, seconds);
      this.updateStaticDash(hours, minutes, seconds);

      // start timer
      this.startTimer();

      // update flags
      this.isPlay = true;
      this.isPaused = false;
    }
  }

  pause() {
    if (!this.isPaused) {
      // clear countdown interval
      clearInterval(this.timerInterval);

      // swap static with dynamic values
      let [hours, minutes, seconds] = this.getStaticValues();
      this.updateDynamicDash(hours, minutes, seconds);

      // halt alarm if playing
      if (this.isAlarm) {
        stopAlertSound();
        stopFlashTitle();
        this.isAlarm = false;
      }

      // update pause and play flags
      this.isPaused = true;
      this.isPlay = false;
    }
  }

  reset() {
    if (this.isAlarm) {
      stopAlertSound();
      stopFlashTitle();
      this.isAlarm = false;
    }

    // re-select inputs
    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    // assign input
    this.hoursEntry.outerHTML =
      '<input class="text-3xl w-2/3 h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700" type="number" id="hours-entry" min="0" value="0" />';
    this.minutesEntry.outerHTML =
      '<input class="text-3xl w-2/3 h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700" type="number" id="minutes-entry" min="0" value="0" />';
    this.secondsEntry.outerHTML =
      '<input class="text-3xl w-2/3 h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700" type="number" id="seconds-entry" min="0" value="0" />';
  }
}
