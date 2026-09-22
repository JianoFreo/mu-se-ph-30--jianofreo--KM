import { neon } from "@neondatabase/serverless";
import { ENV } from "./env.js";

// Tagged-template SQL client. No ORM — every query in this codebase uses
// this `sql` export with interpolated ${} params (never string-concat).
export const sql = neon(ENV.DATABASE_URL);

/**
 * Schema is created imperatively here with CREATE TABLE IF NOT EXISTS.
 * This file is the single source of truth for the schema — there are no
 * separate migration files. Starting the backend against a fresh Neon
 * database is sufficient to provision everything.
 */
export async function connectNeon() {
  await sql`
    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      employee_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      title TEXT NOT NULL,
      date_of_birth DATE NOT NULL,
      start_date DATE NOT NULL,
      img_url TEXT,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      project_id TEXT UNIQUE NOT NULL,
      project_name TEXT NOT NULL,
      description TEXT,
      project_complexity TEXT NOT NULL DEFAULT 'Low',
      start_date DATE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  // Join table — a project must reference at least one existing employee
  // (enforced at the controller/validation layer, not by the DB, since
  // Postgres has no native "at least one row" constraint on a join table).
  await sql`
    CREATE TABLE IF NOT EXISTS project_employees (
      project_id TEXT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
      employee_id TEXT NOT NULL REFERENCES employees(employee_id) ON DELETE CASCADE,
      PRIMARY KEY (project_id, employee_id)
    )
  `;

  console.log("[db] schema ready (employees, projects, project_employees)");
}
