import { Pipe, PipeTransform } from '@angular/core';
import { PriorityEnum } from '../enums/priority.enum';

@Pipe({
  name: 'enumPriority'
})
export class EnumPriorityPipe implements PipeTransform {

  private priorityNames = {
    [PriorityEnum.HIGH]: 'Alta', 
    [PriorityEnum.MEDIUM]: 'Media',
    [PriorityEnum.LOW]: 'Baja'
  }

  transform(value: PriorityEnum, ...args: unknown[]): unknown {
    return this.priorityNames[value] || value;
  }

}
