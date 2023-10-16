import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  mapToCanActivate,
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageComponent } from './manage/manage.component';
import { SidebarComponent } from './Sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { EuipmentComponent } from './euipment/euipment.component';
import { EuipmentMaintanceComponent } from './euipment_maintance/euipment-maintance.component';
import { LogComponent } from './log/log.component';
import { AuthGuardService } from './service/auth.guard.service';
import { RoleComponent } from './role/role.component';
import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard {
//   constructor(private http: HttpClient, private router: Router) {}
//   canActivate(): Observable<boolean> {
//     const token: string = sessionStorage.getItem('token') as string;
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http
//       .get<boolean>('http://127.0.0.1:3000/api/auth', { headers })
//       .pipe(
//         map((response) => {
//           if (response) {
//             return true; // 允许访问
//           } else {
//             // 跳转到登录页面
//             this.router.navigate(['/login']);
//             return false;
//           }
//         })
//       );
//   }
// }
export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'manage',
    component: ManageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'users',
        component: UsersComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'euipment',
        component: EuipmentComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'euipment_maintance',
        component: EuipmentMaintanceComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'log',
        component: LogComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'role',
        component: RoleComponent,
        canActivateChild: [AuthGuardService],
        // data: { roles: [3] },
      },
      { path: '**', redirectTo: '/manage/users', pathMatch: 'full' },
    ],
  },
  { path: 'sidebar', component: SidebarComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
