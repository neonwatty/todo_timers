import { createNewTimer } from "./add_remove_timer.js";
import { resetTimerBlurEvents } from "./blur.js";
import { resetTimerDrag } from "./drag.js";
import { loadDict } from "./storage.js";
let firstTimeId = 1;

window.addEventListener("load", async () => {
  // load in timers from local storage
  const savedTimers = await loadDict();

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

  // reset blur and drag events
  resetTimerBlurEvents();
  resetTimerDrag();
});

export { firstTimeId };
