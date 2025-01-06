import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SlagService {
  private baseUrl = 'http://localhost:3000/slagok';

  constructor(private http: HttpClient) {}

  getSlagok(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getSlagById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addSlag(slag: any): Observable<any> {
    return this.http.post(this.baseUrl, slag);
  }

  updateSlag(id: number, slag: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, slag);
  }

  deleteSlag(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
