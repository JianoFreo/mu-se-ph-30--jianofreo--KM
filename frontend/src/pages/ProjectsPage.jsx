import { useMemo, useState } from "react";
import SearchInput from "../components/SearchInput.jsx";
import Alert from "../components/Alert.jsx";
import AddProjectModal from "../components/AddProjectModal.jsx";
import { ComplexityBadge, StartedBadge } from "../components/Badges.jsx";
import Avatar from "../components/Avatar.jsx";
import { formatDate } from "../utils/format.js";

export default function ProjectsPage({
  projects,
  employees,
  loading,
  error,
  onAddProject,
}) {
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    return projects.filter((p) =>
      p.project_name.toLowerCase().includes(query.toLowerCase())
    );
  }, [projects, query]);

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink-100">
            Project Management
          </h1>
          <p className="mt-1 text-sm text-ink-400">
            {projects.length} project{projects.length === 1 ? "" : "s"} tracked
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-amber-400"
        >
          + New project
        </button>
      </header>

      <div className="mt-6">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search projects by name…"
        />
      </div>

      <div className="mt-4">
        <Alert>{error}</Alert>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-sm text-ink-400">Loading projects…</p>
        ) : filtered.length === 0 ? (
          <p className="rounded-md border border-dashed border-ink-700 px-6 py-10 text-center text-sm text-ink-400">
            No projects match your search.
          </p>
        ) : (
          filtered.map((p) => {
            const isOpen = expanded === p.project_id;
            return (
              <div
                key={p.project_id}
                className="rounded-lg border border-ink-800 bg-ink-900"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : p.project_id)}
                  className="flex w-full flex-wrap items-center gap-3 px-5 py-4 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg text-ink-100">
                      {p.project_name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-ink-500">
                      {p.employees.length} employee
                      {p.employees.length === 1 ? "" : "s"} · Starts{" "}
                      {formatDate(p.start_date)}
                    </p>
                  </div>
                  <ComplexityBadge value={p.project_complexity} />
                  <StartedBadge hasStarted={p.hasStarted} />
                </button>

                {isOpen && (
                  <div className="border-t border-ink-800 px-5 py-4">
                    {p.description && (
                      <p className="text-sm text-ink-300">{p.description}</p>
                    )}
                    <p className="mt-4 mb-2 text-xs uppercase tracking-wide text-ink-500">
                      Team
                    </p>
                    <ul className="flex flex-wrap gap-3">
                      {p.employees.map((emp) => (
                        <li
                          key={emp.employee_id}
                          className="flex items-center gap-2 rounded-full bg-ink-800 py-1 pl-1 pr-3"
                        >
                          <Avatar name={emp.name} src={emp.img_url} size={24} />
                          <span className="text-xs text-ink-200">
                            {emp.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {showAdd && (
        <AddProjectModal
          employees={employees}
          onClose={() => setShowAdd(false)}
          onSubmit={onAddProject}
        />
      )}
    </div>
  );
}
