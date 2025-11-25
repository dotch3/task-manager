import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Check, Trash2, Edit2, X, Save } from "lucide-react"
import type { Task } from "../types/task.types"
import type { ApiError } from "../types/error.types"
import { taskService } from "../services/api.service"
import Dialog from "./Dialog.tsx"

interface TaskItemProps {
    task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
    const queryClient = useQueryClient()
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState(task.name)

    // Dialog states
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showErrorDialog, setShowErrorDialog] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showCompletedTaskDialog, setShowCompletedTaskDialog] = useState(false)

    // Complete task mutation
    const completeMutation = useMutation({
        mutationFn: () => taskService.completeTask(task.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
    })

    // Update task mutation
    const updateMutation = useMutation({
        mutationFn: (name: string) => taskService.updateTask(task.id, { name }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            setIsEditing(false)
        },
        onError: (error: ApiError) => {
            const message = error.response?.data?.error || "Failed to update task"
            setErrorMessage(message)
            setShowErrorDialog(true)
        },
    })

    // Delete task mutation
    const deleteMutation = useMutation({
        mutationFn: () => taskService.deleteTask(task.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
    })

    const handleComplete = () => {
        if (!task.is_done) {
            completeMutation.mutate()
        }
    }

    const handleEdit = () => {
        if (task.is_done) {
            setShowCompletedTaskDialog(true)
            return
        }
        setIsEditing(true)
        setEditName(task.name)
    }

    const handleSave = () => {
        if (editName.trim() && editName !== task.name) {
            updateMutation.mutate(editName.trim())
        } else {
            setIsEditing(false)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditName(task.name)
    }

    const handleDeleteClick = () => {
        setShowDeleteDialog(true)
    }

    const handleDeleteConfirm = () => {
        deleteMutation.mutate()
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <>
            <div className={`task-item ${task.is_done ? "completed" : ""}`} data-id={`taskItem-${task.id}`}>
                <div
                    className={`task-checkbox ${task.is_done ? "checked" : ""}`}
                    onClick={handleComplete}
                    style={{ cursor: task.is_done ? "default" : "pointer" }}
                    title={task.is_done ? "Task completed" : "Mark as complete"}
                    data-id={`completeBtn-${task.id}`}
                >
                    {task.is_done && <Check size={16} color='white' strokeWidth={3} />}
                </div>

                <div className='task-content' data-id={`taskContent-${task.id}`}>
                    {isEditing ? (
                        <>
                            <input
                                type='text'
                                className='task-name-input'
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                maxLength={250}
                                autoFocus
                                placeholder='Enter task name...'
                                title='Task name (max 250 characters)'
                                data-id={`editInput-${task.id}`}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSave()
                                    if (e.key === "Escape") handleCancel()
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <div
                                className={`task-name ${task.is_done ? "completed" : ""}`}
                                data-id={`taskName-${task.id}`}
                            >
                                {task.name}
                            </div>
                            <div className='task-date' data-id={`taskDate-${task.id}`}>
                                Created: {formatDate(task.created_date)}
                                {task.updated_time !== task.created_date &&
                                    ` • Updated: ${formatDate(task.updated_time)}`}
                            </div>
                        </>
                    )}
                </div>

                <div className='task-actions' data-id={`taskActions-${task.id}`}>
                    {isEditing ? (
                        <>
                            <button
                                className='icon-btn btn-primary'
                                onClick={handleSave}
                                disabled={updateMutation.isPending}
                                title='Save changes (Enter)'
                                data-id={`saveBtn-${task.id}`}
                            >
                                <Save size={18} />
                            </button>
                            <button
                                className='icon-btn btn-secondary'
                                onClick={handleCancel}
                                disabled={updateMutation.isPending}
                                title='Cancel editing (Esc)'
                                data-id={`cancelBtn-${task.id}`}
                            >
                                <X size={18} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className='icon-btn btn-secondary'
                                onClick={handleEdit}
                                disabled={task.is_done}
                                title={task.is_done ? "Cannot edit completed task" : "Edit task"}
                                data-id={`editBtn-${task.id}`}
                                style={{ opacity: task.is_done ? 0.5 : 1 }}
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                className='icon-btn btn-danger'
                                onClick={handleDeleteClick}
                                disabled={deleteMutation.isPending}
                                title='Delete task'
                                data-id={`deleteBtn-${task.id}`}
                            >
                                <Trash2 size={18} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                title='Delete Task?'
                message={`Are you sure you want to delete "${task.name}"? This action cannot be undone.`}
                type='confirm'
                onConfirm={handleDeleteConfirm}
                confirmText='Yes, Delete'
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

            {/* Completed Task Edit Warning Dialog */}
            <Dialog
                isOpen={showCompletedTaskDialog}
                onClose={() => setShowCompletedTaskDialog(false)}
                title='Cannot Edit Task'
                message='Cannot edit a task that is marked as DONE. You can delete it or mark it as incomplete first.'
                type='alert'
                confirmText='OK'
            />
        </>
    )
}

export default TaskItem
