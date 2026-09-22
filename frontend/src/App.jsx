import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import SideBar from "./components/SideBar.jsx";
import EmployeesPage from "./pages/EmployeesPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import { api } from "./lib/axios.js";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [employeesRes, projectsRes] = await Promise.all([
        api.get("/employees"),
        api.get("/projects"),
      ]);
      setEmployees(employeesRes.data.employees);
      setProjects(projectsRes.data.projects);
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          "Failed to load data. Is the backend running?"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleAddEmployee(form) {
    await api.post("/employees", form);
    await loadData();
  }

  async function handleDeleteEmployee(employee_id) {
    await api.delete(`/employees/${employee_id}`);
    await loadData();
  }

  async function handleAddProject(form) {
    await api.post("/projects", form);
    await loadData();
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={
              <EmployeesPage
                employees={employees}
                loading={loading}
                error={error}
                onAddEmployee={handleAddEmployee}
                onDeleteEmployee={handleDeleteEmployee}
              />
            }
          />
          <Route
            path="/projects"
            element={
              <ProjectsPage
                projects={projects}
                employees={employees}
                loading={loading}
                error={error}
                onAddProject={handleAddProject}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
