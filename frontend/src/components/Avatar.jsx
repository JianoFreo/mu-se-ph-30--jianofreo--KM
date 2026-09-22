import { useState } from "react";
import { initials } from "../utils/format.js";

export default function Avatar({ name, src, size = 40 }) {
  const [failed, setFailed] = useState(false);
  const dim = { width: size, height: size };

  if (!src || failed) {
    return (
      <div
        style={dim}
        className="flex shrink-0 items-center justify-center rounded-full bg-ink-700 font-display text-sm text-amber-400"
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      style={dim}
      onError={() => setFailed(true)}
      className="shrink-0 rounded-full object-cover"
    />
  );
}
