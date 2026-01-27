from playwright.sync_api import sync_playwright, expect
import re
import time

def verify_skills_a11y(page):
    # Navigate to the home page (assuming the server is running on localhost:5173)
    page.goto("http://localhost:5173")

    # Wait for the skills section to be visible
    # We can search for the "Skills" heading or text
    page.get_by_text("Skills", exact=True).scroll_into_view_if_needed()

    # Check if we can find progress bars
    progress_bars = page.locator("div[role='progressbar']")
    expect(progress_bars.first).to_be_visible()

    count = progress_bars.count()
    print(f"Found {count} progress bars.")

    # Verify the first progress bar has the correct attributes
    first_bar = progress_bars.first

    # Check aria-valuenow
    aria_valuenow = first_bar.get_attribute("aria-valuenow")
    print(f"First bar aria-valuenow: {aria_valuenow}")
    if not aria_valuenow:
        raise Exception("aria-valuenow is missing")

    # Check aria-labelledby
    aria_labelledby = first_bar.get_attribute("aria-labelledby")
    print(f"First bar aria-labelledby: {aria_labelledby}")
    if not aria_labelledby:
        raise Exception("aria-labelledby is missing")

    # Verify the label exists
    label_element = page.locator(f"#{aria_labelledby}")
    expect(label_element).to_be_visible()
    print(f"Label element text: {label_element.inner_text()}")

    # Take a screenshot
    page.screenshot(path="verification/skills_a11y.png")
    print("Screenshot saved to verification/skills_a11y.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_skills_a11y(page)
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
            raise e
        finally:
            browser.close()
