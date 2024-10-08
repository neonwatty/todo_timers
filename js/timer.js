import {
  playAlertSound,
  playFlashTitle,
  stopAlertSound,
  stopFlashTitle,
} from "./alarm.js";

import { deleteDict, loadDict, saveDict } from "./localStorage.js";

const timerContainer = document.querySelector("#timers-inner-container");

export class TimerFunc {
  constructor(timerPrivateName) {
    this.timerPrivateName = timerPrivateName;

    this.timerElement = timerContainer.querySelector(`#${timerPrivateName}`);
    this.timerDash = this.timerElement.querySelector("#timer-dash");
    this.timerButtons = this.timerElement.querySelector("#timer-buttons");
    this.timerMetaData = this.timerElement.querySelector("#timer-metadata");

    this.startButton = this.timerButtons.querySelector("#start-button");
    this.pauseButton = this.timerButtons.querySelector("#pause-button");
    this.resetButton = this.timerButtons.querySelector("#reset-button");
    this.saveButton = this.timerMetaData.querySelector("#save-button");

    this.timerInterval = null;
    this.isPlay = false;
    this.isPaused = false;
    this.isAlarm = false;

    // TODO: load internal timer values, name, and notes from local storage
    this.updateInternalTimeValues(0, 0, 0); // timer init time values

    // add event listeners to buttons
    this.initialize();
  }

  initialize() {
    this.startButton.addEventListener("click", () => this.start());
    this.pauseButton.addEventListener("click", () => this.pause());
    this.resetButton.addEventListener("click", () => this.reset());
    this.saveButton.addEventListener("click", () => this.save());
  }

  updateInternalTimeValues(hours, minutes, seconds) {
    // update this hours, minutes, seconds
    this.hoursToAdd = parseInt(hours);
    this.minutesToAdd = parseInt(minutes);
    this.secondsToAdd = parseInt(seconds);
  }

  recordStaticDashValues() {
    // re-select inputs
    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    // get timer values
    let hoursToAdd =
      this.hoursEntry.textContent === ""
        ? 0
        : Math.max(parseInt(this.hoursEntry.textContent), 0);

    let minutesToAdd =
      this.minutesEntry.textContent === ""
        ? 0
        : Math.max(parseInt(this.minutesEntry.textContent), 0);

    let secondsToAdd =
      this.secondsEntry.textContent === ""
        ? 0
        : Math.max(parseInt(this.secondsEntry.textContent), 0);

    this.updateInternalTimeValues(hoursToAdd, minutesToAdd, secondsToAdd);
  }

  recordDynamicDashValues() {
    // re-select inputs
    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    // get timer values
    let hoursToAdd =
      this.hoursEntry.value === ""
        ? 0
        : Math.max(parseInt(this.hoursEntry.value), 0);

    let minutesToAdd =
      this.minutesEntry.value === ""
        ? 0
        : Math.max(parseInt(this.minutesEntry.value), 0);

    let secondsToAdd =
      this.secondsEntry.value === ""
        ? 0
        : Math.max(parseInt(this.secondsEntry.value), 0);

    this.updateInternalTimeValues(hoursToAdd, minutesToAdd, secondsToAdd);
  }

  setStaticDash() {
    // re-select inputs
    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    // assign values
    this.hoursEntry.outerHTML = `<span class="text-4xl" id="hours-entry">${this.hoursToAdd}</span>`;
    this.minutesEntry.outerHTML = `<span class="text-4xl" id="minutes-entry">${this.minutesToAdd}</span>`;
    this.secondsEntry.outerHTML = `<span class="text-4xl" id="seconds-entry">${this.secondsToAdd}</span>`;
  }

  setDynamicDash() {
    // re-select inputs
    this.hoursEntry = this.timerDash.querySelector("#hours-entry");
    this.minutesEntry = this.timerDash.querySelector("#minutes-entry");
    this.secondsEntry = this.timerDash.querySelector("#seconds-entry");

    // assign values
    this.hoursEntry.outerHTML = `<input
                                  class="text-3xl text-right w-1/3 h-2/3 md:w-4/5 md:h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700"
                                  type="number"
                                  id="hours-entry"
                                  min="0"
                                  value="${this.hoursToAdd}"
                                  />`;

    this.minutesEntry.outerHTML = `<input
                                    class="text-3xl text-right w-1/3 h-2/3 md:w-4/5 md:h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700"
                                    type="number"
                                    id="minutes-entry"
                                    min="0"
                                    value="${this.minutesToAdd}"
                                  />`;

    this.secondsEntry.outerHTML = `<input
                                    class="text-3xl text-right w-1/3 h-2/3 md:w-4/5 md:h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700"
                                    type="number"
                                    id="seconds-entry"
                                    min="0"
                                    value="${this.secondsToAdd}"
                                  />`;
  }

  startTimer() {
    if (this.isPaused) {
      this.isPaused = false;
    }

    // function to create correct timer countdown
    const addTime = (hours, minutes, seconds) => {
      const currentDate = new Date();
      const currentTimeInMs = currentDate.getTime();
      const millisecondsToAdd = (hours * 3600 + minutes * 60 + seconds) * 1000;
      return currentTimeInMs + millisecondsToAdd + 100;
    };

    // map countdown
    const countDownDate = addTime(
      this.hoursToAdd,
      this.minutesToAdd,
      this.secondsToAdd
    );

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
          // update internal time values
          this.updateInternalTimeValues(hours, minutes, seconds);

          // use these new values to update static dash
          this.setStaticDash();
        }

        if (distance <= 0) {
          clearInterval(this.timerInterval);
          this.isAlarm = true;
          playAlertSound();
          playFlashTitle();
          this.timerElement.classList.add("bg-red-400");
        }
      }
    }, 1000);
  }

  start() {
    if (!this.isPlay) {
      // swap dynamic with static values //
      // update internal time values based on current dynamic dash
      this.recordDynamicDashValues();

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

      // swap static with dynamic dashes //
      // record current time values from static dash
      this.recordStaticDashValues();

      // swap out static for dynamic dash with these recorded values
      this.setDynamicDash();

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
    // turn off red timer bg
    this.timerElement.classList.remove("bg-red-400");

    // reset timer values to 0
    this.updateInternalTimeValues(0, 0, 0);

    // assign input
    this.setDynamicDash();
  }

  save() {
    if (!this.isPaused) {
      // update timer dash data
      this.recordDynamicDashValues();

      // update name and notes metadata provided input
      this.timerName = this.timerMetaData.querySelector("#timer-name").value;
      this.timerNotes = this.timerMetaData.querySelector("#timer-notes").value;

      // create dictionary of values to save under timerPrivateName
      let timerSaveData = {
        timerName: this.timerName,
        timerNotes: this.timerNotes,
        hoursToAdd: this.hoursToAdd,
        minutesToAdd: this.minutesToAdd,
        secondsToAdd: this.secondsToAdd,
      };

      // get timerPrivateName
      saveDict(this.timerPrivateName, timerSaveData);

      // for testing - load just saved data
      console.log(loadDict(this.timerPrivateName));
    }
  }
}
