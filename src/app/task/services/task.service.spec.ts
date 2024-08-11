import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { UrlConstants } from 'src/app/shared/constants/url-constants';
import { Task } from '../models/task.model';
import { PriorityEnum } from '../enums/priority.enum';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { ResponseModel } from '../models/response.model';
import { RequestModel } from '../models/request.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const endpoint = `${environment.apiHost}${UrlConstants.TASK_ENDPOINTS.TASKS}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllTasks', () => {
    it('should retrieve all tasks', () => {
      const mockTasks: Task[] = [{ id: 1, title: 'Task 1', description: 'Description 1', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() }];

      service.getAllTasks().subscribe(tasks => {
        expect(tasks).toEqual(mockTasks);
      });

      const req = httpMock.expectOne(endpoint);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });
  });

  describe('getTask', () => {
    it('should retrieve a single task by id', () => {
      const mockTask: ResponseModel<Task> = { data: { id: 1, title: 'Task 1', description: 'Description 1', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() } };

      service.getTask(1).subscribe(response => {
        expect(response).toEqual(mockTask);
      });

      const req = httpMock.expectOne(`${endpoint}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTask);
    });
  });

  describe('createTask', () => {
    it('should create a new task', () => {
      const task: Task = { 
        id: 1, 
        title: 'Test Task', 
        description: 'Test Description', 
        priority: PriorityEnum.HIGH, 
        status: TaskStatusEnum.TO_DO, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      };
      
      const taskToCreateWithoutId = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status
      };
    
      const responseTask: ResponseModel<Task> = { data: task };

      service.createTask(taskToCreateWithoutId).subscribe(response => {
        expect(response).toEqual(responseTask);
      });

      const req = httpMock.expectOne(endpoint);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(taskToCreateWithoutId);
      req.flush(responseTask);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', () => {
      const updatedTask: Partial<Task> = { title: 'Updated Task' };
      const mockResponse: ResponseModel<Task> = { data: { id: 1, title: 'Updated Task', description: 'Description', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() } };

      service.updateTask(1, updatedTask).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${endpoint}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedTask);
      req.flush(mockResponse);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by id', () => {
      const mockResponse: ResponseModel<Task> = { data: { id: 1, title: 'Task 1', description: 'Description 1', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() } };

      service.deleteTask(1).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${endpoint}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('filterTasks', () => {
    it('should filter tasks by priority and status', () => {
      const mockTasks: Task[] = [{ id: 1, title: 'Task 1', description: 'Description 1', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() }];
      const priority = PriorityEnum.HIGH;
      const status = TaskStatusEnum.TO_DO;

      service.filterTasks(priority, status).subscribe(tasks => {
        expect(tasks).toEqual(mockTasks);
      });

      const req = httpMock.expectOne(`${endpoint}/filter?priority=HIGH&status=TO_DO`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });

    it('should filter tasks by priority only', () => {
      const mockTasks: Task[] = [{ id: 1, title: 'Task 1', description: 'Description 1', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() }];
      const priority = PriorityEnum.HIGH;

      service.filterTasks(priority).subscribe(tasks => {
        expect(tasks).toEqual(mockTasks);
      });

      const req = httpMock.expectOne(`${endpoint}/filter?priority=HIGH`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });

    it('should filter tasks by status only', () => {
      const mockTasks: Task[] = [{ id: 1, title: 'Task 1', description: 'Description 1', priority: PriorityEnum.HIGH, status: TaskStatusEnum.TO_DO, createdAt: new Date(), updatedAt: new Date() }];
      const status = TaskStatusEnum.TO_DO;

      service.filterTasks(undefined, status).subscribe(tasks => {
        expect(tasks).toEqual(mockTasks);
      });

      const req = httpMock.expectOne(`${endpoint}/filter?status=TO_DO`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });
  });
});
