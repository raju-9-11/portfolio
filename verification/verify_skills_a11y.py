from playwright.sync_api import sync_playwright

def verify_skills_a11y():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to app...")
        page.goto("http://localhost:5173")

        # Handle BootSequence if present
        try:
            skip_btn = page.wait_for_selector('button[aria-label="Skip initialization sequence"]', timeout=5000)
            if skip_btn:
                print("Skipping boot sequence...")
                skip_btn.click()
        except:
            print("No boot sequence or skip button found (might be already skipped or disabled)")

        # Wait for main content
        page.wait_for_selector('h3 >> text=Skills', timeout=10000)
        print("Skills section found.")

        # Find progress bars
        # We expect them to have role="progressbar" eventually, but currently they don't.
        # We'll try to find them by the SkillBar structure if role is missing.

        # This check is what we expect to FAIL initially or PASS after fix.
        progress_bars = page.get_by_role("progressbar").all()

        if len(progress_bars) == 0:
            print("❌ No elements with role='progressbar' found.")
            # Verify we at least see the visual bars
            visual_bars = page.locator('div[class^="sc-"]').filter(has_text="%").all() # This is tricky with styled-components
            # Let's rely on the text content of skills to know the section is loaded
            print("Verifying visual content exists...")
            expect_skill = page.get_by_text("JavaScript")
            if expect_skill.is_visible():
                print("✅ Skill text is visible, but semantics are missing.")
        else:
            print(f"✅ Found {len(progress_bars)} progress bars.")

            for i, bar in enumerate(progress_bars):
                val_now = bar.get_attribute("aria-valuenow")
                label_id = bar.get_attribute("aria-labelledby")

                print(f"Bar {i+1}: aria-valuenow={val_now}, aria-labelledby={label_id}")

                if not val_now:
                    print(f"❌ Bar {i+1} missing aria-valuenow")
                if not label_id:
                     print(f"❌ Bar {i+1} missing aria-labelledby")
                else:
                    # Check if label exists
                    label = page.locator(f"#{label_id}")
                    if label.count() > 0:
                        print(f"   Label text: {label.inner_text()}")
                    else:
                        print(f"❌ Label element with id {label_id} not found")

        browser.close()

if __name__ == "__main__":
    verify_skills_a11y()
