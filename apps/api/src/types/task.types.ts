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

export interface EditTaskRequest {
    name: string
}

export interface TaskResponse {
    success: boolean
    data?: Task | Task[]
    error?: string
}

export interface CreateTaskResponse {
    message: string
    id: string
    name: string
}

export interface UpdateTaskResponse {
    message: string
    id: string
    name: string
}

export interface CompleteTaskResponse {
    message: string
    id: string
    name: string
    status: string
}

export interface DeleteTaskResponse {
    message: string
    id: string
    name: string
}
