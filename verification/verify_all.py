from playwright.sync_api import sync_playwright

def verify_all_widths():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        widths = [
            {"w": 375, "h": 667, "name": "mobile_small"},
            {"w": 768, "h": 1024, "name": "tablet"},
            {"w": 1440, "h": 900, "name": "desktop_wide"}
        ]

        for config in widths:
            try:
                page = browser.new_page(viewport={"width": config["w"], "height": config["h"]})
                page.goto("http://localhost:5173")
                # Wait for boot sequence to finish (approx 4-5s)
                page.wait_for_timeout(6000)
                path = f"verification/layout_{config['name']}.png"
                page.screenshot(path=path, full_page=True)
                print(f"Screenshot taken for {config['name']}.")
                page.close()
            except Exception as e:
                print(f"Error for {config['name']}: {e}")

        browser.close()

if __name__ == "__main__":
    verify_all_widths()
