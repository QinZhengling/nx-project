import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../login/User';
import { Observable, take } from 'rxjs';
import { Res } from '../login/Res';
import { register } from '../register/register';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000/api';

  login(user: User): Observable<Res> {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<Res>(url, user).pipe(take(1));
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  register(reg: register): Observable<Res> {
    const url = `${this.baseUrl}/auth/register`;
    console.log(url);
    return this.http.post<Res>(url, reg).pipe(take(1));
  }
  checkAuthentication(): Observable<Res> {
    const url = `${this.baseUrl}/auth`;
    return this.http.get<Res>(url).pipe(take(1));
  }
}
