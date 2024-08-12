import { PriorityEnum } from '../../task/shared/enums/priority.enum';

export const PriorityEnumMap = {
    [PriorityEnum.HIGH]: {name: 'Alta', value: PriorityEnum.HIGH},
    [PriorityEnum.MEDIUM]: {name: 'Media', value: PriorityEnum.MEDIUM},
    [PriorityEnum.LOW]: {name: 'Baja', value: PriorityEnum.LOW}
}

export type PriorityEnumMapType = typeof PriorityEnumMap;