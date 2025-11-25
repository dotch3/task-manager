export interface Task {
    id: string
    name: string
    is_done: boolean
    created_date: string
    updated_time: string
}

export interface CreateTaskRequest {
    name: string
}

export interface UpdateTaskRequest {
    name: string
}

export interface TaskStats {
    total: number
    completed: number
    pending: number
}
