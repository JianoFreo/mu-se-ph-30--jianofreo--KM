import { describe, expect, test } from "@jest/globals";
import {
  hasAtLeastOneEmployee,
  hasProjectStarted,
  isValidComplexity,
  VALID_COMPLEXITY,
} from "../utils/projectLogic.js";

describe("hasAtLeastOneEmployee", () => {
  test("returns false for an empty array (a project must have at least one employee)", () => {
    expect(hasAtLeastOneEmployee([])).toBe(false);
  });

  test("returns false when employees is not an array", () => {
    expect(hasAtLeastOneEmployee(undefined)).toBe(false);
    expect(hasAtLeastOneEmployee(null)).toBe(false);
  });

  test("returns true when at least one employee id is present", () => {
    expect(hasAtLeastOneEmployee(["EMP-0001"])).toBe(true);
  });
});

describe("hasProjectStarted", () => {
  test("returns true when the start date is in the past relative to today", () => {
    expect(hasProjectStarted("2020-01-01", "2026-09-22")).toBe(true);
  });

  test("returns false when the start date is in the future relative to today", () => {
    expect(hasProjectStarted("2030-01-01", "2026-09-22")).toBe(false);
  });

  test("treats a start date equal to today as already started", () => {
    expect(hasProjectStarted("2026-09-22", "2026-09-22")).toBe(true);
  });
});

describe("isValidComplexity", () => {
  test.each(VALID_COMPLEXITY)("accepts the known complexity value %s", (value) => {
    expect(isValidComplexity(value)).toBe(true);
  });

  test("rejects an unknown complexity value", () => {
    expect(isValidComplexity("Extreme")).toBe(false);
  });
});
