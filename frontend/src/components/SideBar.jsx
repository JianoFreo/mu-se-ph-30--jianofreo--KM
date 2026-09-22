import { NavLink } from "react-router";

const links = [
  { to: "/", label: "Employees", icon: EmployeesIcon },
  { to: "/projects", label: "Projects", icon: ProjectsIcon },
];

export default function SideBar() {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-ink-700 bg-ink-900">
      <div className="px-6 py-7">
        <p className="font-display text-2xl italic text-ink-100">Roster</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-ink-400">
          Employee &amp; Project Directory
        </p>
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-ink-800 text-amber-400"
                  : "text-ink-300 hover:bg-ink-800/60 hover:text-ink-100",
              ].join(" ")
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-6 py-5 text-xs text-ink-500">
        <p>Data source: PostgreSQL</p>
      </div>
    </aside>
  );
}

function EmployeesIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <circle cx="17" cy="8.5" r="2.4" />
      <path d="M15.5 14.3c2.6.2 4.5 2.2 4.5 5.2" />
    </svg>
  );
}

function ProjectsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3.5" y="6" width="17" height="13" rx="1.5" />
      <path d="M8 6V4.8A1.3 1.3 0 0 1 9.3 3.5h5.4A1.3 1.3 0 0 1 16 4.8V6" />
      <path d="M3.5 11h17" />
    </svg>
  );
}
