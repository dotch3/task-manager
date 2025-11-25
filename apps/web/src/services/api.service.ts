import axios from "axios"
import type { Task, CreateTaskRequest, UpdateTaskRequest } from "../types/task.types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export const taskService = {
    // Get all tasks
    getAllTasks: async (): Promise<Task[]> => {
        console.log("Fetching tasks from:", `${API_URL}/tasks`) // Debug
        const response = await api.get<Task[]>("/tasks")
        console.log("Tasks received:", response.data) // Debug
        return response.data
    },

    // Get task by ID
    getTaskById: async (id: string): Promise<Task> => {
        const response = await api.get<Task>(`/tasks/${id}`)
        return response.data
    },

    // Create task
    createTask: async (data: CreateTaskRequest): Promise<Task> => {
        const response = await api.post("/tasks", data)
        console.log("Create task response:", response.data) // Debug
        return response.data.task
    },

    // Update task name
    updateTask: async (id: string, data: UpdateTaskRequest): Promise<Task> => {
        const response = await api.put(`/tasks/${id}`, data)
        return response.data.task
    },

    // Mark task as complete
    completeTask: async (id: string): Promise<Task> => {
        const response = await api.patch(`/tasks/${id}/complete`)
        return response.data.task
    },

    // Delete task
    deleteTask: async (id: string): Promise<void> => {
        await api.delete(`/tasks/${id}`)
    },

    // Reset database
    resetDatabase: async (): Promise<void> => {
        await api.post("/tasks/reset")
    },
}
