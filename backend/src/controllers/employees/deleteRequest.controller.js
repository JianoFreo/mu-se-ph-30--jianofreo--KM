import { sql } from "../../config/db.js";

// DELETE /api/employees/:employee_id
// A project must always have at least one employee (Logic Check), so an
// employee who is the *sole* member of any project cannot be deleted —
// that project would be left with zero employees.
export async function deleteEmployee(req, res) {
  try {
    const { employee_id } = req.params;

    const existing = await sql`
      SELECT employee_id FROM employees WHERE employee_id = ${employee_id}
    `;
    if (existing.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const blockingProjects = await sql`
      SELECT p.project_id, p.project_name
      FROM project_employees pe
      JOIN projects p ON p.project_id = pe.project_id
      WHERE pe.project_id IN (
        SELECT project_id FROM project_employees
        GROUP BY project_id HAVING COUNT(*) = 1
      )
      AND pe.employee_id = ${employee_id}
    `;

    if (blockingProjects.length > 0) {
      return res.status(409).json({
        error:
          "Cannot delete: this employee is the only member of at least one project",
        projects: blockingProjects,
      });
    }

    await sql`DELETE FROM employees WHERE employee_id = ${employee_id}`;
    res.status(200).json({ message: "Employee deleted", employee_id });
  } catch (error) {
    console.error("deleteEmployee error:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
}
