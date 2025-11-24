import { Router } from "express"
import { TaskController } from "../controllers/task.controller"

const router = Router()

// Reset database (should be first to avoid conflicts)
router.post("/reset", TaskController.resetDatabase)

// Get all tasks
router.get("/", TaskController.getAllTasks)

// Get task by ID
router.get("/:id", TaskController.getTaskById)

// Create task
router.post("/", TaskController.createTask)

// Edit task name
router.put("/:id", TaskController.updateTask)

// Complete task
router.patch("/:id/complete", TaskController.completeTask)

// Delete task
router.delete("/:id", TaskController.deleteTask)

export default router
