import { Component, OnInit } from '@angular/core';
import { PriorityEnum } from '../shared/enums/priority.enum';
import { TaskStatusEnum } from '../shared/enums/task-status.enum';
import { Task } from '../shared/models/task.model';
import { Router } from '@angular/router';
import { TaskStatusEnumMap } from 'src/app/shared/maps/status-enum.map';
import { PriorityEnumMap } from 'src/app/shared/maps/priority-enum.map';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  isFilter = false;
  iconFilterName = 'panel';
  tasks: Task[] = [];
  selectedPriority: PriorityEnum | undefined;
  selectedStatus: TaskStatusEnum | undefined;
  priorities = Object.values(PriorityEnumMap);
  statuses = Object.values(TaskStatusEnumMap);
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllTasks();
  }

  toggleShowFilters() {
    this.isFilter = !this.isFilter;
    if (this.isFilter) {
      this.iconFilterName = 'close';
    } else { 
      this.iconFilterName = 'panel';
      this.loadAllTasks(); 
    }

  }

  loadAllTasks() {
    console.log('.lll.');
    
    this.taskService.getAllTasks().subscribe((response) => {
      if (response) {
        this.tasks = response;
      }
    });

  }

  toggleFilter(type: 'priority' | 'status', value: PriorityEnum | TaskStatusEnum) {
    if (type === 'priority') {
      this.selectedPriority = this.selectedPriority === value ? undefined : value as PriorityEnum;
    } else if (type === 'status') {
      this.selectedStatus = this.selectedStatus === value ? undefined : value as TaskStatusEnum;
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this.taskService.filterTasks(this.selectedPriority, this.selectedStatus).subscribe((response) => {
      this.tasks = response ?? [];
    });
  }

  isPrioritySelected(priority: PriorityEnum): boolean {
    return this.selectedPriority === priority;
  }

  isStatusSelected(status: TaskStatusEnum): boolean {
    return this.selectedStatus === status;
  }

  clearFilters() {
    this.selectedPriority = undefined;
    this.selectedStatus = undefined;
    this.loadAllTasks();
  }
  
  public openTask(task: Task){
    this.router.navigate([`tasks/${task.id}`]);
  }
  
  public createTask(){
    this.router.navigate([`tasks/add`]);
  }
}
