from playwright.sync_api import sync_playwright

def verify_skills_visual():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        print("Navigating to app...")
        page.goto("http://localhost:5173")

        # Skip boot sequence
        try:
            skip_btn = page.wait_for_selector('button[aria-label="Skip initialization sequence"]', timeout=5000)
            if skip_btn:
                skip_btn.click()
        except:
            pass

        # Wait for skills section
        page.wait_for_selector('h3 >> text=Skills', timeout=10000)

        # Scroll to skills
        skills_section = page.locator('h3 >> text=Skills').locator('..').locator('..')
        skills_section.scroll_into_view_if_needed()

        # Take screenshot
        page.screenshot(path="verification/skills_screenshot.png")
        print("Screenshot saved to verification/skills_screenshot.png")

        browser.close()

if __name__ == "__main__":
    verify_skills_visual()
