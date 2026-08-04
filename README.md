# Home Manager Unified

One dependency-free application combining the meaningful capabilities from all repositories under `GuruKulaDesam` and `shishyan`.

## Product structure

Daily and weekly work is organised into seven plain-language groups: **Today, Household, Family, Money, Care, Learning, and Community**. No group exposes more than seven choices. The active group opens its pages directly in the main sidebar. Permanent or rarely changed preferences use only three Settings groups: household profile, people and roles, and app and data.

Today projects recurring work into one agenda. Operational sections own every financial input: vehicle insurance and fuel stay in Vehicles, health insurance and care costs stay in Health, groceries stay in Food, education fees stay in Learning, and utilities, loans and subscriptions stay with Property. **Money is reporting-only** and consolidates Budget, Cash flow, Spending, Commitments, Net worth and Reports. Emergency help remains available from the right utility rail and links to official Indian helplines without claiming to dispatch assistance.

Tasks, events, issues, contacts and recognition use shared context-aware data instead of duplicate stores. The colorful interface uses seven accessible icon and tab tones over twelve locally stored mountain photographs, with highly translucent operational surfaces, alternating table bands and no dark register banners.

The command center includes a seven-item date-sorted agenda, overdue and low-stock signals, current-month finance totals, seven-day study focus, notifications, icon-triggered context-aware search, route-aware header KPIs, expandable sidebar page navigation, combined filters, calendar month navigation, mobile agenda views, keyboard-accessible study status controls, core record editing, undo for deletions, persistent appearance preferences, validated backup import, seven action Quick Add and responsive navigation. The top identity row and right utility rail have no shell background, leaving the selected mountain photograph visible. Data is stored locally in the browser under the versioned `home-manager-unified-v1` key.

## Product question audit

Help & Guide checks 250 unique questions that family members commonly ask about the software itself: its purpose, navigation, adding and updating records, everyday workflows, family roles and safety, privacy and recovery, accessibility, feedback and known boundaries. The questions are organised into seven usability areas and seven family roles. Each answer opens the working destination, starts the relevant capture workflow, or states an unsupported capability directly.

The audit is available from the permanent sidebar Help & Guide action and under Today. Product answers also appear beside household records in global search, with results capped at seven. A seven-step path connects the command centre, family setup, responsibilities, calendar, money, care and backup without requiring the user to understand the internal data model.

The workflows follow shared calendar, meal, shopping and household-list patterns documented by FamilyWall, Cozi and AnyList; cleaning routines documented by Tody; and assigned family tasks, recurring dates and reminders documented by Todoist. Money uses planning and reporting patterns documented by YNAB, Monarch and Quicken Simplifi: fixed, flexible and non-monthly plans, goals, recurring commitments, cash flow, watchlists and net worth. Emergency help links to official Indian services. Home Manager does not claim bank feeds, background reminders, live location, realtime collaboration, access control or emergency dispatch.

## Household coverage

Reusable records cover health, identity documents, bills, insurance, tax, property, vehicles, domestic help, subscriptions, travel and pilgrimage, festivals, emergency planning, pets, digital assets, sustainability, and nominations and legacy. Each area supports adding, editing, deleting, filtering and status tracking, with upcoming dates surfaced on Today and in notifications.

The supplied `Family_Home_Manager_7x7x7_Unlock_Model.xlsx` informed this separation. Stable household identity, people, consent, sync preferences, appearance, privacy and backup map to Settings. Assets, records, plans, actions, collaboration, safeguards and insights map to the seven operational groups. Maturity stages remain a design model, not navigation labels.

The interaction model also draws on 1Password Families for separating private, shared and recovery information. These are adapted interaction patterns, not copied source code or branding. Indian safety and record links point to official ERSS 112, ABHA and DigiLocker services.

Reference fields are intended for masked hints only, such as `ending 1234`. Do not store full Aadhaar or PAN numbers, passwords, banking credentials, medical scans or other secrets. Browser local storage is convenient and private to the device profile, but it is not encrypted. Use the JSON backup controls deliberately and store exported files securely.

Open `index.html` directly or publish the repository root with GitHub Pages. No framework, package installation, server or build step is required.

## Source provenance

- Household lineage: `GuruKulaDesam/Home-Manager`, `Divine-Nest`, `DivineNest`, `ShivohM`, and `shishyan/kovaipudur1c`.
- Community lineage: `GuruKulaDesam/Kovaipudur-Edition`, `shishyan/Kovaipudur`, `kovaipudur1a`, and `kovaipudur1b`.
- Study lineage: `shishyan/ProdyJEE`.
- `KMS`, `NammaOorunga`, and `Zysham` contained no application source, so they add no separate product module.

## Static limitations

Firebase/realtime collaboration, server authentication, background notifications, bank or UPI feeds, government portals, medical systems, payments, municipal APIs and native services require backends or native runtimes. The static application does not claim those integrations are connected. Community votes, registrations, ticket updates and Life Registry records are explicitly local to the current browser.

App & data Settings now model a secure Google connector: HTTPS endpoint, per-family-member email mapping and consent, Calendar/Gmail/Drive preferences, seven detection groups, review policy and manual sync. These preferences contain no tokens or message bodies. Actual Google account sync is deliberately disabled until a separately deployed OAuth backend provides encrypted refresh-token storage, household authorization, a database and scheduled or Pub/Sub jobs. Gmail read-only access is a restricted Google scope and must complete Google's verification requirements before production email analysis.
