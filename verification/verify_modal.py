from playwright.sync_api import sync_playwright

def verify_modal_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            # 1. Load the app (wait for boot sequence)
            print("Loading app...")
            page.goto("http://localhost:5173")

            page.wait_for_timeout(1000)
            print("Attempting to skip boot sequence...")
            page.keyboard.press("Escape")

            print("Waiting for main content...")
            page.wait_for_selector('text=SYSTEM STATUS: ONLINE', timeout=10000)

            # 2. Verify Cyberpunk Theme Modal
            print("Verifying Cyberpunk Modal...")

            # Find and click "View All" button in Certifications section
            # We need to find the specific button.
            # Certifications is usually in grid area "L" or just by text.
            # Button text: "View All (x)"
            view_all_btn = page.locator("button:has-text('View All')")
            view_all_btn.scroll_into_view_if_needed()
            view_all_btn.click()

            page.wait_for_timeout(1000)

            # Screenshot Modal
            page.screenshot(path="verification/modal_cyberpunk.png")
            print("Captured verification/modal_cyberpunk.png")

            # Close modal
            close_btn = page.locator("button[aria-label='Close Modal']")
            close_btn.click()
            page.wait_for_timeout(500)

            # 3. Switch to Professional Theme
            print("Switching to Professional Theme...")
            switcher = page.get_by_text("[ SWITCH_MODE ]")
            switcher.click()
            page.wait_for_timeout(1000)

            # Open Modal again
            view_all_btn.click()
            page.wait_for_timeout(1000)

            # Screenshot Modal Professional
            page.screenshot(path="verification/modal_professional.png")
            print("Captured verification/modal_professional.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_modal.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_modal_layout()
