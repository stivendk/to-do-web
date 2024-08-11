import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PriorityEnum } from '../enums/priority.enum';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { ErrorMessages } from '../models/error-messages.model';
import { ErrorMessageService } from 'src/app/shared/services/error-message-form.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  taskForm: FormGroup;
  showModal: boolean = false;
  isEditMode: boolean = false;
  taskId: number | null = null;
  taskToDelete: Task | null = null;
  private unsubscribe$ = new Subject<void>();

  priorities = Object.values(PriorityEnum);
  statuses = Object.values(TaskStatusEnum);

  errors: ErrorMessages = {};

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private errorMessageService: ErrorMessageService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.taskId = params['id'] ? parseInt(params['id'], 10) : null;
      if (this.taskId) {
        this.isEditMode = true;
        this.loadTask(this.taskId);
      }
    });
  }

  public loadTask(id: number): void {
    this.taskService.getTask(id).pipe(takeUntil(this.unsubscribe$)).subscribe(response => {
      if (response.data) {
        this.taskForm.patchValue(response.data);
        this.taskForm.get('status')?.enable();
        this.taskToDelete = response.data;
      }
    });
  }
  
  public onSubmit(): void {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      if (this.isEditMode && this.taskId) {
        this.taskService.updateTask(this.taskId, task).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.taskService.createTask(task).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    } else {
      this.errors = this.getFormValidationErrors();
    }
  }

  public onCancel(): void {
    this.router.navigate(['/']);
  }

  public removeTask(): void {
    this.showModal = true;
  }

  public confirmRemoveTask(): void {
    if (this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete.id).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  public cancelModal(): void {
    this.taskToDelete = null;
    this.showModal = false;
  }

  getFormValidationErrors(): any {
    const errors: any = {};
    Object.keys(this.taskForm.controls).forEach(key => {
      const controlErrors: any = this.taskForm.get(key)?.errors;
      if (controlErrors != null) {
        errors[key] = Object.keys(controlErrors).map(keyError => {
          return this.errorMessageService.getErrorMessage(key, keyError);
        });
      }
    });
    return errors;
  }

  invalidField(controlName: string) {
    if (this.taskForm.get(controlName)?.valid) {
      delete this.errors[controlName];
    } else {
      this.errors[controlName] = this.getFormValidationErrors()[controlName] || [];
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
