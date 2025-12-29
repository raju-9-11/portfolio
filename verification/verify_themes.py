from playwright.sync_api import sync_playwright

def verify_themes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Test 1: Desktop View (Modern)
        print("Testing Desktop Modern...")
        page = browser.new_page(viewport={'width': 1440, 'height': 900})
        page.goto('http://localhost:5173')

        # Wait for content to load
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000)

        # Take screenshot of Modern Mode (Default)
        page.screenshot(path='verification/modern_desktop.png', full_page=True)
        print("Desktop Modern screenshot saved.")

        # Test 2: Mobile View (Modern)
        print("Testing Mobile Modern...")
        mobile_page = browser.new_page(viewport={'width': 375, 'height': 667})
        mobile_page.goto('http://localhost:5173')
        mobile_page.wait_for_load_state('networkidle')
        mobile_page.wait_for_timeout(2000)
        mobile_page.screenshot(path='verification/modern_mobile.png', full_page=True)
        print("Mobile Modern screenshot saved.")
        mobile_page.close()

        # Test 3: Cyberpunk Mode (Switching)
        print("Testing Theme Switch to Cyberpunk...")
        # Reload desktop page to ensure clean state
        page.reload()
        page.wait_for_load_state('networkidle')

        # Try to find the theme switcher.
        # Based on ThemeSwitcher.jsx, it has an onClick on the container.
        # It contains icons (FaSun, FaMoon, etc.) or text "Modern Mode" / "SWITCH_MODE"

        # We will try to click the container div that has the text "Modern Mode" or the Sun Icon
        try:
            # Try specific text first
            page.click("text=Modern Mode", timeout=2000)
        except:
            print("Text 'Modern Mode' not found, trying generic button/icon click...")
            # Fallback: finding the switcher by structure or icon.
            # The switcher has FaSun/FaMoon. Let's look for an SVG inside a div at the top/bottom.
            # Or use a more generic locator if we can identify it.
            # Let's try to click the first SVG that is likely the theme toggle.
            # Assuming it's in the header or near top.
            # Since we don't have exact test ids, we'll try a loose selector.
            buttons = page.locator("svg")
            # Usually theme switcher is one of the first few icons or distinct.
            # Let's try clicking the text "Light Mode" if "Modern Mode" wasn't found (maybe strict mode issue)
            # Actually, let's just click the body to focus and then try a generic 'button' role if it exists,
            # but ThemeSwitcher is a div with onClick.

            # Strategy: Click the element containing "Modern Mode" text again with force?
            # Or assume it might be "Light Mode" if my replace didn't work? (But I did replace it).

            # Let's try locating by the sun icon class or structure if possible, but strict selectors are better.
            # Let's try: page.locator("div").filter(has_text="Modern Mode").click()
            # If text is somehow capitalized differently or hidden
            # Try clicking the switcher container directly if we can find it by icon presence
            # FaSun is usually <svg ...>
            page.locator("svg").first.click()

        page.wait_for_timeout(2000) # Wait for transition
        page.screenshot(path='verification/cyberpunk_desktop.png', full_page=True)
        print("Cyberpunk screenshot saved.")

        browser.close()

if __name__ == "__main__":
    verify_themes()
