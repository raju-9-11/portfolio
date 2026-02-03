import os
import sys
import time
import subprocess
import re
from playwright.sync_api import sync_playwright

def verify_skills():
    print("Starting verification...")

    # Start the dev server
    server_process = subprocess.Popen(
        ["pnpm", "dev"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        preexec_fn=os.setsid
    )

    # Wait for server to start (simple sleep for now, better would be to poll output)
    time.sleep(5)

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            # Capture console errors
            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

            print("Navigating to app...")
            page.goto("http://localhost:5173")

            # Handle Boot Sequence
            # Check if skip button exists
            try:
                skip_button = page.locator("button:has-text('Skip Intro'), button:has-text('[ SKIP_INTRO ]')").first
                if skip_button.is_visible(timeout=5000):
                    print("Skipping boot sequence...")
                    skip_button.click()
            except Exception as e:
                print(f"Boot sequence handling note: {e}")

            # Wait for content to load
            page.wait_for_selector("text=Skills", timeout=10000)

            # Find progress bars
            progress_bars = page.locator("[role='progressbar']")
            count = progress_bars.count()

            print(f"Found {count} progress bars.")

            if count == 0:
                print("FAIL: No progress bars found with role='progressbar'")
                sys.exit(1)

            for i in range(count):
                bar = progress_bars.nth(i)

                # Check aria-valuenow
                value_now = bar.get_attribute("aria-valuenow")
                label_id = bar.get_attribute("aria-labelledby")

                print(f"Bar {i}: valuenow={value_now}, labelledby={label_id}")

                if not value_now:
                    print(f"FAIL: Bar {i} missing aria-valuenow")
                    sys.exit(1)

                if not label_id:
                    print(f"FAIL: Bar {i} missing aria-labelledby")
                    sys.exit(1)

                # Verify label exists
                label = page.locator(f"#{label_id}")
                if not label.count():
                    print(f"FAIL: Label element with id {label_id} not found")
                    sys.exit(1)

            # Check for console errors related to props
            prop_warnings = [err for err in console_errors if "React does not recognize the `level` prop" in err]

            if prop_warnings:
                print("FAIL: Found 'level' prop warnings in console:")
                for w in prop_warnings:
                    print(w)
                sys.exit(1)
            else:
                print("PASS: No 'level' prop warnings found.")

            # Take screenshot
            if not os.path.exists("verification/screenshots"):
                os.makedirs("verification/screenshots")
            page.screenshot(path="verification/screenshots/skills_verified.png", full_page=True)
            print("Screenshot saved to verification/screenshots/skills_verified.png")

            print("SUCCESS: Skills verification passed.")
            browser.close()

    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)
    finally:
        # Kill the server
        os.killpg(os.getpgid(server_process.pid), 15)

if __name__ == "__main__":
    verify_skills()
