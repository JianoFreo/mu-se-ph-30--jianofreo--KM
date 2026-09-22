import Avatar from "./Avatar.jsx";
import { formatDate, tenure } from "../utils/format.js";

export default function EmployeeDetail({ employee, onClose, onDelete }) {
  if (!employee) return null;

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-ink-950/70 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg border border-ink-700 bg-ink-900 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={employee.name} src={employee.img_url} size={56} />
            <div>
              <h2 className="font-display text-xl text-ink-100">
                {employee.name}
              </h2>
              <p className="text-sm text-ink-400">{employee.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ink-400 hover:text-ink-100"
          >
            ✕
          </button>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-ink-500">Employee ID</dt>
            <dd className="mt-0.5 font-mono text-ink-200">
              {employee.employee_id}
            </dd>
          </div>
          <div>
            <dt className="text-ink-500">Department</dt>
            <dd className="mt-0.5 text-ink-200">{employee.department}</dd>
          </div>
          <div>
            <dt className="text-ink-500">Date of birth</dt>
            <dd className="mt-0.5 text-ink-200">
              {formatDate(employee.date_of_birth)}
            </dd>
          </div>
          <div>
            <dt className="text-ink-500">Start date</dt>
            <dd className="mt-0.5 text-ink-200">
              {formatDate(employee.start_date)}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-ink-500">Tenure</dt>
            <dd className="mt-0.5 text-ink-200">{tenure(employee.start_date)}</dd>
          </div>
        </dl>

        <div className="mt-6 flex justify-end gap-2 border-t border-ink-700 pt-4">
          <button
            onClick={() => onDelete(employee)}
            className="rounded-md border border-clay-500/40 px-3 py-1.5 text-sm text-clay-500 hover:bg-clay-500/10"
          >
            Delete employee
          </button>
        </div>
      </div>
    </div>
  );
}
