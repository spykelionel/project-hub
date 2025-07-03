import { Router } from "express";
// import controllers (to be implemented)
import * as projectController from "../controllers/project.controller";

const router = Router();

// List all projects in user's org
router.get("/", projectController.listProjects);
// Create a new project
router.post("/", projectController.createProject);
// Get a specific project
router.get("/:id", projectController.getProject);
// Update a project
router.put("/:id", projectController.updateProject);
// Soft delete a project
router.delete("/:id", projectController.deleteProject);

export default router;
