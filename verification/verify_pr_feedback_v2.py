import time
from playwright.sync_api import sync_playwright

def verify_pr_feedback_v2():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        try:
            page.goto("http://localhost:5173")
            page.keyboard.press("Escape")

            # Wait for Resume button
            page.wait_for_selector('[aria-label="View Resume"]', timeout=10000)

            # Open Modal
            page.get_by_label("View Resume").click()
            print("Clicked Resume button.")

            # Wait for modal content (Close button is reliable)
            page.wait_for_selector('button[aria-label="Close Modal"]', timeout=5000)
            print("Modal opened.")

            # 1. Verify 'Show Preview' button is GONE
            show_preview_btn = page.query_selector('button:has-text("Show Preview")')
            if show_preview_btn:
                print("ERROR: 'Show Preview' button still exists!")
            else:
                print("SUCCESS: 'Show Preview' button is gone.")

            # 2. Verify Iframe is VISIBLE immediately
            iframe = page.wait_for_selector('iframe[title="Resume Preview"]', state="visible", timeout=5000)
            print("SUCCESS: Iframe is visible immediately.")

            # 3. Verify Iframe SRC contains params to hide sidebar
            src = iframe.get_attribute("src")
            print(f"Iframe Source: {src}")
            if "#toolbar=0&navpanes=0&scrollbar=0" in src:
                print("SUCCESS: Iframe src contains correct PDF parameters.")
            else:
                print(f"ERROR: Iframe src missing parameters. Found: {src}")

            time.sleep(1)
            page.screenshot(path="verification/modal_final_v2.png")
            print("Final verification screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_pr_v2.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_pr_feedback_v2()
