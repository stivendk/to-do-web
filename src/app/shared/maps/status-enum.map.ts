import { TaskStatusEnum } from '../../task/shared/enums/task-status.enum';
export const TaskStatusEnumMap = {
    [TaskStatusEnum.COMPLETED]: { name: 'Completada', value: TaskStatusEnum.COMPLETED},
    [TaskStatusEnum.TO_DO]: { name: 'Por hacer', value: TaskStatusEnum.TO_DO},
    [TaskStatusEnum.IN_PROGRESS]: { name: 'En progreso', value: TaskStatusEnum.IN_PROGRESS},
}

export type TaskStatusEnumMapType = typeof TaskStatusEnumMap;