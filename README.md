# Home Manager Unified

One dependency-free application combining the meaningful capabilities from all repositories under `GuruKulaDesam` and `shishyan`.

## Workspaces

- **Home:** unified overview, tasks, shared calendar, family wellbeing, expenses, inventory, meal planning, maintenance issues, assets, family wisdom, recognition and contacts.
- **Community:** Kovaipudur news, discussions, community events, polls, volunteering, civic tickets, local services and civic guides.
- **Study:** JEE overview, syllabus Kanban, schedule, tasks, goals, Pomodoro focus sessions and analytics.

Tasks, events, issues, contacts and recognition use shared context-aware data instead of duplicate stores. Global search, quick add, theme, export/import, reset and responsive navigation work across every workspace. Data is stored locally in the browser under the versioned `home-manager-unified-v1` key.

Open `index.html` directly or publish the repository root with GitHub Pages. No framework, package installation, server or build step is required.

## Source provenance

- Household lineage: `GuruKulaDesam/Home-Manager`, `Divine-Nest`, `DivineNest`, `ShivohM`, and `shishyan/kovaipudur1c`.
- Community lineage: `GuruKulaDesam/Kovaipudur-Edition`, `shishyan/Kovaipudur`, `kovaipudur1a`, and `kovaipudur1b`.
- Study lineage: `shishyan/ProdyJEE`.
- `KMS`, `NammaOorunga`, and `Zysham` contained no application source, so they add no separate product module.

## Static limitations

Firebase/realtime collaboration, Prisma/server authentication, OpenAI/Genkit, payments, municipal APIs, SQLite, Android and Capacitor services require backends or native runtimes. The static application does not claim those integrations are connected. Community votes, registrations and ticket updates are explicitly local to the current browser.
