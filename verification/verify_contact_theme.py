from playwright.sync_api import sync_playwright
import time

def verify_contact_theme():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:5173")

        # Wait for load
        page.wait_for_timeout(2000)

        # Scroll to contact section
        contact_section = page.locator("#contact-section")
        contact_section.scroll_into_view_if_needed()

        # Get inputs
        name_input = page.locator('input[aria-label="Name"]')
        email_input = page.locator('input[aria-label="Email Address"]')
        msg_input = page.locator('textarea[aria-label="Message"]')
        submit_btn = page.locator('button[type="submit"]')

        # Get Theme Switcher
        # The aria-label is dynamic: "Switch to Professional Mode" or "Switch to Cyberpunk Mode"
        # We can find it by its changing text or icon, or try to find it by a partial match

        def get_current_theme():
            # Check body data-theme attribute if possible, but let's rely on placeholders which is what we are testing.
            # Or better, check the theme switcher state.
            # But let's check placeholders.
            ph = name_input.get_attribute("placeholder")
            if "CODENAME" in ph:
                return "cyberpunk"
            else:
                return "professional"

        current = get_current_theme()
        print(f"Initial detected theme: {current}")

        # Expected values
        cyber_ph = {
            "name": "CODENAME (Name)",
            "email": "FREQUENCY (Email)",
            "message": "PAYLOAD (Message)"
        }

        prof_ph = {
            "name": "Your Name",
            "email": "Email Address",
            "message": "How can I help you?"
        }

        # Define check function
        def check_placeholders(theme_name):
            expected = cyber_ph if theme_name == "cyberpunk" else prof_ph

            n_ph = name_input.get_attribute("placeholder")
            e_ph = email_input.get_attribute("placeholder")
            m_ph = msg_input.get_attribute("placeholder")

            print(f"Checking {theme_name} placeholders...")
            print(f"Name: {n_ph} (Expected: {expected['name']})")
            print(f"Email: {e_ph} (Expected: {expected['email']})")
            print(f"Message: {m_ph} (Expected: {expected['message']})")

            assert n_ph == expected['name'], f"Name placeholder mismatch in {theme_name}"
            assert e_ph == expected['email'], f"Email placeholder mismatch in {theme_name}"
            assert m_ph == expected['message'], f"Message placeholder mismatch in {theme_name}"
            print("Placeholders match!")

            # Take screenshot
            page.screenshot(path=f"verification/contact_{theme_name}.png")

        # 1. Verify initial state (should be Professional, but let's see)
        # Note: Before my changes, the code is HARDCODED to Cyberpunk strings even in Professional mode.
        # So this test IS EXPECTED TO FAIL initially on Professional mode checks.

        # To make this script useful for *after* my changes, I will write it assuming the changes are made.
        # But I can run it now to confirm it fails, which is good practice.

        # Switch to Professional if not already
        if current == "cyberpunk":
             print("Switching to Professional...")
             page.locator("button[aria-label*='Switch to']").click()
             page.wait_for_timeout(1000)
             current = "professional"

        # Check Professional Placeholders
        try:
            check_placeholders("professional")
        except AssertionError as e:
            print(f"Caught expected failure (pre-fix): {e}")

        # Switch to Cyberpunk
        print("Switching to Cyberpunk...")
        page.locator("button[aria-label*='Switch to']").click()
        page.wait_for_timeout(1000)

        # Check Cyberpunk Placeholders
        check_placeholders("cyberpunk")

        # Test Validation Error Theming
        print("Testing Validation Error Theming...")
        # Submit empty form
        submit_btn.click()

        # Wait for error text to appear
        page.wait_for_function("document.querySelector('div[role=\"alert\"]').innerText.length > 0")

        alert = page.locator('div[role="alert"]')
        alert_text = alert.inner_text()
        print(f"Alert text (Cyberpunk): {alert_text}")
        assert "INVALID CODENAME" in alert_text, "Expected Cyberpunk error message"

        # Screenshot Error
        page.screenshot(path="verification/contact_error_cyberpunk.png")

        # Switch back to Professional and test error
        print("Switching back to Professional for error test...")
        page.locator("button[aria-label*='Switch to']").click()
        page.wait_for_timeout(1000)

        # Clear status if needed?
        # Clicking submit again should trigger new validation.
        submit_btn.click()

        # Wait for text to change or be present (it might be same text if logic not changed yet)
        page.wait_for_timeout(500)

        alert_text = alert.inner_text()
        print(f"Alert text (Professional): {alert_text}")

        # Screenshot Error
        page.screenshot(path="verification/contact_error_professional.png")

        # This assertion will fail before my changes
        try:
            assert "Name is required" in alert_text or "Please enter your name" in alert_text or "INVALID CODENAME" not in alert_text, "Expected Professional error message"
        except AssertionError as e:
             print(f"Caught expected failure (pre-fix) on error message: {e}")

        browser.close()

if __name__ == "__main__":
    verify_contact_theme()
