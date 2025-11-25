import { Plus } from "lucide-react"

interface TaskFormProps {
    newTaskName: string
    setNewTaskName: (name: string) => void
    onSubmit: (e: React.FormEvent) => void
    isLoading: boolean
    error: string | null
}

const TaskForm = ({ newTaskName, setNewTaskName, onSubmit, isLoading, error }: TaskFormProps) => {
    return (
        <div className='create-task-form'>
            <h2>Create New Task</h2>
            <form onSubmit={onSubmit} className='form-group' data-id='createTaskForm'>
                <input
                    type='text'
                    className='form-input'
                    placeholder='Enter task name...'
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    maxLength={250}
                    disabled={isLoading}
                    title='Enter a unique task name (max 250 characters)'
                    data-id='taskInput'
                />
                <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={isLoading || !newTaskName.trim()}
                    title={!newTaskName.trim() ? "Enter a task name first" : "Add new task"}
                    data-id='addTaskBtn'
                >
                    <Plus size={20} />
                    {isLoading ? "Adding..." : "Add Task"}
                </button>
            </form>
            {error && <div style={{ marginTop: "0.5rem", color: "#ef4444", fontSize: "0.875rem" }}>{error}</div>}
        </div>
    )
}

export default TaskForm
