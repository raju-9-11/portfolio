from playwright.sync_api import sync_playwright

def verify_contact_validation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app (assuming default vite port 5173)
        page.goto("http://localhost:5173")

        # Skip BootSequence
        page.keyboard.press("Escape")

        # Wait for the Contact section to be visible
        contact_header = page.get_by_text("COMMS_UPLINK")
        contact_header.scroll_into_view_if_needed()

        # Test 1: Name too long (>100 chars)
        long_name = "A" * 101
        page.fill("input[placeholder='CODENAME (Name)']", long_name)
        page.fill("input[placeholder='FREQUENCY (Email)']", "valid@email.com")
        page.fill("textarea[placeholder='PAYLOAD (Message)']", "Valid message")

        # Click submit
        page.click("button:has-text('INITIATE UPLOAD')")

        # Expect "INVALID CODENAME"
        page.wait_for_selector("text=INVALID CODENAME")
        page.screenshot(path="verification/error_long_name.png")
        print("Verified long name error")

        # Test 2: Message too long (>1000 chars)
        page.fill("input[placeholder='CODENAME (Name)']", "Sentinel")
        long_message = "M" * 1001
        page.fill("textarea[placeholder='PAYLOAD (Message)']", long_message)
        page.click("button:has-text('INITIATE UPLOAD')")

        # Expect "PAYLOAD ERROR"
        page.wait_for_selector("text=PAYLOAD ERROR")
        page.screenshot(path="verification/error_long_message.png")
        print("Verified long message error")

        # Test 3: Invalid Email (that might pass HTML5 basic check or just to verify logic)
        # Note: HTML5 type="email" catches a lot, but let's try a format that my regex catches
        # My regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ requires a dot in domain part.
        # "user@domain" (no dot) is invalid in my regex.
        # Depending on browser implementation of type="email", it might flag it too.
        # But let's try.
        page.fill("textarea[placeholder='PAYLOAD (Message)']", "Valid message")
        page.fill("input[placeholder='FREQUENCY (Email)']", "user@domain")
        page.click("button:has-text('INITIATE UPLOAD')")

        # If browser catches it, we won't see my error text.
        # If browser allows it, we see "INVALID FREQUENCY".
        # We'll try to wait for it with a short timeout, if not found, maybe browser caught it.
        try:
            page.wait_for_selector("text=INVALID FREQUENCY", timeout=2000)
            page.screenshot(path="verification/error_invalid_email.png")
            print("Verified invalid email error (caught by JS)")
        except:
            print("Browser likely caught the invalid email before JS")

        browser.close()

if __name__ == "__main__":
    verify_contact_validation()
