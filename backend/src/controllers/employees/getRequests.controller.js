import { sql } from "../../config/db.js";

// GET /api/employees — comprehensive list of all employees
export async function getAllEmployees(req, res) {
  try {
    const employees = await sql`
      SELECT employee_id, name, department, title, date_of_birth,
             start_date, img_url
      FROM employees
      ORDER BY name ASC
    `;
    res.status(200).json({ message: "Employees fetched", employees });
  } catch (error) {
    console.error("getAllEmployees error:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
}

// GET /api/employees/:employee_id — individual employee detail
export async function getEmployeeById(req, res) {
  try {
    const { employee_id } = req.params;
    const rows = await sql`
      SELECT employee_id, name, department, title, date_of_birth,
             start_date, img_url
      FROM employees
      WHERE employee_id = ${employee_id}
    `;
    if (rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee fetched", employee: rows[0] });
  } catch (error) {
    console.error("getEmployeeById error:", error);
    res.status(500).json({ error: "Failed to fetch employee" });
  }
}

// GET /api/employees/search?name=... — search employees by name
export async function searchEmployeesByName(req, res) {
  try {
    const { name = "" } = req.query;
    const employees = await sql`
      SELECT employee_id, name, department, title, date_of_birth,
             start_date, img_url
      FROM employees
      WHERE name ILIKE ${"%" + name + "%"}
      ORDER BY name ASC
    `;
    res.status(200).json({ message: "Search results", employees });
  } catch (error) {
    console.error("searchEmployeesByName error:", error);
    res.status(500).json({ error: "Failed to search employees" });
  }
}
