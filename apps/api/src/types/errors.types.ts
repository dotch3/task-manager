export class DuplicateTaskError extends Error {
    constructor(message: string = "A task with this name already exists") {
        super(message)
        this.name = "DuplicateTaskError"
    }
}

export class TaskNotFoundError extends Error {
    constructor(message: string = "Task not found") {
        super(message)
        this.name = "TaskNotFoundError"
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ValidationError"
    }
}

export class TaskCompletedError extends Error {
    constructor(message: string = "Cannot edit a task that is marked as DONE") {
        super(message)
        this.name = "TaskCompletedError"
    }
}
