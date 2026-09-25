# Employee & Project Directory

A full-stack internal tool for browsing the employee directory and managing
projects — built as a monorepo.

Client deployed on Github pages using Github actions build the React app. https://jianofreo.github.io/mu-se-ph-30--jianofreo--KM/

the server runs on render


## Requirements coverage

**Employee Directory** — list, view detail, filter by department, add,
delete, search by name.

**Project Management** — create projects with name, description,
employees, complexity (Low/Medium/High/Critical), and start date; search
by name.

**Logic Checks** (`backend/src/utils/projectLogic.js`, unit-tested):
- A project must have at least one employee (enforced server-side on
  create, and an employee who is the sole member of a project cannot be
  deleted).
- The UI shows an "In progress" / "Not started" badge based on the
  project's start date vs. today.
- Errors and warnings surface inline via the `Alert` component (e.g.
  missing required fields, an employee that can't be deleted).

**Unit tests**: 11 backend (Jest) + 9 frontend (Vitest) — 20 total,
covering the Logic Checks, ID/date formatting, and badge rendering.

