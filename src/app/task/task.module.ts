import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { EnumStatusPipe } from './shared/pipes/enum-status.pipe';
import { EnumPriorityPipe } from './shared/pipes/enum-priority.pipe';
import { ErrorMessageService } from '../core/services/error-message-form.service';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    ConfirmModalComponent,
    EnumPriorityPipe,
    EnumStatusPipe
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    ErrorMessageService
  ]
})
export class TaskModule { }
