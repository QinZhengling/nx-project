// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpHeaders,
//   HttpClient,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private http: HttpClient) {}
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const authToken = localStorage.getItem('token'); // 从本地存储中获取Token
//     if (authToken) {
//       let state = 0;
//       const headers = new HttpHeaders().set(
//         'Authorization',
//         `Bearer ${authToken}`
//       );
//       this.http
//         .get<[]>(`http://localhost:3000/api/users/hello`, { headers })
//         .subscribe({
//           error: (err: HttpErrorResponse) => {
//             state = err.status;
//           },
//         });
//       if (state === 401) {
//         // Token已过期，可以在这里执行相应的操作，如重新登录
//         console.log('Token已过期');
//         return next.handle(req);
//       } else {
//         const authReq = req.clone({
//           headers: req.headers.set('Authorization', `Bearer${authToken}`),
//         });
//         return next.handle(authReq);
//       }
//     }
//     return next.handle(req);
//   }
//   // 解码Token
//   private decodeToken(token: string): any {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map((c) => {
//           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         })
//         .join('')
//     );

//     return JSON.parse(jsonPayload);
//   }
// }
