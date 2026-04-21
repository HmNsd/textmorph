import { expect, test } from "@playwright/test";

test("lets users animate custom text and switch styles", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Turn plain text into expressive motion with one polished workspace.",
    }),
  ).toBeVisible();

  const input = page.getByPlaceholder("Enter your text...");
  await expect(input).toHaveValue("Build motion that feels alive");

  const previewCanvas = page.getByTestId("preview-canvas");
  const selectedStyleBadge = page.getByTestId("selected-style-badge");
  await expect(previewCanvas).toContainText("Build motion that feels alive");

  await input.fill("Codex makes text move");
  await page.getByRole("button", { name: "Animate Text" }).click();
  await expect(previewCanvas).toContainText("Codex makes text move");

  await page.getByRole("button", { name: "Typewriter" }).click();
  await expect(selectedStyleBadge).toHaveText("typing");
  await expect(previewCanvas).toContainText("Codex makes text move");

  await page.getByRole("button", { name: "Vertical Scroll" }).click();
  await expect(selectedStyleBadge).toHaveText("vertical");

  await page.getByRole("button", { name: "Fast" }).click();
  await expect(page.getByRole("button", { name: "Fast" })).toHaveClass(/bg-sky-400\/12/);

  const slider = page.getByRole("slider");
  await slider.fill("88");
  await expect(page.getByText("88px")).toBeVisible();

  await page.getByTestId("font-style-poster").click();
  await expect(page.getByTestId("selected-style-badge")).toHaveText("vertical");

  await page.getByRole("button", { name: "Full Screen" }).click();
  const exitFullscreenButton = page.getByRole("button", { name: "Exit Full Screen" });
  await expect(exitFullscreenButton).toBeVisible();
  await page.evaluate(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  });
  await expect(page.getByRole("button", { name: "Full Screen" })).toBeVisible();

  const themeToggle = page.getByRole("button", { name: "Switch to Light Mode" });
  await themeToggle.click();
  await expect(page.getByRole("button", { name: "Switch to Dark Mode" })).toBeVisible();

  await page.getByRole("button", { name: "Wave Motion" }).click();
  await expect(selectedStyleBadge).toHaveText("wave");
});
