import { createNewTimer } from "./add_remove_timer.js";
import { resetTimerBlurEvents } from "./blur.js";
import { loadDict } from "./localStorage.js";

export let firstTimeId = 1; // this will be set via the max id + 1 form local storage

window.addEventListener("load", () => {
  console.log(loadDict());
  const timerName = `my-timer-${firstTimeId}`;
  createNewTimer(timerName);
  resetTimerBlurEvents();
});
