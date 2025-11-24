import db from "../database/db"
import { Task } from "../types/task.types"
import { DuplicateTaskError, TaskNotFoundError, TaskCompletedError } from "../types/errors.types"
import { v4 as uuidv4 } from "uuid"
import { databaseConfig } from "../config/database.config"

export class TaskService {
    static seedInitialData(): void {
        const count = db.prepare("SELECT COUNT(*) as count FROM tasks").get() as { count: number }

        if (count.count === 0) {
            console.log("   📝 Database is empty. Inserting default tasks...")
            const now = new Date().toISOString()
            const stmt = db.prepare(
                "INSERT INTO tasks (id, name, is_done, created_date, updated_time) VALUES (?, ?, ?, ?, ?)"
            )

            const insertMany = db.transaction((tasks) => {
                for (const task of tasks) {
                    stmt.run(uuidv4(), task.name, task.is_done ? 1 : 0, now, now)
                }
            })

            insertMany(databaseConfig.seedData)
            console.log(`   ✅ Inserted ${databaseConfig.seedData.length} default tasks`)
        } else {
            console.log(`   ℹ️  Database already contains ${count.count} task(s). Skipping seed.`)
        }
    }

    static resetDatabase(): { message: string; tasksCount: number } {
        // Delete all tasks
        db.prepare("DELETE FROM tasks").run()

        // Re-seed with default data
        const now = new Date().toISOString()
        const stmt = db.prepare(
            "INSERT INTO tasks (id, name, is_done, created_date, updated_time) VALUES (?, ?, ?, ?, ?)"
        )

        const insertMany = db.transaction((tasks) => {
            for (const task of tasks) {
                stmt.run(uuidv4(), task.name, task.is_done ? 1 : 0, now, now)
            }
        })

        insertMany(databaseConfig.seedData)

        return {
            message: "Database has been reset to default state",
            tasksCount: databaseConfig.seedData.length,
        }
    }

    /**
     * Check if a task name already exists (case-insensitive, trimmed)
     * @param name - Task name to check
     * @param excludeId - Optional task ID to exclude from check (for updates)
     * @returns true if name exists, false otherwise
     */
    static taskNameExists(name: string, excludeId?: string): boolean {
        const trimmedName = name.trim()

        let query = "SELECT COUNT(*) as count FROM tasks WHERE LOWER(TRIM(name)) = LOWER(?)"
        const params: any[] = [trimmedName]

        if (excludeId) {
            query += " AND id != ?"
            params.push(excludeId)
        }

        const result = db.prepare(query).get(...params) as { count: number }
        return result.count > 0
    }

    static getAllTasks(): Task[] {
        const rows = db.prepare("SELECT * FROM tasks ORDER BY created_date DESC").all()
        return rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            is_done: Boolean(row.is_done),
            created_date: row.created_date,
            updated_time: row.updated_time,
        }))
    }

    static getTaskById(id: string): Task {
        const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as any

        if (!row) {
            throw new TaskNotFoundError()
        }

        return {
            id: row.id,
            name: row.name,
            is_done: Boolean(row.is_done),
            created_date: row.created_date,
            updated_time: row.updated_time,
        }
    }

    static createTask(name: string): Task {
        const trimmedName = name.trim()

        // Check for duplicate name (case-insensitive)
        if (this.taskNameExists(trimmedName)) {
            throw new DuplicateTaskError()
        }

        const id = uuidv4()
        const now = new Date().toISOString()
        const task: Task = {
            id,
            name: trimmedName,
            is_done: false,
            created_date: now,
            updated_time: now,
        }

        db.prepare("INSERT INTO tasks (id, name, is_done, created_date, updated_time) VALUES (?, ?, ?, ?, ?)").run(
            task.id,
            task.name,
            task.is_done ? 1 : 0,
            task.created_date,
            task.updated_time
        )

        return task
    }
    static updateTaskName(id: string, name: string): Task {
        const trimmedName = name.trim()

        // Check if task exists - will throw TaskNotFoundError if not found
        const existingTask = this.getTaskById(id)

        // Check if task is already marked as DONE
        if (existingTask.is_done) {
            throw new TaskCompletedError()
        }

        // If the name is the same (case-insensitive), just return the existing task without updating
        if (existingTask.name.toLowerCase().trim() === trimmedName.toLowerCase()) {
            return existingTask
        }

        // Check for duplicate name (excluding the current task) - will throw DuplicateTaskError if found
        if (this.taskNameExists(trimmedName, id)) {
            throw new DuplicateTaskError()
        }

        const now = new Date().toISOString()

        db.prepare("UPDATE tasks SET name = ?, updated_time = ? WHERE id = ?").run(trimmedName, now, id)

        // Get and return the updated task
        return this.getTaskById(id)
    }

    static completeTask(id: string): Task {
        // Check if task exists first
        const existingTask = this.getTaskById(id)

        const now = new Date().toISOString()

        db.prepare("UPDATE tasks SET is_done = ?, updated_time = ? WHERE id = ?").run(1, now, id)

        // Get and return the updated task
        return this.getTaskById(id)
    }

    static deleteTask(id: string): boolean {
        // Check if task exists first
        this.getTaskById(id)

        const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id)
        return result.changes > 0
    }
}
