import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { Task } from '../models/task.model';
import { PriorityEnum } from '../enums/priority.enum';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { of } from 'rxjs';
import { EnumPriorityPipe } from '../pipes/enum-priority.pipe';
import { EnumStatusPipe } from '../pipes/enum-status.pipe';

class MockTaskService {
  getAllTasks() {
    return of([{ id: 1, title: 'Test Task', description: 'Test Description', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() }]);
  }

  filterTasks(priority?: PriorityEnum, status?: TaskStatusEnum) {
    return of([{ id: 1, title: 'Test Task', description: 'Test Description', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() }]);
  }
}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent, EnumPriorityPipe, EnumStatusPipe ],
      providers: [
        { provide: TaskService, useClass: MockTaskService },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all tasks', () => {
    component.loadAllTasks();
    expect(component.tasks.length).toBeGreaterThan(0);
  });

  it('should apply filters', () => {
    component.selectedPriority = PriorityEnum.HIGH;
    component.selectedStatus = TaskStatusEnum.TO_DO;

    component.applyFilters();
    expect(component.tasks.length).toBeGreaterThan(0);
  });

  it('should navigate to task detail', () => {
    const task: Task = { id: 1, title: 'Test Task', description: 'Test Description', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() };

    component.openTask(task);

    expect(router.navigate).toHaveBeenCalledWith([`tasks/${task.id}`]);
  });

  it('should navigate to create task page', () => {
    component.createTask();

    expect(router.navigate).toHaveBeenCalledWith(['tasks/add']);
  });
});
