from playwright.sync_api import sync_playwright

def verify_skip_link():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app (assuming it's running on port 5173 from previous step)
        try:
            page.goto("http://localhost:5173")

            # Wait for the boot sequence to complete or skip it
            # The boot sequence has a skip button.
            # It might take a moment to appear.

            # Try to find the skip button.
            try:
                # Wait for skip button
                skip_btn = page.locator("button[aria-label='Skip initialization sequence']")
                if skip_btn.is_visible(timeout=5000):
                    skip_btn.click()
            except:
                print("Skip button not found or not needed")

            # Wait for main content to be visible
            page.wait_for_selector("#main-content", timeout=10000)

            # Now, simulate a Tab key press to focus the first element.
            # Since Skip Link should be the first focusable element.
            page.keyboard.press("Tab")

            # Check if the focused element is the skip link
            focused = page.evaluate("document.activeElement.innerText")
            print(f"Focused element text: {focused}")

            if "Skip to main content" in focused:
                print("SUCCESS: Skip link focused")
            else:
                print("FAILURE: Skip link not focused first")

            # Take a screenshot while focused
            page.screenshot(path="verification/skip_link_focused.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_skip_link()
