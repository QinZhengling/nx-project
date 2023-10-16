import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
interface role {
  id: string;
  role_id: number;
  role_name: string;
}
interface User {
  id: string;
  user_id: string;
  role_id: number;
}
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000/api';
  private readonly token: string = localStorage.getItem('token') as string;
  findRoles() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<role[]>('http://localhost:3000/api/roles', {
        headers,
      })
      .pipe(take(1));
  }
  findUsers() {
    console.log('find');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<User[]>(`${this.baseUrl}/roles/users`, { headers })
      .pipe(take(1));
  }
  addRole(role: role) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http
      .post(`http://localhost:3000/api/roles`, role, { headers })
      .pipe(take(1));
  }
  deleteRole(role_id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http
      .delete(`http://localhost:3000/api/roles/${role_id}`, {
        headers,
      })
      .pipe(take(1));
  }
  updateRole(role_id: number, content: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http
      .put(
        `http://localhost:3000/api/roles/${role_id}`,
        { content },
        {
          headers,
        }
      )
      .pipe(take(1));
  }
  addUserRole(userRole: User) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    console.log(userRole.user_id);
    return this.http
      .post(
        `http://localhost:3000/api/users/${userRole.user_id}/role_id`,
        { role_id: userRole.role_id },
        {
          headers,
        }
      )
      .pipe(take(1));
  }

  deleteUserRole(userRole: User) {
    // console.log(userRole);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .delete(
        `http://localhost:3000/api/users/${userRole.user_id}/roles/${userRole.role_id}`,
        {
          headers,
        }
      )
      .pipe(take(1));
  }

  updateUserRole(sendInfo: User) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .put(
        `http://localhost:3000/api/users/${sendInfo.user_id}/roles`,
        { role_id: sendInfo.role_id },
        {
          headers,
        }
      )
      .pipe(take(1));
  }
}
