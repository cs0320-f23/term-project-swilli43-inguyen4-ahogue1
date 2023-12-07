import { test, expect } from "@playwright/test";

test("on page load, I see correct login page elements", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page.getByLabel("login button")).toBeVisible();
  await expect(page.getByLabel("email text box")).toBeVisible();
  await expect(page.getByLabel("password text box")).toBeVisible();
});

test("after logging in, the elements of the journal display are visible", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("email text box").fill("awinters@risd.edu");
  await page.getByLabel("password text box").fill("i<3dogs20");
  await page.getByLabel("login button").click();
  await expect(page.getByLabel("submit button")).toBeVisible();
  await expect(page.getByLabel("Journal input")).toBeVisible();
  await expect(page.getByLabel("journal command box")).toBeVisible();
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
  await expect(page.getByLabel("mental health disclaimer")).toBeVisible();
});
