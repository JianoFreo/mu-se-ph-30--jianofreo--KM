import { useMemo, useState } from "react";
import Avatar from "../components/Avatar.jsx";
import SearchInput from "../components/SearchInput.jsx";
import Alert from "../components/Alert.jsx";
import EmployeeDetail from "../components/EmployeeDetail.jsx";
import AddEmployeeModal from "../components/AddEmployeeModal.jsx";
import { formatDate } from "../utils/format.js";

export default function EmployeesPage({
  employees,
  loading,
  error,
  onAddEmployee,
  onDeleteEmployee,
}) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [actionError, setActionError] = useState("");

  const departments = useMemo(() => {
    const set = new Set(employees.map((e) => e.department));
    return ["All", ...Array.from(set).sort()];
  }, [employees]);

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchesQuery = e.name.toLowerCase().includes(query.toLowerCase());
      const matchesDept = department === "All" || e.department === department;
      return matchesQuery && matchesDept;
    });
  }, [employees, query, department]);

  async function handleDelete(employee) {
    setActionError("");
    try {
      await onDeleteEmployee(employee.employee_id);
      setSelected(null);
    } catch (err) {
      setActionError(
        err?.response?.data?.error || "Failed to delete employee."
      );
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink-100">
            Employee Directory
          </h1>
          <p className="mt-1 text-sm text-ink-400">
            {employees.length} employee{employees.length === 1 ? "" : "s"} across{" "}
            {departments.length - 1} departments
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-amber-400"
        >
          + Add employee
        </button>
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search employees by name…"
        />
        <div className="flex flex-wrap gap-1.5">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setDepartment(d)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                department === d
                  ? "bg-ink-100 text-ink-950"
                  : "bg-ink-800 text-ink-300 hover:bg-ink-700"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Alert onDismiss={() => setActionError("")}>{actionError}</Alert>
        <Alert>{error}</Alert>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-ink-400">Loading employees…</p>
        ) : filtered.length === 0 ? (
          <p className="rounded-md border border-dashed border-ink-700 px-6 py-10 text-center text-sm text-ink-400">
            No employees match your search.
          </p>
        ) : (
          <ul className="divide-y divide-ink-800 rounded-lg border border-ink-800">
            {filtered.map((emp) => (
              <li key={emp.employee_id}>
                <button
                  onClick={() => setSelected(emp)}
                  className="flex w-full items-center gap-4 px-5 py-3.5 text-left hover:bg-ink-900"
                >
                  <Avatar name={emp.name} src={emp.img_url} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-100">
                      {emp.name}
                    </p>
                    <p className="truncate text-xs text-ink-400">
                      {emp.title} · {emp.department}
                    </p>
                  </div>
                  <p className="hidden shrink-0 text-xs text-ink-500 sm:block">
                    Joined {formatDate(emp.start_date)}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <EmployeeDetail
          employee={selected}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
        />
      )}

      {showAdd && (
        <AddEmployeeModal
          onClose={() => setShowAdd(false)}
          onSubmit={onAddEmployee}
        />
      )}
    </div>
  );
}
