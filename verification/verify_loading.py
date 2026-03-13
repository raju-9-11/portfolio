from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app (using the dev server URL)
        page.goto("http://localhost:5173")

        # Wait for the BootSequence to finish or click skip
        # Try to find the skip button and click it
        skip_button = page.get_by_role("button", name="[ SKIP_INTRO ]")
        if skip_button.is_visible():
            skip_button.click()
        else:
            # Fallback for professional mode or if button is slightly different
            skip_button_alt = page.get_by_role("button", name="Skip Intro")
            if skip_button_alt.is_visible():
                skip_button_alt.click()

        # Wait for Hero section to be visible
        expect(page.get_by_role("heading", name="Raj Kumar S")).to_be_visible()

        # Click on the "Identity File" or "Resume" button
        resume_btn = page.get_by_role("button", name="Identity File")
        if not resume_btn.is_visible():
            resume_btn = page.get_by_role("button", name="Resume")

        resume_btn.click()

        # Wait for the modal title - try both themes
        try:
            expect(page.get_by_text("IDENTITY FILE DETECTED")).to_be_visible(timeout=2000)
        except:
            expect(page.get_by_text("Resume Preview")).to_be_visible()

        # Take a screenshot of the open modal
        page.screenshot(path="verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run()
