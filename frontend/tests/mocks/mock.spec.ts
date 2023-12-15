import { test, expect } from "@playwright/test";

/**
 * Mocking Overview
 *
 * We test the following front end functionality with mocks:
 *
 * Mock prompt is visible
 * Mock date is visible
 * Mock previous entry can be accessed by pressing the prev button
 * Mock next entry can be accessed by pressing the next button
 * Mock suggestions can be seen by pressing 'submit for suggestions' button
 *
 */

test("on page load, I see correct login page elements", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page.getByLabel("login button")).toBeVisible();
  await expect(page.getByLabel("email text box")).toBeVisible();
  await expect(page.getByLabel("password text box")).toBeVisible();
});

test("after logging in, the elements of the journal display are visible", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("email text box").fill("awinters@risd.edu");
  await page.getByLabel("password text box").fill("i<3dogs20");
  await page.getByLabel("login button").click();
  await expect(page.getByLabel("submit button")).toBeVisible();
  await expect(page.getByLabel("Journal input")).toBeVisible();
  await expect(page.getByLabel("journal command box")).toBeVisible();
  await expect(page.getByLabel("mental health disclaimer")).toBeVisible();
});

/**
 * Journal Prompt Tests Asserting Visibility & Presence
 */
test("on page load, i see a journal prompt", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("login button").click();
  await expect(page.getByText("Daily Prompt:")).toBeVisible();
  await expect(
    page.getByText("Mock: Describe a highlight and challenge from today.")
  ).toBeVisible();
  await expect(page.locator("css=.journal-prompt")).toBeVisible();
  await expect(page.locator("css=.journal-prompt")).toBeDefined();
});

test("on page load, the date is displayed", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("login button").click();
  await expect(page.locator("css=.date")).toBeVisible();
  await expect(page.locator("css=.date")).toBeDefined();
  await expect(page.locator("css=.date")).toBeTruthy();
});

test("when the submit button is clicked, the suggestions panel is displayed", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("email text box").fill("awinters@risd.edu");
  await page.getByLabel("password text box").fill("i<3dogs20");
  await page.getByLabel("login button").click();
  await page.getByLabel("journal command box").click();
  await page
    .getByLabel("journal command box")
    .fill("I HATE essays. I LOVE dogs");
  await page.getByLabel("submit button").click();
  await expect(page.getByLabel("suggestions display")).toBeVisible();
  await expect(page.getByLabel("suggestions list")).toBeVisible();
  await expect(page.getByLabel("random plant image")).toBeVisible();
});
