export const VALID_COMPLEXITY = ["Low", "Medium", "High", "Critical"];

// Logic Check: a project must have at least one employee.
export function hasAtLeastOneEmployee(employees) {
  return Array.isArray(employees) && employees.length > 0;
}

// Logic Check: UI must indicate if a project has already started, based on
// the start date compared to "today" (both as YYYY-MM-DD strings).
export function hasProjectStarted(startDate, today = new Date().toISOString().slice(0, 10)) {
  return startDate <= today;
}

export function isValidComplexity(value) {
  return VALID_COMPLEXITY.includes(value);
}
