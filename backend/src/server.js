import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import { connectNeon } from "./config/db.js";
import employeesRoute from "./routes/employees.route.js";
import projectsRoute from "./routes/projects.route.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeesRoute);
app.use("/api/projects", projectsRoute);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// In production, serve the built frontend as static files and fall back to
// index.html for any unmatched route (SPA fallback) — same single-service
// deployment pattern as TechCare.
if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

async function startServer() {
  try {
    await connectNeon();
    app.listen(ENV.PORT, () => {
      console.log(`[server] listening on port ${ENV.PORT} (${ENV.NODE_ENV})`);
    });
  } catch (error) {
    console.error("[server] failed to start:", error);
    process.exit(1);
  }
}

startServer();
