import { sql } from "../../config/db.js";
import { generateEmployeeId } from "../../utils/generateId.js";

// POST /api/employees — add an employee
export async function addEmployee(req, res) {
  try {
    const { name, department, title, dateOfBirth, startDate, imgUrl } =
      req.body;

    if (!name || !department || !title || !dateOfBirth || !startDate) {
      return res.status(400).json({
        error:
          "name, department, title, dateOfBirth, and startDate are required",
      });
    }

    const employee_id = await generateEmployeeId();

    const rows = await sql`
      INSERT INTO employees
        (employee_id, name, department, title, date_of_birth, start_date, img_url)
      VALUES
        (${employee_id}, ${name}, ${department}, ${title}, ${dateOfBirth}, ${startDate}, ${imgUrl || null})
      RETURNING employee_id, name, department, title, date_of_birth, start_date, img_url
    `;

    res.status(201).json({ message: "Employee added", employee: rows[0] });
  } catch (error) {
    console.error("addEmployee error:", error);
    res.status(500).json({ error: "Failed to add employee" });
  }
}
