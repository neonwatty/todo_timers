export function resetTimerBlurEvents() {
  const timers = document.querySelectorAll(".timer-container");

  function handleOutsideClick(event) {
    if (!event.target.closest(".timer-container")) {
      removeTimerBlurEventListeners();
      timers.forEach((timer) => {
        timer.classList.remove("blur");
        timer.classList.remove("active");
      });
      addTimerBlurEventListeners();
    }
  }

  function handleTimerBlurCLick(event) {
    timers.forEach((t) => t.classList.add("blur"));
    event.currentTarget.classList.remove("blur");
  }

  function addTimerBlurEventListeners() {
    timers.forEach((timer) => {
      timer.addEventListener("click", handleTimerBlurCLick);
    });
    document.addEventListener("click", handleOutsideClick);
  }

  function removeTimerBlurEventListeners() {
    timers.forEach((timer) => {
      timer.removeEventListener("click", handleTimerBlurCLick);
    });
    document.removeEventListener("click", handleOutsideClick);
  }

  removeTimerBlurEventListeners();
  addTimerBlurEventListeners();
}
