export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full max-w-sm">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
      >
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M19.5 19.5 15 15" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-ink-700 bg-ink-900 py-2 pl-9 pr-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-amber-500"
      />
    </div>
  );
}
