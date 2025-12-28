from playwright.sync_api import sync_playwright
import time

def verify_updates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        print("Navigating...")
        page.goto("http://localhost:5173")
        page.keyboard.press("Escape")
        time.sleep(1)

        # 1. Verify BackToTop with HTML entity
        print("Scrolling for BackToTop...")
        page.evaluate("window.scrollTo(0, 1000)")
        time.sleep(1)

        btt = page.locator('button[title="Back to Top"]')
        btt.screenshot(path="verification/btt_entity.png")

        # 2. Verify Glitch Effect (Stereoscopic)
        print("Switching to Cyberpunk for Glitch test...")
        page.click('text=Light Mode') # Switch to Cyberpunk
        time.sleep(1)

        print("Hovering over a title...")
        # Hover over "Professional" (which maps to NETWORK_LINK) to see glitch
        # Wait, GlitchText is in PixelCard titles too.
        # Let's hover "EXECUTABLE PROGRAMS" (Projects)
        # Note: Projects title is now "Projects" mapped to "EXECUTABLE PROGRAMS".
        # But in Cyberpunk it renders "EXECUTABLE PROGRAMS".

        # Find an element with "EXECUTABLE PROGRAMS" text.
        try:
            target = page.locator('text=EXECUTABLE PROGRAMS').first
            target.hover()
            time.sleep(0.5)
            page.screenshot(path="verification/glitch_stereoscopic.png")
            print("Screenshot saved.")
        except:
            print("Could not find EXECUTABLE PROGRAMS text.")
            page.screenshot(path="verification/glitch_fail.png")

        browser.close()

if __name__ == "__main__":
    verify_updates()
