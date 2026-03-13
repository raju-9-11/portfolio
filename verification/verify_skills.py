from playwright.sync_api import sync_playwright, expect
import re
import time

def verify_skills(page):
    print("Navigating to home...")
    page.goto("http://localhost:5173")

    # Handle Boot Sequence
    print("Handling boot sequence...")
    try:
        skip_button = page.get_by_role("button", name=re.compile(r"Skip", re.IGNORECASE))
        if skip_button.is_visible():
            skip_button.click()
            print("Clicked skip button.")
        else:
            print("Skip button not visible, maybe already loaded?")
    except Exception as e:
        print(f"Error handling skip button: {e}")

    # Wait for main content
    page.wait_for_selector("text=Skills", timeout=10000)
    print("Main content loaded.")

    # Scroll to Skills section
    skills_section = page.locator("text=Skills").first
    skills_section.scroll_into_view_if_needed()

    # Wait a bit for animations
    time.sleep(1)

    # Verify accessibility attributes on progress bars
    print("Verifying ARIA attributes...")
    progress_bars = page.get_by_role("progressbar")
    count = progress_bars.count()
    print(f"Found {count} progress bars.")

    if count == 0:
        raise Exception("No progress bars found with role='progressbar'")

    for i in range(count):
        bar = progress_bars.nth(i)

        # Check aria-valuenow
        val_now = bar.get_attribute("aria-valuenow")
        print(f"Bar {i}: aria-valuenow={val_now}")
        if not val_now:
            raise Exception(f"Bar {i} missing aria-valuenow")

        # Check aria-labelledby
        labelled_by = bar.get_attribute("aria-labelledby")
        print(f"Bar {i}: aria-labelledby={labelled_by}")
        if not labelled_by:
            raise Exception(f"Bar {i} missing aria-labelledby")

        # Verify the label exists
        label_el = page.locator(f"#{labelled_by}")
        if not label_el.is_visible():
             raise Exception(f"Label element with id {labelled_by} not visible")
        print(f"Label text: {label_el.text_content()}")

    print("All checks passed.")
    page.screenshot(path="verification/skills_a11y.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_skills(page)
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()
