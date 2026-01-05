from playwright.sync_api import sync_playwright

def verify_buttons():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:3000")

        # Wait for boot sequence (skip with Escape or wait)
        # We can press escape to skip boot sequence if implemented
        page.keyboard.press("Escape")

        # Wait for the main content to load
        page.wait_for_selector("#contact-section", state="attached", timeout=10000)

        # Find the "View Resume" button
        resume_btn = page.locator("button[aria-label='View Resume']")
        if resume_btn.count() > 0:
            print("Found View Resume button")
            # Verify it's a button
            tag_name = resume_btn.evaluate("el => el.tagName")
            print(f"View Resume tag: {tag_name}")
            assert tag_name == "BUTTON", f"Expected BUTTON, got {tag_name}"
        else:
            print("View Resume button not found")

        # Find the "Say Hello" button (Contact for Fun)
        contact_btn = page.locator("button[aria-label='Contact for Fun']")
        if contact_btn.count() > 0:
            print("Found Contact button")
            tag_name = contact_btn.evaluate("el => el.tagName")
            print(f"Contact tag: {tag_name}")
            assert tag_name == "BUTTON", f"Expected BUTTON, got {tag_name}"
        else:
            print("Contact button not found")

        # Take a screenshot of the Hero section
        page.screenshot(path="verification/hero_buttons.png")

        browser.close()

if __name__ == "__main__":
    verify_buttons()
