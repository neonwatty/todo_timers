import { createNewTimer } from "./add_remove_timer.js";

window.addEventListener("load", () => {
  // grab first timer
  const firstTimeId = 1;
  createNewTimer(firstTimeId);
});
