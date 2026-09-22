import { sql } from "../../config/db.js";
import { generateProjectId } from "../../utils/generateId.js";
import {
  hasAtLeastOneEmployee,
  hasProjectStarted,
  isValidComplexity,
  VALID_COMPLEXITY,
} from "../../utils/projectLogic.js";

// POST /api/projects — create a new project
// Logic Check: a project must have at least one employee, and each
// employee referenced must already exist.
export async function addProject(req, res) {
  try {
    const {
      projectName,
      description,
      employees, // array of employee_id strings
      projectComplexity,
      startDate,
    } = req.body;

    if (!projectName || !startDate) {
      return res
        .status(400)
        .json({ error: "projectName and startDate are required" });
    }

    if (!hasAtLeastOneEmployee(employees)) {
      return res
        .status(400)
        .json({ error: "A project must have at least one employee" });
    }

    const complexity = projectComplexity || "Low";
    if (!isValidComplexity(complexity)) {
      return res.status(400).json({
        error: `projectComplexity must be one of: ${VALID_COMPLEXITY.join(", ")}`,
      });
    }

    // Validate every referenced employee already exists
    const existing = await sql`
      SELECT employee_id FROM employees WHERE employee_id = ANY(${employees})
    `;
    const existingIds = new Set(existing.map((e) => e.employee_id));
    const missing = employees.filter((id) => !existingIds.has(id));
    if (missing.length > 0) {
      return res.status(400).json({
        error: "One or more employees do not exist",
        missingEmployeeIds: missing,
      });
    }

    const project_id = await generateProjectId();

    const rows = await sql`
      INSERT INTO projects
        (project_id, project_name, description, project_complexity, start_date)
      VALUES
        (${project_id}, ${projectName}, ${description || null}, ${complexity}, ${startDate})
      RETURNING project_id, project_name, description, project_complexity, start_date
    `;

    for (const employee_id of employees) {
      await sql`
        INSERT INTO project_employees (project_id, employee_id)
        VALUES (${project_id}, ${employee_id})
        ON CONFLICT DO NOTHING
      `;
    }

    res.status(201).json({
      message: "Project created",
      project: {
        ...rows[0],
        employees,
        hasStarted: hasProjectStarted(rows[0].start_date),
      },
    });
  } catch (error) {
    console.error("addProject error:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
}
