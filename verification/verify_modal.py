from playwright.sync_api import sync_playwright

def verify_modal_escape():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app (assuming default Vite port)
        page.goto("http://localhost:5173")

        # Wait for the page to load
        page.wait_for_selector('button[aria-label="Switch to Cyberpunk Mode"]', state='visible', timeout=10000)

        # Open a modal - The "Identity File" / "Resume" button in Hero triggers a modal
        # We need to find the Resume button. It might vary by theme, but Hero has it.
        # "IDENTITY FILE" in Cyberpunk, "Resume" in Modern.
        # Let's try to find a button that opens a modal.

        # Clicking the button that says "IDENTITY FILE" or "Resume"
        # Based on Hero.jsx (memory), it triggers a Modal.

        # Let's look for a button with text "IDENTITY FILE" or "Resume"
        try:
            resume_btn = page.get_by_role("button", name="IDENTITY FILE")
            resume_btn.click(timeout=2000)
        except:
            resume_btn = page.get_by_role("button", name="Resume")
            resume_btn.click()

        # Verify modal is open
        # Modal overlay has role="dialog" now!
        page.wait_for_selector('div[role="dialog"]', state='visible')
        print("Modal opened successfully")

        # Take a screenshot of the open modal
        page.screenshot(path="verification/modal_open.png")

        # Press Escape
        page.keyboard.press("Escape")

        # Verify modal is closed
        # We expect role="dialog" to disappear or be hidden
        page.wait_for_selector('div[role="dialog"]', state='hidden')
        print("Modal closed successfully via Escape key")

        # Take a screenshot after closing
        page.screenshot(path="verification/modal_closed.png")

        browser.close()

if __name__ == "__main__":
    verify_modal_escape()
