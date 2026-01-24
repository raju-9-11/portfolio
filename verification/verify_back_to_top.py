from playwright.sync_api import sync_playwright, expect

def test_back_to_top(page):
    page.goto("http://localhost:5173")

    # Wait for page load
    page.wait_for_load_state("networkidle")

    # Get the back to top button
    # It might be hard to find by text if it's an arrow, but let's try aria-label
    button = page.locator("button[aria-label='Back to Top']")

    # Check if it exists
    expect(button).to_be_attached()

    # Check initial state (should be opacity 0, but visibility visible)
    # We use evaluate to check computed style

    visible_style = button.evaluate("el => getComputedStyle(el).visibility")
    opacity_style = button.evaluate("el => getComputedStyle(el).opacity")

    print(f"Initial State - Visibility: {visible_style}, Opacity: {opacity_style}")

    # It should be hidden visually but present in DOM
    # If visibility is 'visible', it's a focus trap for keyboard users

    if visible_style == 'visible' and float(opacity_style) == 0:
        print("ISSUE CONFIRMED: Button is invisible (opacity 0) but has visibility: visible")
    else:
        print("Issue not detected or button state is different")

    # Scroll down to make it appear
    page.evaluate("window.scrollTo(0, 1000)")
    page.wait_for_timeout(1000) # Wait for transition

    opacity_style_scrolled = button.evaluate("el => getComputedStyle(el).opacity")
    print(f"Scrolled State - Opacity: {opacity_style_scrolled}")

    page.screenshot(path="verification/back_to_top.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        test_back_to_top(page)
        browser.close()
