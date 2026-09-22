const COMPLEXITY_STYLES = {
  Low: "bg-moss-500/15 text-moss-500 ring-moss-500/30",
  Medium: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
  High: "bg-clay-500/15 text-clay-500 ring-clay-500/30",
  Critical: "bg-red-500/15 text-red-400 ring-red-500/40",
};

export function ComplexityBadge({ value }) {
  const cls = COMPLEXITY_STYLES[value] || COMPLEXITY_STYLES.Low;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${cls}`}
    >
      {value}
    </span>
  );
}

// Logic Check: UI must indicate whether a project has already started,
// based on its start date.
export function StartedBadge({ hasStarted }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
        hasStarted
          ? "bg-ink-800 text-ink-300 ring-ink-600"
          : "bg-amber-500/15 text-amber-400 ring-amber-500/30"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          hasStarted ? "bg-ink-400" : "bg-amber-400"
        }`}
      />
      {hasStarted ? "In progress" : "Not started"}
    </span>
  );
}
