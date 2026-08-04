# Home Manager Unified

One dependency-free application combining the meaningful capabilities from all repositories under `GuruKulaDesam` and `shishyan`.

## Workspaces

- **Home:** unified overview, tasks, shared calendar, family wellbeing, expenses, inventory, meal planning, maintenance issues, assets, family wisdom, recognition, contacts and a comprehensive family Life Registry.
- **Community:** Kovaipudur news, discussions, community events, polls, volunteering, civic tickets, local services and civic guides.
- **Study:** JEE overview, syllabus Kanban, schedule, tasks, goals, Pomodoro focus sessions and analytics.

Tasks, events, issues, contacts and recognition use shared context-aware data instead of duplicate stores. The colorful Aurora interface uses teal, violet, purple and green accents over a clean `#fafafa` application background, with translucent operational surfaces and a separately tested high-contrast dark mode.

The command center includes a date-sorted agenda, overdue and low-stock signals, current-month finance totals, seven-day study focus, notifications, context-aware global search, combined filters, calendar month navigation, mobile agenda views, keyboard-accessible study status controls, core record editing, undo for deletions, persistent navigation preferences, validated backup import, quick add and responsive navigation. Data is stored locally in the browser under the versioned `home-manager-unified-v1` key.

## Family Life Registry

The Life Registry adds reusable, searchable records for 16 areas of Indian family life: health, identity documents, bills, insurance, tax, property, vehicles, domestic help, subscriptions, travel and pilgrimage, festivals, emergency planning, pets, digital assets, sustainability, and nominations and legacy. Each area supports adding, editing, deleting, filtering and status tracking, with upcoming dates surfaced on the Today dashboard and in notifications.

Reference fields are intended for masked hints only, such as `ending 1234`. Do not store full Aadhaar or PAN numbers, passwords, banking credentials, medical scans or other secrets. Browser local storage is convenient and private to the device profile, but it is not encrypted. Use the JSON backup controls deliberately and store exported files securely.

## Seven-Level Family Matrix

The primary navigation follows the requirements model in `inputs/Family_Home_Manager_7x7x7x7x7x7x7_Matrix.xlsx`. Seven macro domains appear in the application header, with seven major systems per domain. Selecting a major system opens an on-demand hierarchy explorer for the reusable Minor, Micro, Nano, Pico and Atomic levels.

The matrix contains 823,543 possible atomic paths (`7^7`). These paths are a traceable requirements-coverage universe, not 823,543 claims of implemented functionality. Home Manager generates branches from their numeric node codes and displays an **Open working module** action only when the static application has corresponding functionality.

Open `index.html` directly or publish the repository root with GitHub Pages. No framework, package installation, server or build step is required.

## Source provenance

- Household lineage: `GuruKulaDesam/Home-Manager`, `Divine-Nest`, `DivineNest`, `ShivohM`, and `shishyan/kovaipudur1c`.
- Community lineage: `GuruKulaDesam/Kovaipudur-Edition`, `shishyan/Kovaipudur`, `kovaipudur1a`, and `kovaipudur1b`.
- Study lineage: `shishyan/ProdyJEE`.
- `KMS`, `NammaOorunga`, and `Zysham` contained no application source, so they add no separate product module.

## Static limitations

Firebase/realtime collaboration, Prisma/server authentication, background notifications, bank or UPI feeds, government portals, medical systems, OpenAI/Genkit, payments, municipal APIs, SQLite, Android and Capacitor services require backends or native runtimes. The static application does not claim those integrations are connected. Community votes, registrations, ticket updates and Life Registry records are explicitly local to the current browser.
