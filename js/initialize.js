import { createNewTimer } from "./add_remove_timer.js";
import { resetTimerBlurEvents } from "./blur.js";

window.addEventListener("load", () => {
  // grab first timer
  const firstTimeId = 1;
  createNewTimer(firstTimeId);
  resetTimerBlurEvents();
});
