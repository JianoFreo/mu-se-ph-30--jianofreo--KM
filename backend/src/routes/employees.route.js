import { Router } from "express";
import {
  getAllEmployees,
  getEmployeeById,
  searchEmployeesByName,
} from "../controllers/employees/getRequests.controller.js";
import { addEmployee } from "../controllers/employees/postRequests.controller.js";
import { deleteEmployee } from "../controllers/employees/deleteRequest.controller.js";

const router = Router();

router.get("/search", searchEmployeesByName); // must precede /:employee_id
router.get("/", getAllEmployees);
router.get("/:employee_id", getEmployeeById);
router.post("/", addEmployee);
router.delete("/:employee_id", deleteEmployee);

export default router;
