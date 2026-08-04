# Home Manager Unified

One dependency-free application combining the meaningful capabilities from all repositories under `GuruKulaDesam` and `shishyan`.

## Product structure

Daily and weekly work is organised into seven plain-language groups: **Today, Household, Family, Money, Care, Learning, and Community**. No group exposes more than seven choices. Permanent or rarely changed records live in seven Settings groups: household profile, people and roles, home and services, money setup, health and safety, records and legacy, and app and data.

Today projects recurring work from those permanent records into one agenda. For example, a policy belongs in Settings, but its renewal remains visible on Today; an appliance belongs in the asset register, but a repair remains in Household. Emergency help is always available in the header and links to official Indian helplines without claiming to dispatch assistance.

Tasks, events, issues, contacts and recognition use shared context-aware data instead of duplicate stores. The colorful Aurora interface uses teal, violet, purple and green accents over a clean `#fafafa` application background, with translucent operational surfaces and a separately tested high-contrast dark mode.

The command center includes a seven-item date-sorted agenda, overdue and low-stock signals, current-month finance totals, seven-day study focus, notifications, context-aware search, combined filters, calendar month navigation, mobile agenda views, keyboard-accessible study status controls, core record editing, undo for deletions, persistent navigation preferences, validated backup import, seven action Quick Add and responsive navigation. Data is stored locally in the browser under the versioned `home-manager-unified-v1` key.

## Product question audit

Help & Guide checks 250 unique questions that family members commonly ask about the software itself: its purpose, navigation, adding and updating records, everyday workflows, family roles and safety, privacy and recovery, accessibility, feedback and known boundaries. The questions are organised into seven usability areas and seven family roles. Each answer opens the working destination, starts the relevant capture workflow, or states an unsupported capability directly.

The audit is available from the permanent sidebar Help & Guide action and under Today. Product answers also appear beside household records in global search, with results capped at seven. A seven-step path connects the command centre, family setup, responsibilities, calendar, money, care and backup without requiring the user to understand the internal data model.

The workflows follow shared calendar, meal, shopping and household-list patterns documented by FamilyWall and Cozi, plus assigned family tasks, recurring dates and reminders documented by Todoist. Emergency help links to official Indian services. Home Manager does not claim background reminders, live location, realtime collaboration, access control or emergency dispatch.

## Household coverage

Reusable records cover health, identity documents, bills, insurance, tax, property, vehicles, domestic help, subscriptions, travel and pilgrimage, festivals, emergency planning, pets, digital assets, sustainability, and nominations and legacy. Each area supports adding, editing, deleting, filtering and status tracking, with upcoming dates surfaced on Today and in notifications.

The supplied `Family_Home_Manager_7x7x7_Unlock_Model.xlsx` informed this separation. Its 49 stable core records map to Settings, while its recurring records, plans, actions, collaboration, safeguards, insights and automation concepts map to operational views. Maturity stages remain a design model, not navigation labels.

The interaction model also draws on proven patterns from Cozi and FamilyWall for a shared family calendar, lists and meals; Monarch for household money collaboration; and 1Password Families for separating private, shared and recovery information. Indian safety and record links point to official ERSS 112, ABHA and DigiLocker services.

Reference fields are intended for masked hints only, such as `ending 1234`. Do not store full Aadhaar or PAN numbers, passwords, banking credentials, medical scans or other secrets. Browser local storage is convenient and private to the device profile, but it is not encrypted. Use the JSON backup controls deliberately and store exported files securely.

Open `index.html` directly or publish the repository root with GitHub Pages. No framework, package installation, server or build step is required.

## Source provenance

- Household lineage: `GuruKulaDesam/Home-Manager`, `Divine-Nest`, `DivineNest`, `ShivohM`, and `shishyan/kovaipudur1c`.
- Community lineage: `GuruKulaDesam/Kovaipudur-Edition`, `shishyan/Kovaipudur`, `kovaipudur1a`, and `kovaipudur1b`.
- Study lineage: `shishyan/ProdyJEE`.
- `KMS`, `NammaOorunga`, and `Zysham` contained no application source, so they add no separate product module.

## Static limitations

Firebase/realtime collaboration, Prisma/server authentication, background notifications, bank or UPI feeds, government portals, medical systems, OpenAI/Genkit, payments, municipal APIs, SQLite, Android and Capacitor services require backends or native runtimes. The static application does not claim those integrations are connected. Community votes, registrations, ticket updates and Life Registry records are explicitly local to the current browser.
