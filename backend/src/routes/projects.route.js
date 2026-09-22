import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  searchProjectsByName,
} from "../controllers/projects/getRequests.controller.js";
import { addProject } from "../controllers/projects/postRequests.controller.js";

const router = Router();

router.get("/search", searchProjectsByName); // must precede /:project_id
router.get("/", getAllProjects);
router.get("/:project_id", getProjectById);
router.post("/", addProject);

export default router;
