import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { initials, formatDate, tenure } from "../utils/format.js";
import { ComplexityBadge, StartedBadge } from "../components/Badges.jsx";

describe("initials", () => {
  test("builds initials from a two-word name", () => {
    expect(initials("Alice Johnson")).toBe("AJ");
  });

  test("returns empty string for an empty name", () => {
    expect(initials("")).toBe("");
  });

  test("uses only the first two words for longer names", () => {
    expect(initials("Mary Jane Watson")).toBe("MJ");
  });
});

describe("formatDate", () => {
  test("formats an ISO date string into a readable form", () => {
    expect(formatDate("2023-01-15")).toMatch(/Jan/);
  });

  test("returns an em dash placeholder for a missing date", () => {
    expect(formatDate(undefined)).toBe("—");
  });
});

describe("tenure", () => {
  test("returns 'Less than a year' for a very recent start date", () => {
    const recent = new Date();
    recent.setMonth(recent.getMonth() - 1);
    expect(tenure(recent.toISOString().slice(0, 10))).toBe(
      "Less than a year"
    );
  });
});

describe("ComplexityBadge", () => {
  test("renders the complexity label", () => {
    render(<ComplexityBadge value="High" />);
    expect(screen.getByText("High")).toBeInTheDocument();
  });
});

describe("StartedBadge", () => {
  test("shows 'In progress' when the project has started", () => {
    render(<StartedBadge hasStarted={true} />);
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  test("shows 'Not started' when the project has not started yet", () => {
    render(<StartedBadge hasStarted={false} />);
    expect(screen.getByText("Not started")).toBeInTheDocument();
  });
});
