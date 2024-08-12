import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UrlConstants } from 'src/app/shared/constants/url-constants';
import { ResponseModel } from 'src/app/task/shared/models/response.model';
import { RequestModel } from 'src/app/task/shared/models/request.model';
import { PriorityEnum } from 'src/app/task/shared/enums/priority.enum';
import { TaskStatusEnum } from 'src/app/task/shared/enums/task-status.enum';
import { TaskModel } from 'src/app/task/shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private endpoint = `${environment.apiHost}${UrlConstants.TASK_ENDPOINTS.TASKS}`

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<TaskModel[]>{
    return this.http.get<TaskModel[]>(this.endpoint);
  }

  getTask(id: number): Observable<ResponseModel<TaskModel>>{
    return this.http.get<ResponseModel<TaskModel>>(`${this.endpoint}/${id}`)
  }

  createTask(task: RequestModel): Observable<ResponseModel<TaskModel>>{
    return this.http.post(this.endpoint, task);
  }

  updateTask(id: number, task: Partial<TaskModel>): Observable<ResponseModel<TaskModel>>{
    return this.http.put(`${this.endpoint}/${id}`, task);
  }

  deleteTask(id: number): Observable<ResponseModel<TaskModel>>{
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  filterTasks(priority?: PriorityEnum, status?: TaskStatusEnum): Observable<TaskModel[]>{
    let params = new HttpParams();

    if(priority){
      params = params.set('priority', priority);
    }

    if(status){
      params = params.set('status', status)
    }

    return this.http.get<TaskModel[]>(`${this.endpoint}/filter`, {params});
  }
}
