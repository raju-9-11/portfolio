from playwright.sync_api import sync_playwright

def verify_skip_button():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:4173")

        # Wait for the skip button to appear
        skip_button = page.locator("button[aria-label='Skip Boot Sequence']")
        skip_button.wait_for(state="visible", timeout=5000)

        # Take a screenshot of the initial state with the button
        page.screenshot(path="verification/boot_sequence.png")

        # Click the skip button
        skip_button.click()

        # Wait for the home page content (e.g. Identity File button which is unique)
        # Using a timeout to allow animation to complete/skip
        page.locator("button[aria-label='View Resume']").wait_for(state="visible", timeout=5000)

        # Take a screenshot after skipping
        page.screenshot(path="verification/home_page.png")

        browser.close()

if __name__ == "__main__":
    verify_skip_button()
