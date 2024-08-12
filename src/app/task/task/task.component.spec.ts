import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TaskComponent } from './task.component';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../shared/models/task.model';
import { PriorityEnum } from '../shared/enums/priority.enum';
import { TaskStatusEnum } from '../shared/enums/task-status.enum';
import { ResponseModel } from '../shared/models/response.model';
import { EnumPriorityPipe } from '../shared/pipes/enum-priority.pipe';
import { EnumStatusPipe } from '../shared/pipes/enum-status.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RequestModel } from '../shared/models/request.model';
import { ErrorMessageService } from 'src/app/core/services/error-message-form.service';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  const taskId = 1;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', [
      'getTask', 'createTask', 'updateTask', 'deleteTask'
    ]);

    await TestBed.configureTestingModule({
      declarations: [TaskComponent, EnumPriorityPipe, EnumStatusPipe],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({ id: taskId }) } },
        FormBuilder, ErrorMessageService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form for editing mode if taskId is present', () => {
    const task: TaskModel = { id: 1, title: 'Test Task', description: 'Test Description', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() };
    taskService.getTask.and.returnValue(of({ data: task }));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isEditMode).toBeTrue();
    expect(component.taskForm.value).toEqual({
      title: 'Test Task',
      description: 'Test Description',
      priority: PriorityEnum.HIGH,
      status: TaskStatusEnum.TO_DO
    });
  });

  it('should submit form for creating a new task', () => {
    const taskToCreate: RequestModel = { 
      title: 'Test Task',
      description: 'Test Description',
      priority: PriorityEnum.HIGH
    };
    
    const createdTask: TaskModel = { 
      id: 1,
      ...taskToCreate,
      status: TaskStatusEnum.TO_DO,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  
    const responseTask: ResponseModel<TaskModel> = { data: createdTask };
    (taskService.createTask as jasmine.Spy).and.returnValue(of(responseTask));
    
    component.taskForm.patchValue(taskToCreate);
    component.isEditMode = false;
    component.onSubmit();
    
    expect(taskService.createTask).toHaveBeenCalledWith(taskToCreate);
  });
  
  
  
  it('should submit form for updating an existing task', () => {
    const updatedTask: TaskModel = { 
      id: 1, 
      title: 'Updated Task', 
      description: 'Updated Description', 
      priority: PriorityEnum.MEDIUM, 
      status: TaskStatusEnum.IN_PROGRESS, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
  
    const taskToUpdate: Partial<TaskModel> = {
      title: 'Updated Task',
      description: 'Updated Description',
      priority: PriorityEnum.MEDIUM,
      status: TaskStatusEnum.IN_PROGRESS
    };
  
    const responseTask: ResponseModel<TaskModel> = { data: updatedTask };
    taskService.updateTask.and.returnValue(of(responseTask));
    
    component.taskForm.setValue({
      title: 'Updated Task',
      description: 'Updated Description',
      priority: PriorityEnum.MEDIUM,
      status: TaskStatusEnum.IN_PROGRESS
    });
    
    component.taskForm.get('status')?.enable();
    component.onSubmit();
    
    expect(taskService.updateTask).toHaveBeenCalledWith(1, taskToUpdate);
  });

  it('should navigate to tasks list on cancel', () => {
    spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should open the confirmation modal for task deletion', () => {
    component.removeTask();
    expect(component.showModal).toBeTrue();
  });

  it('should confirm and delete a task', () => {
    const task: TaskModel = { id: 1, title: 'Test Task', description: 'Test Description', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() };
    component.taskToDelete = task;
    taskService.deleteTask.and.returnValue(of({}));

    spyOn(router, 'navigate');
    component.confirmRemoveTask();
    expect(taskService.deleteTask).toHaveBeenCalledWith(task.id);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should cancel the deletion modal', () => {
    component.cancelModal();
    expect(component.showModal).toBeFalse();
    expect(component.taskToDelete).toBeNull();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
