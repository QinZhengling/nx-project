import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token: string = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const item = localStorage.getItem('role');

    if (token && item) {
      const role = Array.from(JSON.parse(item));
      if (role) {
        return true;
      } else {
        alert('No Roles 请重新登录');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
        return false;
      }
    } else {
      alert('请重新登录');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 500);
      return false;
    }
  }
}
