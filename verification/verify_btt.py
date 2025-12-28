from playwright.sync_api import sync_playwright
import time

def verify_btt():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        print("Navigating...")
        page.goto("http://localhost:5173")
        page.keyboard.press("Escape")
        time.sleep(1)

        print("Scrolling...")
        page.evaluate("window.scrollTo(0, 1000)")
        time.sleep(1)

        print("Screenshotting BackToTop (Professional)...")
        # Locator for the button
        btt = page.locator('button[title="Back to Top"]')
        btt.screenshot(path="verification/btt_prof.png")

        print("Switching to Cyberpunk...")
        page.click('text=Light Mode') # Switcher text in Prof mode
        time.sleep(1)

        print("Screenshotting BackToTop (Cyberpunk)...")
        btt.screenshot(path="verification/btt_cyber.png")

        browser.close()

if __name__ == "__main__":
    verify_btt()
