from playwright.sync_api import sync_playwright
import time

def verify_fix():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        print("Navigating to app...")
        page.goto("http://localhost:5173")

        # Default is Professional
        page.wait_for_selector('text=Professional', timeout=5000)

        # Skip boot if needed (Esc)
        page.keyboard.press("Escape")
        time.sleep(1)

        print("Hovering over 'Professional' button...")
        # Hover over the button
        page.hover('text=Professional')
        time.sleep(0.5)

        # Screenshot
        page.screenshot(path="verification/hover_fix.png")
        print("Screenshot saved to verification/hover_fix.png")

        browser.close()

if __name__ == "__main__":
    verify_fix()
