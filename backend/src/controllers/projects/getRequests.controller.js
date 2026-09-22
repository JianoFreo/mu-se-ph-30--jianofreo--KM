import { sql } from "../../config/db.js";
import { hasProjectStarted } from "../../utils/projectLogic.js";

async function attachEmployees(projects) {
  if (projects.length === 0) return [];
  const projectIds = projects.map((p) => p.project_id);
  const links = await sql`
    SELECT pe.project_id, e.employee_id, e.name, e.department, e.title, e.img_url
    FROM project_employees pe
    JOIN employees e ON e.employee_id = pe.employee_id
    WHERE pe.project_id = ANY(${projectIds})
  `;
  return projects.map((p) => ({
    ...p,
    employees: links.filter((l) => l.project_id === p.project_id),
  }));
}

// GET /api/projects — all projects with their employees + a computed
// "started" flag (Logic Check: UI must indicate if a project has already
// started based on the start date)
export async function getAllProjects(req, res) {
  try {
    const projects = await sql`
      SELECT project_id, project_name, description, project_complexity, start_date
      FROM projects
      ORDER BY start_date DESC
    `;
    const withEmployees = await attachEmployees(projects);
    const today = new Date().toISOString().slice(0, 10);
    const enriched = withEmployees.map((p) => ({
      ...p,
      hasStarted: hasProjectStarted(p.start_date, today),
    }));
    res.status(200).json({ message: "Projects fetched", projects: enriched });
  } catch (error) {
    console.error("getAllProjects error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}

// GET /api/projects/:project_id
export async function getProjectById(req, res) {
  try {
    const { project_id } = req.params;
    const rows = await sql`
      SELECT project_id, project_name, description, project_complexity, start_date
      FROM projects
      WHERE project_id = ${project_id}
    `;
    if (rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    const [withEmployees] = await attachEmployees(rows);
    const today = new Date().toISOString().slice(0, 10);
    res.status(200).json({
      message: "Project fetched",
      project: { ...withEmployees, hasStarted: hasProjectStarted(withEmployees.start_date, today) },
    });
  } catch (error) {
    console.error("getProjectById error:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
}

// GET /api/projects/search?name=...
export async function searchProjectsByName(req, res) {
  try {
    const { name = "" } = req.query;
    const projects = await sql`
      SELECT project_id, project_name, description, project_complexity, start_date
      FROM projects
      WHERE project_name ILIKE ${"%" + name + "%"}
      ORDER BY start_date DESC
    `;
    const withEmployees = await attachEmployees(projects);
    const today = new Date().toISOString().slice(0, 10);
    const enriched = withEmployees.map((p) => ({
      ...p,
      hasStarted: hasProjectStarted(p.start_date, today),
    }));
    res.status(200).json({ message: "Search results", projects: enriched });
  } catch (error) {
    console.error("searchProjectsByName error:", error);
    res.status(500).json({ error: "Failed to search projects" });
  }
}
