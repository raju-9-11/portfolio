from playwright.sync_api import sync_playwright
import time

def verify_fix():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        print("Navigating to app...")
        page.goto("http://localhost:5173")

        # Verify text "Say Hello" is visible
        print("Checking for 'Say Hello' button...")
        try:
            page.wait_for_selector('text=Say Hello', timeout=5000)
            print("Verified: 'Say Hello' text present.")
        except:
             print("Error: 'Say Hello' not found.")
             page.screenshot(path="verification/text_fail.png")

        # Skip boot if needed
        page.keyboard.press("Escape")
        time.sleep(1)

        page.screenshot(path="verification/say_hello.png")

        browser.close()

if __name__ == "__main__":
    verify_fix()
