export const VALID_COMPLEXITY = ["Low", "Medium", "High", "Critical"];

// A project must have at least one employee.
export function hasAtLeastOneEmployee(employees) {
  return Array.isArray(employees) && employees.length > 0;
}

// A project is started only when its start date has already passed.
export function hasProjectStarted(startDate) {
  const today = new Date().toISOString().slice(0, 10);

  return startDate < today;
}

export function isValidComplexity(value) {
  return VALID_COMPLEXITY.includes(value);
}