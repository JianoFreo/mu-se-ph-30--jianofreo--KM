import { useState } from "react";
import Alert from "./Alert.jsx";

const COMPLEXITIES = ["Low", "Medium", "High", "Critical"];

const empty = {
  projectName: "",
  description: "",
  employees: [],
  projectComplexity: "Low",
  startDate: "",
};

export default function AddProjectModal({ employees, onClose, onSubmit }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleEmployee(employee_id) {
    setForm((prev) => {
      const already = prev.employees.includes(employee_id);
      return {
        ...prev,
        employees: already
          ? prev.employees.filter((id) => id !== employee_id)
          : [...prev.employees, employee_id],
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.projectName || !form.startDate) {
      setError("Project name and start date are required.");
      return;
    }
    // Logic Check: a project must have at least one employee.
    if (form.employees.length === 0) {
      setError("Select at least one employee for this project.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to create project.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-ink-950/70 px-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border border-ink-700 bg-ink-900 p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-ink-100">New project</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-ink-400 hover:text-ink-100"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <Alert>{error}</Alert>

          <Field label="Project name">
            <input
              className="input"
              value={form.projectName}
              onChange={(e) => update("projectName", e.target.value)}
            />
          </Field>

          <Field label="Description">
            <textarea
              className="input min-h-20 resize-none"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Complexity">
              <select
                className="input"
                value={form.projectComplexity}
                onChange={(e) => update("projectComplexity", e.target.value)}
              >
                {COMPLEXITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Start date">
              <input
                type="date"
                className="input"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
              />
            </Field>
          </div>

          <div>
            <span className="mb-1.5 block text-sm text-ink-400">
              Employees{" "}
              <span className="text-ink-500">(must include at least one)</span>
            </span>
            <div className="max-h-48 space-y-1 overflow-y-auto rounded-md border border-ink-700 bg-ink-800 p-2">
              {employees.length === 0 ? (
                <p className="px-2 py-1 text-xs text-ink-500">
                  No employees yet — add one first.
                </p>
              ) : (
                employees.map((emp) => (
                  <label
                    key={emp.employee_id}
                    className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm text-ink-200 hover:bg-ink-700"
                  >
                    <input
                      type="checkbox"
                      checked={form.employees.includes(emp.employee_id)}
                      onChange={() => toggleEmployee(emp.employee_id)}
                      className="accent-amber-500"
                    />
                    {emp.name}
                    <span className="text-xs text-ink-500">
                      {emp.department}
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t border-ink-700 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-1.5 text-sm text-ink-300 hover:bg-ink-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-ink-950 hover:bg-amber-400 disabled:opacity-60"
          >
            {submitting ? "Creating…" : "Create project"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-ink-400">{label}</span>
      {children}
    </label>
  );
}
