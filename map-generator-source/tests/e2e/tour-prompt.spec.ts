import { expect, type Page, test } from "@playwright/test";

async function waitForMapLoad(page: Page) {
	await page.waitForFunction(() => (window as any).mapId !== undefined, {
		timeout: 60000,
	});
	await page.waitForTimeout(500);
}

test.describe("Floating Azgaar help controls", () => {
	test.beforeEach(async ({ context, page }) => {
		await context.clearCookies();
		await page.goto("/");
		await page.evaluate(() => {
			localStorage.clear();
			sessionStorage.clear();
		});
		await page.goto("/?seed=test-tour-prompt&width=1280&height=720");
		await waitForMapLoad(page);
	});

	test("help and tour bubbles are not shown over the map", async ({ page }) => {
		await expect(page.locator("#tourPromptButton")).toHaveCount(0);
		await expect(page.locator("#chat-widget-container")).toBeHidden();
	});
});
