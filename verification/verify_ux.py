from playwright.sync_api import sync_playwright
import time

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()

        # 1. Verify Boot Sequence (Cyberpunk - Default)
        print("Checking Cyberpunk Boot Sequence...")
        page.goto("http://localhost:5173")
        page.wait_for_selector('text=INITIALIZING KERNEL', timeout=5000)
        page.screenshot(path="verification/1_boot_cyberpunk.png")

        # Skip boot
        page.keyboard.press("Escape")
        time.sleep(1) # Wait for animation

        # 2. Verify System Alert (Cyberpunk)
        print("Checking Cyberpunk System Alert...")
        # System alert appears after 2s
        page.wait_for_timeout(2500)
        page.screenshot(path="verification/2_alert_cyberpunk.png")

        # 3. Verify Glitch Text
        print("Checking Glitch Text in PixelCard...")
        # Hover over "Projects" (Mapped to EXECUTABLE PROGRAMS)
        # Note: Hover screenshot in headless might be tricky, but we can try
        # Projects is likely a header in a PixelCard.
        # Let's find a card title.
        page.wait_for_selector('text=EXECUTABLE PROGRAMS')
        element = page.locator('text=EXECUTABLE PROGRAMS').first
        element.hover()
        time.sleep(0.5)
        page.screenshot(path="verification/3_glitch_hover.png")

        # 4. Verify Theme Switch & Professional Boot
        print("Switching to Professional Theme...")
        # Click theme switcher
        page.click('text=[ SWITCH_MODE ]')
        time.sleep(1) # Wait for transition
        page.screenshot(path="verification/4_professional_home.png")

        # Reload to check Professional Boot
        print("Checking Professional Boot Sequence...")
        page.reload()
        try:
            page.wait_for_selector('text=Loading application...', timeout=5000)
            page.screenshot(path="verification/5_boot_professional.png")
        except:
            print("Failed to find professional boot text")
            page.screenshot(path="verification/5_boot_professional_fail.png")

        # Skip boot
        page.keyboard.press("Escape")
        time.sleep(1)

        # 5. Verify Professional Alert
        print("Checking Professional System Alert...")
        page.wait_for_timeout(2500)
        page.screenshot(path="verification/6_alert_professional.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
