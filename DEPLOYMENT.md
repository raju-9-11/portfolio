# Deployment Instructions

To enable automated deployment to Firebase Hosting via GitHub Actions, you need to generate a Firebase Service Account key and add it as a secret to your GitHub repository.

## Step 1: Generate Service Account Key

1.  Go to the [Google Cloud Console Service Accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts?project=portfolio-pac).
2.  Select your project **portfolio-pac**.
3.  Look for a service account named something like `firebase-adminsdk` or create a new one with the "Firebase App Engine Admin Service Agent" role (or simply "Editor" if you want a quick setup, though more restricted roles are recommended).
    *   *Note: If you used `firebase init` locally in the past, a service account might already exist.*
4.  Click on the **Actions** (three dots) menu for that service account and select **Manage keys**.
5.  Click **Add Key** > **Create new key**.
6.  Select **JSON** as the key type and click **Create**.
7.  A `.json` file containing your private key will download to your computer. **Keep this file secure and do not commit it to the repository.**

## Step 2: Add Secret to GitHub

1.  Go to your GitHub repository.
2.  Navigate to **Settings** > **Secrets and variables** > **Actions**.
3.  Click **New repository secret**.
4.  **Name:** `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_PAC`
5.  **Secret:** Open the JSON file you downloaded in Step 1, copy its entire content, and paste it here.
6.  Click **Add secret**.

## Step 3: Trigger Deployment

Now that the secret is added:

1.  Push a new commit to the `main` branch.
2.  Go to the **Actions** tab in your GitHub repository.
3.  You should see the "Deploy to Firebase Hosting on merge" workflow running.
4.  Once completed, your site will be live at `https://portfolio-pac.web.app` (or your configured domain).
