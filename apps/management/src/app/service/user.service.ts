import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
interface User {
  id: string;
  username: string;
  password: string;
  account: string;
  age: number;
  sex: number;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000/api';
  private readonly token: string = localStorage.getItem('token') as string;
  search<r>(
    searchValue: { username: string; account: string },
    PageIndex: number,
    PageSize: number
  ) {
    const params = new HttpParams()
      .set('PageIndex', PageIndex)
      .set('PageSize', PageSize)
      .set('username', searchValue.username)
      .set('account', searchValue.account);
    // console.log(params);

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<r>(`${this.baseUrl}/users`, { params, headers })
      .pipe(take(1));
  }

  getUsers() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http
      .get<[]>(`${this.baseUrl}/users`, { headers })
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
      .get<r>(`${this.baseUrl}/users/page`, { params, headers })
      .pipe(take(1));
  }
  deleteUser(id: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .delete(`${this.baseUrl}/users/${id}`, { headers })
      .pipe(take(1));
  }
  updateUser(id: string, user: User) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .put(`${this.baseUrl}/users/` + `${id}`, user, {
        headers,
      })
      .pipe(take(1));
  }
  addUser(user: User) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .post(`${this.baseUrl}/users`, user, {
        headers,
      })
      .pipe(take(1));
  }
}
