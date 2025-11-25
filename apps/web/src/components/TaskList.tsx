import type { Task } from "../types/task.types"
import TaskItem from "./TaskItem.tsx"
import { ListTodo } from "lucide-react"

interface TaskListProps {
    tasks: Task[]
}

const TaskList = ({ tasks }: TaskListProps) => {
    // Sort tasks by created_date (newest first)
    const sortedTasks = [...tasks].sort((a, b) => {
        return new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
    })

    return (
        <div className='task-list'>
            <h2>Tasks ({tasks.length})</h2>
            {sortedTasks.length === 0 ? (
                <div className='empty-state'>
                    <ListTodo size={64} strokeWidth={1.5} />
                    <p style={{ marginTop: "1rem", fontSize: "1.125rem", fontWeight: 500 }}>No tasks yet</p>
                    <p style={{ marginTop: "0.5rem" }}>Create your first task to get started!</p>
                </div>
            ) : (
                <div className='tasks'>
                    {sortedTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TaskList
