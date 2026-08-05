# Direct Google account setup

Home Manager uses the Google Identity Services browser token model. It does not need an
OAuth connector, client secret or backend. Google access tokens remain in memory and are
discarded when the page is refreshed or closed.

## Google Cloud configuration

1. Create or select a project in Google Cloud Console.
2. Enable the APIs used by the workflows you want: Google Calendar, Gmail, Drive, People,
   Tasks, Classroom, Sheets, Docs and Slides APIs. APIs not enabled in the Cloud project
   return an explicit Google API error when their page action is used.
3. Configure the OAuth consent screen and add all four family Google accounts as test users
   while the app remains in testing.
4. Create an OAuth client with application type **Web application**.
5. Add `https://shishyan.github.io` under **Authorized JavaScript origins**.
6. Copy the public client ID ending in `.apps.googleusercontent.com` into Home Manager at
   Settings > App & data.
7. Map the four account emails to their family members, record separate owner consent and
   save. The Connect action authorizes Gmail intelligence and scheduled sync; Drive,
   Contacts, Calendar/Meet, Tasks, Classroom, Sheets, Docs and Slides request their own
   permission only when a family member uses that feature in its owning page.

No client secret belongs in this repository or in the browser.

## Direct permissions

Home Manager requests scopes only for enabled features:

- `calendar.readonly` for the primary calendar.
- `gmail.readonly` for message search plus subject, sender and snippet metadata.
- `drive.appdata` for a JSON backup in the application's private Drive data folder.
- `openid email` to verify that the selected Google account matches its configured slot.

Page-level Workspace actions use incremental authorization:

- `drive.file` for files the app creates or the user explicitly shares with it, including
  Sheets, Docs and Slides created by Home Manager. It does not grant unrestricted Drive
  browsing.
- `contacts.readonly` to review contacts before importing selected people.
- `calendar` to create events and optional Google Meet conference links.
- `tasks` to list, create and complete Google Tasks.
- `classroom.courses.readonly` and `classroom.coursework.me.readonly` to review a learner's
  active Classroom work before import.

Google Keep is intentionally not presented as a personal-account connector. Google's Keep
API is an enterprise administration API that requires Google Workspace domain-wide
delegation. Quick Notes therefore stay local; a family member can explicitly send a note
to Google Tasks or Google Docs instead.

Google classifies Gmail read-only as a restricted scope. Public production use requires
Google OAuth verification and may require a security assessment. During development, keep
the consent screen in testing and explicitly add all four account emails as test users.

## Session behavior

Google issues short-lived access tokens through a user-triggered popup. Tokens are never
written to localStorage, IndexedDB, backups or repository files. All four accounts must be
reconnected after a reload. This is the security tradeoff that allows the static GitHub
Pages app to call Google APIs directly without a token-storing backend.

Calendar events and matching Gmail metadata become local suggestions. Contacts, Calendar
events, Tasks and Classroom work also require an explicit import action before they become
Home Manager records.
