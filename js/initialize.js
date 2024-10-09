import { createNewTimer } from "./add_remove_timer.js";
import { resetTimerBlurEvents } from "./blur.js";
import { loadDict } from "./localStorage.js";
let firstTimeId = 1;

window.addEventListener("load", () => {
  // load in timers from local storage
  const savedTimers = loadDict();

  // loop through savedTimers and load into timers
  if (Object.keys(savedTimers).length > 0) {
    Object.entries(savedTimers).forEach(([timerPrivateName, value]) => {
      let parts = timerPrivateName.split("-");
      let timerNumer = parseInt(parts[parts.length - 1]);

      firstTimeId = Math.max(firstTimeId, timerNumer);
      createNewTimer(
        timerPrivateName,
        value.timerName,
        value.timerNotes,
        value.hoursToAdd,
        value.minutesToAdd,
        value.secondsToAdd
      );
    });
  } else {
    const timerPrivateName = `my-timer-${firstTimeId}`;
    createNewTimer(timerPrivateName);
  }

  resetTimerBlurEvents();
});

export { firstTimeId };
