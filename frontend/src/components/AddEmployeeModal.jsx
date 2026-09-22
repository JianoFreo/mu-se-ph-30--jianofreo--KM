import { useState } from "react";
import Alert from "./Alert.jsx";

const empty = {
  name: "",
  department: "",
  title: "",
  dateOfBirth: "",
  startDate: "",
  imgUrl: "",
};

export default function AddEmployeeModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.department || !form.title || !form.dateOfBirth || !form.startDate) {
      setError("Name, department, title, date of birth, and start date are required.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to add employee.");
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
        className="w-full max-w-md rounded-lg border border-ink-700 bg-ink-900 p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-ink-100">Add employee</h2>
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

          <Field label="Full name">
            <input
              className="input"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Department">
              <input
                className="input"
                value={form.department}
                onChange={(e) => update("department", e.target.value)}
              />
            </Field>
            <Field label="Title">
              <input
                className="input"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date of birth">
              <input
                type="date"
                className="input"
                value={form.dateOfBirth}
                onChange={(e) => update("dateOfBirth", e.target.value)}
              />
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
          <Field label="Photo URL (optional)">
            <input
              className="input"
              value={form.imgUrl}
              onChange={(e) => update("imgUrl", e.target.value)}
              placeholder="https://…"
            />
          </Field>
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
            {submitting ? "Adding…" : "Add employee"}
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
