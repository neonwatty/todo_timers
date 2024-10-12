const { test, expect } = require("@playwright/test");
const { exec } = require("child_process");

let server;

test.beforeEach(async ({ page }) => {
  // Start your server
  server = exec("npm start"); // Replace with the command to start your server

  // Wait for the server to start
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Adjust as needed

  // go to page
  await page.goto("http://localhost:3000");
  page.on("console", (msg) =>
    console.log(`Browser log: ${msg.type()}: ${msg.text()}`)
  );
});

test.afterEach(async () => {
  // Stop your server
  server.kill();
});

test("clicking add-timer-button adds a new timer, clicking remove button removes timer", async ({
  page,
}) => {
  // dismiss popover welcome-close
  await page.click("button#welcome-close");

  // Check that there is initially one timer container
  const initialTimerContainers = await page
    .locator('div[class*="timer-container"]')
    .count();
  expect(initialTimerContainers).toBe(1);

  // Press the button to add a new timer
  await page.locator('div[id*="add-timer-button"]').click();

  // Check that a new timer container has been added
  const timerContainersAfterClick = await page
    .locator('div[class*="timer-container"]')
    .count();
  expect(timerContainersAfterClick).toBe(2);

  // focus on new timer, delete
  const timerToRemove = page.locator("#my-timer-1");
  await timerToRemove.focus();

  // Click the remove timer button
  await page.locator('div[id*="remove-timer-button"]').click();

  // Wait for 2 seconds
  await page.waitForTimeout(2000);

  // Check the count of timer containers after the click
  const timerContainersAfterClickAgain = await page
    .locator('div[class*="timer-container"]')
    .count();
  expect(timerContainersAfterClickAgain).toBe(1);
});

test("save timer notes and verify persistence", async ({ page }) => {
  // dismiss popover welcome-close
  await page.click("button#welcome-close");

  // Check that there is initially one timer container
  const initialTimerContainers = await page
    .locator('div[class*="timer-container"]')
    .count();
  expect(initialTimerContainers).toBe(1);

  // Focus on the input element with id timer-notes
  const timerNotesInput = page.locator("#timer-notes");
  await timerNotesInput.focus();

  // Enter some text
  const notesText = "This is a test note.";
  await timerNotesInput.fill(notesText);

  // Click the save button
  await page.locator('div[id*="save-button"]').click();
  await page.waitForTimeout(500);

  // check local storage
  const myTimer1ValueBefore = await page.evaluate(
    () =>
      JSON.parse(localStorage.getItem("todo-timers-app"))["my-timer-1"][
        "timerNotes"
      ]
  );
  expect(myTimer1ValueBefore.trim()).toBe(notesText);

  // Refresh the page
  await page.reload();

  // check local storage
  const myTimer1ValueAfter = await page.evaluate(
    () =>
      JSON.parse(localStorage.getItem("todo-timers-app"))["my-timer-1"][
        "timerNotes"
      ]
  );
  expect(myTimer1ValueAfter.trim()).toBe(notesText);

  // Check that the text still exists in the timer-notes div
  const timerNotesOutput = page.locator("#timer-notes"); // Adjust if necessary
  const timerNotesText = await timerNotesOutput.textContent();
  expect(timerNotesText.trim()).toBe(notesText);
});
