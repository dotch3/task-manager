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
            <div className='container' data-id='loadingContainer'>
                <div className='header' data-id='loadingHeader'>
                    <h1 data-id='loadingTitle'>📝 Task Manager</h1>
                    <p data-id='loadingMessage'>Loading tasks...</p>
                    <ApiStatus data-id='loadingApiStatus' />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className='container' data-id='errorContainer'>
                <div className='header' data-id='errorHeader'>
                    <h1 data-id='errorTitle'>📝 Task Manager</h1>
                    <ApiStatus data-id='errorApiStatus' />
                </div>
                <div className='error-banner' data-id='errorBanner'>
                    <strong data-id='errorTitleText'>Failed to load tasks</strong>
                    <p data-id='errorHint'>Please make sure the API is running on http://localhost:3000</p>
                    <p data-id='errorInstruction' style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
                        Start the API with: <code data-id='errorCode'>cd apps/api && npm run dev</code>
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='container' data-id='taskManager'>
            <div className='header' data-id='header'>
                <h1 data-id='appTitle'>📝 Task Manager</h1>
                <p data-id='appSubtitle'>Organize your tasks efficiently</p>
                <ApiStatus data-id='apiStatus' />
            </div>

            <StatsCards data-id='statsCards' stats={stats} />

            <div className='card' data-id='taskCard'>
                <TaskForm
                    data-id='taskForm'
                    newTaskName={newTaskName}
                    setNewTaskName={setNewTaskName}
                    onSubmit={handleCreateTask}
                    isLoading={createTaskMutation.isPending}
                    error={error}
                />

                <TaskList data-id='taskList' tasks={tasks} />

                <div style={{ padding: "1.5rem", paddingTop: 0 }}>
                    <button
                        className='btn btn-reset'
                        data-id='resetBtn'
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
