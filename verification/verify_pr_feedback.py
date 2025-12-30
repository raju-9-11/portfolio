import time
from playwright.sync_api import sync_playwright

def verify_pr_feedback():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to verify the modal width increase
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        try:
            page.goto("http://localhost:5173")
            page.keyboard.press("Escape")

            # Wait for Resume button
            page.wait_for_selector('[aria-label="View Resume"]', timeout=10000)

            # Open Modal
            page.get_by_label("View Resume").click()
            print("Clicked Resume button.")

            # Wait for modal content
            # The iframe should NOT be visible initially
            # We check for the buttons
            page.wait_for_selector('button:has-text("Show Preview")', timeout=5000)
            print("Found 'Show Preview' button.")

            # Check if iframe is visible (it shouldn't be)
            iframe = page.query_selector('iframe[title="Resume Preview"]')
            if iframe:
                 print("WARNING: Iframe found in DOM (might be hidden or rendered?)")
                 if page.is_visible('iframe[title="Resume Preview"]'):
                     print("ERROR: Iframe is visible!")
                 else:
                     print("Iframe is hidden/not visible.")
            else:
                 print("Iframe not found in DOM (Correct).")

            # Take screenshot of initial modal state
            page.screenshot(path="verification/modal_initial.png")
            print("Initial modal screenshot saved.")

            # Click Show Preview
            page.click('button:has-text("Show Preview")')
            print("Clicked Show Preview.")

            # Now iframe should appear
            page.wait_for_selector('iframe[title="Resume Preview"]', state="visible", timeout=5000)
            print("Iframe visible.")

            time.sleep(1)

            # Take screenshot of preview state
            page.screenshot(path="verification/modal_preview.png")
            print("Preview modal screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_pr.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_pr_feedback()
