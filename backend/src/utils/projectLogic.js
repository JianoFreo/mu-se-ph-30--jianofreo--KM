export const VALID_COMPLEXITY = ["Low", "Medium", "High", "Critical"];

// A project must have at least one employee.
export function hasAtLeastOneEmployee(employees) {
  return Array.isArray(employees) && employees.length > 0;
}

// A project is started once its start date/time has passed.
export function hasProjectStarted(startDate) {
  if (!startDate) return false;

  const start = new Date(startDate);
  const now = new Date();

  return start < now;
}

export function isValidComplexity(value) {
  return VALID_COMPLEXITY.includes(value);
}