import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiModel } from '@angular-libs/api-model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  getData(): Observable<ApiModel[]> {
    return this.httpClient.get<ApiModel[]>('api');
  }
}
