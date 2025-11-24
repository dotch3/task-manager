import { Request, Response } from "express"
import { TaskService } from "../services/task.service"
import { CreateTaskRequest, EditTaskRequest } from "../types/task.types"
import { DuplicateTaskError, TaskNotFoundError, TaskCompletedError } from "../types/errors.types"

export class TaskController {
    static getAllTasks(req: Request, res: Response): void {
        try {
            const tasks = TaskService.getAllTasks()
            res.json(tasks)
        } catch (error) {
            console.error("Error getting all tasks:", error)
            res.status(500).json({ error: "Failed to retrieve tasks" })
        }
    }

    static getTaskById(req: Request, res: Response): void {
        try {
            const task = TaskService.getTaskById(req.params.id)
            res.json(task)
        } catch (error) {
            if (error instanceof TaskNotFoundError) {
                res.status(404).json({ error: error.message })
                return
            }
            console.error("Error getting task by ID:", error)
            res.status(500).json({ error: "Failed to retrieve task" })
        }
    }

    static createTask(req: Request, res: Response): void {
        try {
            const { name }: CreateTaskRequest = req.body

            // Validation
            if (!name || name.trim().length === 0) {
                res.status(400).json({ error: "Name is required" })
                return
            }

            if (name.length > 250) {
                res.status(400).json({ error: "Name must not exceed 250 characters" })
                return
            }

            const task = TaskService.createTask(name)
            res.status(201).json({
                message: `Task created successfully`,
                id: task.id,
                name: task.name,
            })
        } catch (error) {
            if (error instanceof DuplicateTaskError) {
                res.status(409).json({ error: error.message })
                return
            }
            console.error("Error creating task:", error)
            res.status(500).json({ error: "Failed to create task" })
        }
    }

    static updateTask(req: Request, res: Response): void {
        try {
            const { name }: EditTaskRequest = req.body

            // Validation
            if (!name || name.trim().length === 0) {
                res.status(400).json({ error: "Name is required" })
                return
            }

            if (name.length > 250) {
                res.status(400).json({ error: "Name must not exceed 250 characters" })
                return
            }

            // This will check:
            // 1. If task exists (throws TaskNotFoundError)
            // 2. If task is completed (throws TaskCompletedError)
            // 3. If new name is duplicate (throws DuplicateTaskError)
            const task = TaskService.updateTaskName(req.params.id, name)
            res.json({
                message: `Task updated successfully`,
                id: task.id,
                name: task.name,
            })
        } catch (error) {
            if (error instanceof TaskNotFoundError) {
                res.status(404).json({ error: error.message })
                return
            }
            if (error instanceof TaskCompletedError) {
                res.status(422).json({ error: error.message })
                return
            }
            if (error instanceof DuplicateTaskError) {
                res.status(409).json({ error: error.message })
                return
            }
            console.error("Error updating task:", error)
            res.status(500).json({ error: "Failed to update task" })
        }
    }

    static completeTask(req: Request, res: Response): void {
        try {
            const task = TaskService.completeTask(req.params.id)
            res.json({
                message: `Task marked as DONE`,
                id: task.id,
                name: task.name,
                status: "DONE",
            })
        } catch (error) {
            if (error instanceof TaskNotFoundError) {
                res.status(404).json({ error: error.message })
                return
            }
            console.error("Error completing task:", error)
            res.status(500).json({ error: "Failed to complete task" })
        }
    }

    static deleteTask(req: Request, res: Response): void {
        try {
            // Get task info before deleting
            const task = TaskService.getTaskById(req.params.id)
            TaskService.deleteTask(req.params.id)

            res.json({
                message: `Task deleted successfully`,
                id: task.id,
                name: task.name,
            })
        } catch (error) {
            if (error instanceof TaskNotFoundError) {
                res.status(404).json({ error: error.message })
                return
            }
            console.error("Error deleting task:", error)
            res.status(500).json({ error: "Failed to delete task" })
        }
    }

    static resetDatabase(_req: Request, res: Response): void {
        try {
            const result = TaskService.resetDatabase()
            res.json(result)
        } catch (error) {
            console.error("Error resetting database:", error)
            res.status(500).json({ error: "Failed to reset database" })
        }
    }
}
