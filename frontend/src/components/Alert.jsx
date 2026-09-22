export default function Alert({ kind = "error", children, onDismiss }) {
  if (!children) return null;

  const styles =
    kind === "error"
      ? "border-clay-500/40 bg-clay-500/10 text-clay-500"
      : "border-amber-500/40 bg-amber-500/10 text-amber-400";

  return (
    <div
      role="alert"
      className={`flex items-start justify-between gap-3 rounded-md border px-4 py-3 text-sm ${styles}`}
    >
      <span>{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 text-current opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  );
}
