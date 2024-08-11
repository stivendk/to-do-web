import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment.prod';
import { UrlConstants } from 'src/app/shared/constants/url-constants';
import { PriorityEnum } from '../enums/priority.enum';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { Task } from '../models/task.model';
import { SharedConstants } from 'src/app/shared/constants/shared-constants';
import { RequestModel } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private endpoint = `${environment.apiHost}${UrlConstants.TASK_ENDPOINTS.TASKS}`

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.endpoint);
  }

  getTask(id: number): Observable<ResponseModel<Task>>{
    return this.http.get<ResponseModel<Task>>(`${this.endpoint}/${id}`)
  }

  createTask(task: RequestModel): Observable<ResponseModel<Task>>{
    return this.http.post(this.endpoint, task);
  }

  updateTask(id: number, task: Partial<Task>): Observable<ResponseModel<Task>>{
    return this.http.put(`${this.endpoint}/${id}`, task);
  }

  deleteTask(id: number): Observable<ResponseModel<Task>>{
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  filterTasks(priority?: PriorityEnum, status?: TaskStatusEnum): Observable<Task[]>{
    let params = new HttpParams();

    if(priority){
      params = params.set('priority', priority);
    }

    if(status){
      params = params.set('status', status)
    }

    return this.http.get<Task[]>(`${this.endpoint}/filter`, {params});
  }
}
