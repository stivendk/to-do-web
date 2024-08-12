import { PriorityEnum } from "../enums/priority.enum";
import { TaskStatusEnum } from "../enums/task-status.enum";

export interface TaskModel{
    id: number;
    title: string;
    description: string;
    priority: PriorityEnum;
    status: TaskStatusEnum;
    createdAt: Date;
    updatedAt: Date;    
}