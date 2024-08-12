import { PriorityEnum } from "../enums/priority.enum";

export interface RequestModel {
    title: string;
    description: string;
    priority: PriorityEnum;
}