import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class RestfulService {

   constructor(
    private httpClient: HttpClient
  ){ }

  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }

  private returnTextOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    responseType: 'text' as 'text'
  }

  postDataRequest(url: string, data: any): Observable<any> {
    return this.httpClient.post(url, JSON.stringify(data), this.options);
  }

  putDataRequest(url: string, data: any): Observable<any> {
    return this.httpClient.put(url, JSON.stringify(data), this.options);
  }

  getDataRequest(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  deleteDataRequest(url: string): Observable<any> {
    return this.httpClient.delete(url);
  }

}