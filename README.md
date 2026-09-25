# Employee & Project Directory

A full-stack internal tool for browsing the employee directory and managing
projects — built as a monorepo.

Client deployed on Github pages using Github actions build the React app. https://jianofreo.github.io/mu-se-ph-30--jianofreo--KM/

the server runs on render

## Stack

- **Backend**: Node.js, Express, JavaScript ESM (`"type": "module"`), no ORM —
  `@neondatabase/serverless`'s tagged-template `sql` client talking directly
  to Neon Postgres. Schema lives in `backend/src/config/db.js` as
  `CREATE TABLE IF NOT EXISTS` statements — no separate migration files.
- **Frontend**: React 19, Vite, Tailwind CSS, `react-router`, `axios`.
- **Tests**: Jest (backend), Vitest + Testing Library (frontend).
- **CI/CD**: GitHub Actions — runs both test suites, builds the frontend,
  and deploys it to GitHub Pages on every push to `main`.

## Repository layout

```
EmployeeProjectTracker/
├── package.json                # root: delegates to backend/frontend via --prefix
├── backend/
│   ├── package.json            # dev: nodemon, start: node, test: jest
│   └── src/
│       ├── server.js           # Express app entrypoint, mounts routers
│       ├── config/
│       │   ├── db.js           # Neon client + schema (source of truth)
│       │   ├── env.js          # process.env wrapper
│       │   └── seed.js         # loads the sample employees/projects data
│       ├── routes/
│       │   ├── employees.route.js
│       │   └── projects.route.js
│       ├── controllers/
│       │   ├── employees/      # getRequests / postRequests / deleteRequest
│       │   └── projects/       # getRequests / postRequests
│       ├── utils/
│       │   ├── generateId.js   # EMP-#### / PRJ-#### ID generation
│       │   └── projectLogic.js # the Logic Check rules (pure, unit-tested)
│       └── __tests__/
│           └── projectLogic.test.js
└── frontend/
    ├── package.json            # dev: vite, build: vite build, test: vitest
    └── src/
        ├── App.jsx             # shell: owns state, loadData(), routing
        ├── main.jsx
        ├── lib/axios.js        # shared axios instance
        ├── utils/format.js     # date/initials/tenure helpers
        ├── components/         # SideBar, SearchInput, Avatar, Badges,
        │                       # Alert, EmployeeDetail, AddEmployeeModal,
        │                       # AddProjectModal
        ├── pages/
        │   ├── EmployeesPage.jsx
        │   └── ProjectsPage.jsx
        └── __tests__/
            └── format.test.jsx
```

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

