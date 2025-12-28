from playwright.sync_api import sync_playwright
import time

def verify_fixes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a wide viewport to test alignment
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()

        print("Navigating to app...")
        page.goto("http://localhost:5173")
        page.keyboard.press("Escape") # Skip boot
        time.sleep(1)

        # 1. Verify Layout Alignment
        print("Checking Layout on 1920px screen...")
        # We want to see if the content is centered.
        # Taking a screenshot of the top area
        page.screenshot(path="verification/layout_wide.png")

        # 2. Verify BackToTop
        print("Checking BackToTop icon...")
        page.evaluate("window.scrollTo(0, 1000)")
        time.sleep(1) # Wait for fade in
        # Screenshot the bottom right
        page.screenshot(path="verification/back_to_top.png", clip={'x': 1850, 'y': 950, 'width': 70, 'height': 130})

        browser.close()

if __name__ == "__main__":
    verify_fixes()
