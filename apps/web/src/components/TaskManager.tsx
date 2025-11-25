import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { RefreshCw } from "lucide-react"
import type { Task, TaskStats } from "../types/task.types"
import type { ApiError } from "../types/error.types"
import { taskService } from "../services/api.service"
import TaskList from "./TaskList.tsx"
import TaskForm from "./TaskForm.tsx"
import StatsCards from "./StatsCards.tsx"
import ApiStatus from "./ApiStatus.tsx"
import Dialog from "./Dialog.tsx"

const TaskManager = () => {
    const queryClient = useQueryClient()
    const [newTaskName, setNewTaskName] = useState("")
    const [error, setError] = useState<string | null>(null)

    // Dialog states
    const [showResetDialog, setShowResetDialog] = useState(false)
    const [showErrorDialog, setShowErrorDialog] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // Fetch all tasks
    const {
        data = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: taskService.getAllTasks,
    })

    const tasks = data

    // Calculate stats
    const stats: TaskStats = {
        total: tasks.length,
        completed: tasks.filter((task: Task) => task.is_done).length,
        pending: tasks.filter((task: Task) => !task.is_done).length,
    }

    // Create task mutation
    const createTaskMutation = useMutation({
        mutationFn: taskService.createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            setNewTaskName("")
            setError(null)
        },
        onError: (error: ApiError) => {
            const message = error.response?.data?.error || "Failed to create task"
            setError(message)
            setErrorMessage(message)
            setShowErrorDialog(true)
        },
    })

    // Reset database mutation
    const resetDatabaseMutation = useMutation({
        mutationFn: taskService.resetDatabase,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            setError(null)
        },
        onError: (error: ApiError) => {
            const message = error.response?.data?.error || "Failed to reset database"
            setErrorMessage(message)
            setShowErrorDialog(true)
        },
    })

    const handleCreateTask = (e: React.FormEvent) => {
        e.preventDefault()
        if (newTaskName.trim()) {
            createTaskMutation.mutate({ name: newTaskName.trim() })
        }
    }

    const handleResetClick = () => {
        setShowResetDialog(true)
    }

    const handleResetConfirm = () => {
        resetDatabaseMutation.mutate()
    }

    if (isLoading) {
        return (
            <div className='container'>
                <div className='header'>
                    <h1>📝 Task Manager</h1>
                    <p>Loading tasks...</p>
                    <ApiStatus />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className='container'>
                <div className='header'>
                    <h1>📝 Task Manager</h1>
                    <ApiStatus />
                </div>
                <div className='error-banner'>
                    <strong>Failed to load tasks</strong>
                    <p>Please make sure the API is running on http://localhost:3000</p>
                    <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
                        Start the API with: <code>cd apps/api && npm run dev</code>
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='header'>
                <h1>📝 Task Manager</h1>
                <p>Organize your tasks efficiently</p>
                <ApiStatus />
            </div>

            <StatsCards stats={stats} />

            <div className='card'>
                <TaskForm
                    newTaskName={newTaskName}
                    setNewTaskName={setNewTaskName}
                    onSubmit={handleCreateTask}
                    isLoading={createTaskMutation.isPending}
                    error={error}
                />

                <TaskList tasks={tasks} />

                <div style={{ padding: "1.5rem", paddingTop: 0 }}>
                    <button
                        className='btn btn-reset'
                        onClick={handleResetClick}
                        disabled={resetDatabaseMutation.isPending}
                        title='Reset database to default 3 tasks'
                    >
                        <RefreshCw size={20} />
                        {resetDatabaseMutation.isPending ? "Resetting..." : "Reset Database"}
                    </button>
                </div>
            </div>

            {/* Reset Confirmation Dialog */}
            <Dialog
                isOpen={showResetDialog}
                onClose={() => setShowResetDialog(false)}
                title='Reset Database?'
                message='Are you sure you want to reset the database? This will delete all tasks and restore the 3 default tasks. This action cannot be undone.'
                type='confirm'
                onConfirm={handleResetConfirm}
                confirmText='Yes, Reset'
                cancelText='Cancel'
            />

            {/* Error Dialog */}
            <Dialog
                isOpen={showErrorDialog}
                onClose={() => setShowErrorDialog(false)}
                title='Error'
                message={errorMessage}
                type='error'
                confirmText='OK'
            />
        </div>
    )
}

export default TaskManager
