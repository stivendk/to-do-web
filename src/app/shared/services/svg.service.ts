import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  private svgPath = environment.svgPath;

  constructor(private http: HttpClient) {}

  getSvg(name: string): Observable<string> {
    return this.http.get(`${this.svgPath}${name}.svg`, { responseType: 'text' });
  }
}
