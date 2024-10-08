import { resetTimerBlurEvents } from "./blur.js";
import { updateFocus } from "./focus.js";
import { TimerFunc } from "./timer.js";

const timerContainer = document.querySelector("#timers-inner-container");
const addTimerButton = document.querySelector("#add-timer-button");
const removeTimerButton = document.querySelector("#remove-timer-button");

let idCounter = 2;

export function createNewTimer(id) {
  // create id namespace
  const timerName = `my-timer-${id}`;
  const timerContainer = document.querySelector("#timers-inner-container");
  const timerElement = timerContainer.querySelector(`#${timerName}`);

  // if it doesn't exist create it - both the div and timer functionality
  if (!timerElement) {
    // create new div
    createNewTimerDiv(timerName);

    // create new timer functionality
    let newTimerFunc = new TimerFunc(timerName);

    // reset blur events for timers
    resetTimerBlurEvents();
  }
}

function createNewTimerDiv(id) {
  const timerDiv = `
            <div
            id=${id}
            class="timer-container w-full h-2/3 md:h-1/3 mt-5 flex flex-row rounded-3xl border border-slate-800 dark:border-slate-200 focus:bg-slate-500 focus:outline-none"
            tabindex="0"
            draggable="true"
          >
            <div
              class="w-2/3 h-full font-sans flex flex-col items-center justify-start text-md"
            >
              <div
                class="w-full h-full pt-3 md:h-2/3 flex flex-col lg:flex-row lg:space-x-7 items-center justify-center pr-10 border border-t-0 border-l-0 border-r-1 border-b-1 border-slate-800 dark:border-slate-200"
                id="timer-dash"
              >
                <div class="flex flex-col text-right items-center md:items-end">
                  <input
                    class="text-3xl text-right w-1/3 h-2/3 md:w-4/5 md:h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700"
                    type="number"
                    id="hours-entry"
                    min="0"
                    value="0"
                  />
                  <div>hours</div>
                </div>
                <div class="flex flex-col text-right items-center md:items-end">
                  <input
                    class="text-3xl text-right w-1/3 h-2/3 md:w-4/5 md:h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700"
                    type="number"
                    id="minutes-entry"
                    min="0"
                    value="0"
                  />
                  <div>minutes</div>
                </div>
                <div class="flex flex-col text-right items-center md:items-end">
                  <input
                    class="text-3xl text-right w-1/3 h-2/3 md:w-4/5 md:h-1/4 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700"
                    type="number"
                    id="seconds-entry"
                    min="0"
                    value="0"
                  />
                  <div>seconds</div>
                </div>
              </div>
              <div
                class="w-full h-1/3 pt-3 pb-3 flex flex-row items-center justify-center space-x-7 px-5 border border-t-0 border-l-0 border-r-1 border-b-0 border-slate-800 dark:border-slate-200"
                id="timer-buttons"
              >
                <div
                  class="w-1/3 h-1/2 bg-green-500 flex items-center justify-center text-lg text-center rounded-2xl text-slate-800 dark:text-slate-200 border border-slate-800 dark:border-slate-200 hover hover:bg-green-700 cursor-pointer active active:bg-green-400"
                  id="start-button"
                >
                  ▶
                </div>
                <div
                  class="w-1/3 h-1/2 py-1.5 bg-red-500 flex items-center justify-center text-xs text-center rounded-2xl text-slate-800 dark:text-slate-200 border border-slate-800 dark:border-slate-200 hover hover:bg-red-700 cursor-pointer active active:bg-red-400"
                  id="pause-button"
                >
                  ▐▐
                </div>
                <div
                  class="w-1/3 h-1/2 bg-blue-500 flex items-center justify-center text-xl text-center rounded-2xl text-slate-800 dark:text-slate-200 border border-slate-800 dark:border-slate-200 hover hover:bg-blue-700 cursor-pointer active active:bg-blue-400"
                  id="reset-button"
                >
                  ↻
                </div>
              </div>
            </div>
            <div
              class="flex flex-col p-3 w-1/3 h-1/2"
              id="meta-data"
            >
              <label for="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                minlength="0"
                maxlength="30"
                class="bg-slate-400 dark:bg-slate-600 text-slate-800 dark:text-slate-200 mb-2"
              />
              <label for="notes">Notes:</label>
              <textarea
                type="text"
                id="notes"
                name="notes"
                rows=1
                class="h-full bg-slate-400 dark:bg-slate-600 text-slate-800 dark:text-slate-200 text-left"
              ></textarea>
            </div>
          </div>`;

  // insert new timer div into main dom element for timers
  timerContainer.insertAdjacentHTML("beforeend", timerDiv);
}

removeTimerButton.addEventListener("click", () => {
  const focusId = updateFocus();
  const removeElement = document.getElementById(focusId);
  if (removeElement) {
    removeElement.remove();

    // reset timer blur events
    resetTimerBlurEvents();
  }
});

addTimerButton.addEventListener("click", () => {
  // create new timer div
  createNewTimer(idCounter);

  // update counter
  idCounter++;
});
