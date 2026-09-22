import { sql } from "../config/db.js";

/**
 * IDs are generated app-side (not DB sequences/UUIDs) by querying the max
 * existing numeric suffix for the scope and incrementing — same scheme as
 * TechCare's generateId.ts. Formats:
 *   Employee: EMP-NNNN   (never resets, monotonic)
 *   Project:  PRJ-NNNN   (never resets, monotonic)
 */
function nextSequence(rows, prefix) {
  if (rows.length === 0) return 1;
  const lastId = rows[0].id_col; // e.g. "EMP-0007"
  const lastNum = parseInt(lastId.replace(`${prefix}-`, ""), 10);
  return Number.isNaN(lastNum) ? 1 : lastNum + 1;
}

export async function generateEmployeeId() {
  const rows = await sql`
    SELECT employee_id AS id_col FROM employees
    ORDER BY id DESC LIMIT 1
  `;
  const n = nextSequence(rows, "EMP");
  return `EMP-${String(n).padStart(4, "0")}`;
}

export async function generateProjectId() {
  const rows = await sql`
    SELECT project_id AS id_col FROM projects
    ORDER BY id DESC LIMIT 1
  `;
  const n = nextSequence(rows, "PRJ");
  return `PRJ-${String(n).padStart(4, "0")}`;
}
