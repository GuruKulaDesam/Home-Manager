# Home Manager Connector API

Home Manager is hosted on GitHub Pages. Google OAuth secrets, authorization codes,
refresh tokens, Gmail history cursors and background jobs must run on a separate HTTPS
service. The browser stores only account mappings, consent flags and normalized review
suggestions.

## Browser contract

The connector must allow credentialed CORS requests only from the deployed Home Manager
origin. Cookies must be `Secure`, `HttpOnly` and use an appropriate `SameSite` policy.
Never return Google access or refresh tokens, complete email bodies or attachments.

### Start account consent

`GET /oauth/google/start?personId=p1&loginHint=user@example.com&returnTo=https://shishyan.github.io/Home-Manager/`

The service must create server-side OAuth state bound to the signed-in household session,
request only enabled scopes, complete the authorization-code exchange on its own callback,
encrypt refresh tokens at rest, and redirect to `returnTo` without credentials in the URL.

### Check both accounts

`GET /api/home-manager/status`

```json
{
  "accounts": [
    {
      "personId": "p1",
      "email": "parent@example.com",
      "status": "connected",
      "lastSync": "2026-08-05T10:30:00Z"
    }
  ],
  "suggestions": []
}
```

### Run synchronization

`POST /api/home-manager/sync`

The service should use Calendar read-only access for events and the minimum Gmail scope
needed for enabled email analysis. It can return normalized suggestions immediately or
return `{ "status": "queued" }` and expose results through the status endpoint.

```json
{
  "status": "complete",
  "accounts": [],
  "suggestions": [
    {
      "externalId": "gmail-message-or-calendar-event-id",
      "source": "gmail",
      "personId": "p1",
      "category": "bills",
      "title": "Electricity bill due",
      "summary": "Payment due on 18 August",
      "sender": "Electricity provider",
      "receivedAt": "2026-08-05T09:00:00Z",
      "amount": 1850
    }
  ]
}
```

Allowed sources are `gmail` and `calendar`. Allowed categories are `bills`, `travel`,
`school`, `health`, `deliveries`, `home` and `government`. Home Manager validates, masks,
deduplicates and truncates connector output before saving it locally. Every suggestion
requires review.

## Google configuration

Create a Google Cloud OAuth web client and register the connector callback exactly. Use
incremental authorization and show the account owner why each scope is required. Gmail
read-only is a restricted scope; a public production app may require OAuth verification
and a security assessment when restricted data is transmitted or stored by the service.

## Phone SMS

The static website cannot read an Android inbox. Settings accepts a local SMS Backup &
Restore-style XML file or normalized JSON and performs analysis entirely in the browser.
OTPs are discarded and long numeric identifiers are masked.

Automatic SMS inbox access requires a separately installed Android application. Google
Play normally limits SMS permissions to eligible apps that act as the default SMS handler
or qualify for a policy exception. Do not add a server upload endpoint for raw SMS backups.
