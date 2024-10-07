<div
  id="1"
  class="w-full h-full md:h-1/6 mt-5 flex flex-row rounded-3xl border border-slate-800 dark:border-slate-200 focus:bg-slate-500 focus:outline-none"
  tabindex="0"
>
  <div
    id="timer-container"
    class="w-2/3 h-full font-sans flex flex-col items-center justify-start text-md"
  >
    <div
      class="w-full h-2/3 md:h-3/4 flex flex-col lg:flex-row lg:space-x-7 items-center justify-center pr-10 border border-t-0 border-l-0 border-r-1 border-b-1 border-slate-800 dark:border-slate-200"
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
      class="w-full h-1/3 flex flex-row items-center justify-center space-x-7 px-5 border border-t-0 border-l-0 border-r-1 border-b-0 border-slate-800 dark:border-slate-200"
      id="timer-buttons"
    >
      <div
        class="w-1/3 h-1/2 bg-green-500 flex items-center justify-center text-lg text-center rounded-2xl text-slate-800 dark:text-slate-200 border border-slate-800 dark:border-slate-200 hover hover:bg-green-700 cursor-pointer active active:bg-green-400"
        id="start-button"
      >
        ▶
      </div>
      <div
        class="w-1/3 h-1/2 bg-red-500 flex items-center justify-center pb-0.5 text-xs text-center rounded-2xl text-slate-800 dark:text-slate-200 border border-slate-800 dark:border-slate-200 hover hover:bg-red-700 cursor-pointer active active:bg-red-400"
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
  <div class="flex flex-col p-3 w-1/3 h-full" id="meta-data">
    <label for="name">Name:</label>
    <input
      type="text"
      id="name"
      name="name"
      minlength="0"
      maxlength="30"
      size="10"
      class="bg-slate-400 dark:bg-slate-600 text-slate-800 dark:text-slate-200 mb-2"
    />
    <label for="notes">Notes:</label>
    <textarea
      type="text"
      id="notes"
      name="notes"
      class="h-full bg-slate-400 dark:bg-slate-600 text-slate-800 dark:text-slate-200 text-left"
    ></textarea>
  </div>
</div>;
