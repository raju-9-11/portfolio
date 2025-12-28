from playwright.sync_api import sync_playwright
import time

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # 1920x1080 to test layout and button visibility
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()

        print("Navigating to app (Default should be Professional)...")
        page.goto("http://localhost:5173")

        # Verify default theme is Professional (Light)
        # Check background color or text
        # In professional mode, body should be light.
        # But wait, BootSequence might run.
        # If theme is Professional, BootSequence has text "Loading application...".
        # If Cyberpunk, it has "INITIALIZING KERNEL...".

        try:
            page.wait_for_selector('text=Loading application...', timeout=5000)
            print("Verified: Professional Boot Sequence active by default.")
        except:
            print("Error: Did not see Professional Boot Sequence.")
            page.screenshot(path="verification/boot_fail.png")

        # Skip boot just in case
        page.keyboard.press("Escape")
        time.sleep(1)

        # 1. Verify Hero Buttons
        print("Checking Hero Buttons...")
        # Should see "Professional", "Informal", "Playful"
        page.screenshot(path="verification/hero_buttons.png")

        # Check text content
        # Wait for "Professional" to be visible
        try:
            page.wait_for_selector('text=Professional', timeout=2000)
            page.wait_for_selector('text=Informal', timeout=2000)
            page.wait_for_selector('text=Playful', timeout=2000)
            print("Verified: All 3 buttons present.")
        except:
             print("Error: Buttons text not found.")

        # 2. Verify "Playful" button scroll
        print("Testing 'Playful' button scroll...")
        page.click('text=Playful')
        time.sleep(1) # Wait for scroll
        page.screenshot(path="verification/scrolled_to_contact.png")

        # Verify Contact section is visible in viewport
        # We can check if "Contact" header is in viewport
        # Or check scroll position.

        browser.close()

if __name__ == "__main__":
    verify_changes()
