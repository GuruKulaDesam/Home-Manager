# Direct Google account setup

Home Manager uses the Google Identity Services browser token model. It does not need an
OAuth connector, client secret or backend. Google access tokens remain in memory and are
discarded when the page is refreshed or closed.

## Google Cloud configuration

1. Create or select a project in Google Cloud Console.
2. Enable Google Calendar API, Gmail API and Google Drive API.
3. Configure the OAuth consent screen and add both family Google accounts as test users
   while the app remains in testing.
4. Create an OAuth client with application type **Web application**.
5. Add `https://shishyan.github.io` under **Authorized JavaScript origins**.
6. Copy the public client ID ending in `.apps.googleusercontent.com` into Home Manager at
   Settings > App & data.
7. Map the two account emails, record owner consent, save, then connect each account.

No client secret belongs in this repository or in the browser.

## Direct permissions

Home Manager requests scopes only for enabled features:

- `calendar.readonly` for the primary calendar.
- `gmail.readonly` for message search plus subject, sender and snippet metadata.
- `drive.appdata` for a JSON backup in the application's private Drive data folder.
- `openid email` to verify that the selected Google account matches its configured slot.

Google classifies Gmail read-only as a restricted scope. Public production use requires
Google OAuth verification and may require a security assessment. During development, keep
the consent screen in testing and explicitly add both account emails as test users.

## Session behavior

Google issues short-lived access tokens through a user-triggered popup. Tokens are never
written to localStorage, IndexedDB, backups or repository files. Both accounts must be
reconnected after a reload. This is the security tradeoff that allows the static GitHub
Pages app to call Google APIs directly without a token-storing backend.

Calendar events and matching Gmail metadata become local suggestions. They cannot change a
household record until a family member approves them in the Google and SMS review queue.
