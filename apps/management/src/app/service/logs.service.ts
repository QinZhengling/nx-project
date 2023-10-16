import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000/api';
  private readonly token: string = localStorage.getItem('token') as string;

  getUserLogs() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<[]>(`${this.baseUrl}/users/logs`, { headers })
      .pipe(take(1));
  }
  getUsersPage<r>(PageIndex: number, PageSize: number) {
    const params = new HttpParams()
      .set('PageIndex', PageIndex)
      .set('PageSize', PageSize);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<r>(`${this.baseUrl}/users/logs/page`, {
        params,
        headers,
      })
      .pipe(take(1));
  }
  getEquipmentLogs() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<[]>(`${this.baseUrl}/equipments/logs`, { headers })
      .pipe(take(1));
  }
  getEquipmentPage<e>(PageIndex: number, PageSize: number) {
    const params = new HttpParams()
      .set('PageIndex', PageIndex)
      .set('PageSize', PageSize);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<e>(`${this.baseUrl}/equipments/logs/page`, {
        params,
        headers,
      })
      .pipe(take(1));
  }
}
