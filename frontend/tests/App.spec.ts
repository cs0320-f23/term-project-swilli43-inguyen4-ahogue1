import { test, expect } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

test("on page load, i see an input bar", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:5173/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});


/**
 * Journal Prompt Tests Asserting Visibility & Presence
 */
test("on page load, i see a journal prompt", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect (page.getByText("Daily prompt")).toBeVisible();
  await expect (page.locator('css=.journal-prompt')).toBeVisible();
  await expect (page.locator('css=.journal-prompt')).toBeDefined();

});

test("on page load, the date is displayed", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect (page.locator('css=.date')).toBeVisible();
  await expect (page.locator('css=.date')).toBeDefined();
  await expect (page.locator('css=.date')).toBeTruthy();
});
