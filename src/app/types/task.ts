export type Task = {
    description: string;
    dueDate: string;
    id: string;
    isComplete: boolean;
}

export type TaskUpdatePayload = {
    description?: string;
    dueDate?: string;
    id: string;
    isComplete?: boolean;
}