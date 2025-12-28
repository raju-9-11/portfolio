from playwright.sync_api import sync_playwright

def verify_themes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a context with local storage access if needed,
        # but for fresh start, standard context is fine.
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            # 1. Load the app (wait for boot sequence)
            print("Loading app...")
            page.goto("http://localhost:5173")

            # The boot sequence takes some time or can be skipped.
            # Let's try to skip it by pressing Escape, or wait for it.
            # BootSequence component has:
            # useEffect(() => { ... window.addEventListener('keydown', handleSkip); ... })
            # where handleSkip checks e.key === 'Escape'

            # Wait a bit for the component to mount
            page.wait_for_timeout(1000)
            print("Attempting to skip boot sequence...")
            page.keyboard.press("Escape")

            # Wait for main content (SystemAlert or BentoGrid)
            # The BentoGrid appears after bootComplete is true.
            print("Waiting for main content...")
            page.wait_for_selector('text=SYSTEM STATUS: ONLINE', timeout=10000)

            # 2. Verify Cyberpunk Theme (Default)
            print("Verifying Cyberpunk Theme...")
            # Check for specific cyberpunk elements
            # e.g., ASCII icons, Scanlines

            # Screenshot Cyberpunk
            page.screenshot(path="verification/theme_cyberpunk.png")
            print("Captured verification/theme_cyberpunk.png")

            # 3. Switch Theme
            print("Switching to Professional Theme...")
            # Find the switcher. Text is "[ SWITCH_MODE ]" in cyberpunk mode.
            switcher = page.get_by_text("[ SWITCH_MODE ]")
            switcher.click()

            # Wait for transition (CSS transition is 0.3s)
            page.wait_for_timeout(1000)

            # 4. Verify Professional Theme
            print("Verifying Professional Theme...")
            # Check for Light Mode text or specific styles
            # The switcher text changes to "Light Mode"

            # Screenshot Professional
            page.screenshot(path="verification/theme_professional.png")
            print("Captured verification/theme_professional.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_themes()
