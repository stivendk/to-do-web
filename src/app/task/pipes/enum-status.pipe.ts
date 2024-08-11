import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatusEnum } from '../enums/task-status.enum';

@Pipe({
  name: 'enumStatus'
})
export class EnumStatusPipe implements PipeTransform {

  private statusNames = {
    [TaskStatusEnum.COMPLETED]: 'Completada',
    [TaskStatusEnum.TO_DO]: 'Por hacer',
    [TaskStatusEnum.IN_PROGRESS]: 'En progreso'
  }

  transform(value: TaskStatusEnum, ...args: unknown[]): unknown {
    return this.statusNames[value] || value;
  }

}
