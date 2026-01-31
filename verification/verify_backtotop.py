from playwright.sync_api import sync_playwright

def verify_back_to_top():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app (assuming default Vite port)
        print("Navigating to app...")
        page.goto("http://localhost:5173")

        # Skip boot sequence via Escape key
        print("Skipping boot sequence...")
        page.keyboard.press("Escape")

        # Wait for main content to load (Hero section)
        page.wait_for_selector('h1', state='visible', timeout=10000)

        # Locate BackToTop button
        # Based on aria-label="Back to Top"
        back_to_top_btn = page.locator('button[aria-label="Back to Top"]')

        # Verify initial state: Should exist but be hidden
        print("Verifying initial state (hidden)...")
        # Check CSS visibility
        visibility = back_to_top_btn.evaluate("el => getComputedStyle(el).visibility")
        if visibility != 'hidden':
            print(f"FAILURE: Expected visibility 'hidden', got '{visibility}'")
            exit(1)
        print("SUCCESS: Button is hidden initially.")

        # Scroll down to trigger visibility
        print("Scrolling down...")
        page.evaluate("window.scrollTo(0, 1000)")

        # Wait for transition
        page.wait_for_timeout(1000)

        # Verify visible state
        print("Verifying visible state...")
        visibility = back_to_top_btn.evaluate("el => getComputedStyle(el).visibility")
        if visibility != 'visible':
             print(f"FAILURE: Expected visibility 'visible', got '{visibility}'")
             exit(1)
        print("SUCCESS: Button is visible after scrolling.")

        # Take screenshot
        page.screenshot(path="verification/backtotop_visible.png")
        print("Screenshot taken: verification/backtotop_visible.png")

        # Click button
        print("Clicking Back to Top...")
        back_to_top_btn.click()

        # Verify scroll position returns to 0
        # Wait a bit for smooth scroll
        page.wait_for_timeout(1000)

        scroll_y = page.evaluate("window.scrollY")
        if scroll_y > 10: # Allow small margin for smooth scroll finishing or browser quirk
            print(f"FAILURE: Scroll Y should be near 0, got {scroll_y}")
            # exit(1) # Don't exit yet, check focus
        else:
            print(f"SUCCESS: Scrolled back to top (scrollY: {scroll_y}).")

        # Verify focus moved to body
        print("Verifying focus management...")
        active_element_tag = page.evaluate("document.activeElement.tagName")
        print(f"Active element tag: {active_element_tag}")

        # We expect BODY or maybe HTML depending on browser, but we set focus to body.
        if active_element_tag != "BODY":
             print(f"WARNING: Expected active element to be BODY, got {active_element_tag}")
             if active_element_tag == "BUTTON":
                 print("FAILURE: Focus remained on button!")
                 exit(1)
        else:
             print("SUCCESS: Focus is on BODY.")

        browser.close()

if __name__ == "__main__":
    verify_back_to_top()
