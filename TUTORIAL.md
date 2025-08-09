# Getting OAuth Credentials

This tutorial will guide you through the process of obtaining OAuth credentials from Facebook, Twitter, and GitHub to use in this application.

## Facebook

1. **Go to Facebook for Developers:** Navigate to [https://developers.facebook.com/](https://developers.facebook.com/) and log in with your Facebook account.
2. **Create a New App:**
    * Click on "My Apps" (تطبيقاتي) in the top right corner.
    * Click "Create App" (إنشاء تطبيق) and select "Consumer" as the app type.
    * Give your app a name and click "Create App".
3. **Get Credentials:**
    * In your app's dashboard, go to "Settings" > "Basic" (الإعدادات > الأساسية).
    * You will find your "App ID" (معرف التطبيق) and "App Secret" (سر التطبيق) here.
4. **Configure Facebook Login:**
    * From the sidebar, under "Facebook Login" (تسجيل دخول فيسبوك), click on "Settings" (الإعدادات).
    * In the "Client OAuth Settings" (إعدادات OAuth للعميل) section, ensure the following are enabled (set to "Yes" or "نعم"):
        * **Client OAuth Login** (تسجيل دخول العميل عبر OAuth)
        * **Web OAuth Login** (تسجيل دخول عبر الويب باستخدام OAuth)
    * **Valid OAuth Redirect URIs:** You can leave this field blank during development. Facebook automatically allows redirects to `localhost` for apps in development mode. You will need to add your production URI here when you deploy your app.
    * Click "Save Changes" (حفظ التغييرات).

## Twitter (X)

1. **Go to Twitter Developer Platform:** Navigate to [https://developer.twitter.com/](https://developer.twitter.com/) and log in with your Twitter/X account.
2. **Create a New Project and App:**
    * Create a new project and then a new app within that project.
3. **Get Credentials:**
    * In your app's dashboard, navigate to the "Keys and tokens" tab.
    * You will find your "API Key" (which is the `TWITTER_CLIENT_ID`) and "API Secret Key" (which is the `TWITTER_CLIENT_SECRET`).
4. **Configure User Authentication Settings:**
    * On the free tier, you have one environment, typically named "Development". These settings apply to that environment.
    * In your app's settings, find the "User authentication settings" section and click "Set up".
    * **App permissions:** Choose the permissions your app requires (e.g., "Read").
    * **Type of App:** Select "Web App, Automated App or Bot".
    * **App info:**
        * **Callback URI / Redirect URL:** Add `http://localhost:3000/api/auth/callback/twitter`.
        * **Website URL:** Add `http://localhost:3000`.
        * Fill in the other optional fields like "Terms of service" and "Privacy policy" if you plan to request user emails.
    * Save the settings.

## GitHub

1. **Go to GitHub Developer Settings:** Navigate to [https://github.com/settings/developers](https://github.com/settings/developers) and log in with your GitHub account.
2. **Create a New OAuth App:**
    * Click on "New OAuth App".
    * Fill in the application details.
    * For "Authorization callback URL", enter `http://localhost:3000/api/auth/callback/github`.
3. **Get Credentials:**
    * After creating the app, you will be taken to the app's page.
    * You will find your "Client ID" here.
    * Click "Generate a new client secret" to get your "Client Secret".

## Using the Credentials

Once you have obtained the credentials for each provider, you need to add them to your `.env` file in the root of the project. Create a `.env.local` file if you don't have one and add the following variables:

```plaintext
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

TWITTER_CLIENT_ID=your_twitter_api_key
TWITTER_CLIENT_SECRET=your_twitter_api_secret_key

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace `your_*` with the actual credentials you obtained.
