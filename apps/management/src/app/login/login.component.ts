import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'nx-porject-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user!: User;
  constructor(private auth: AuthService, private router: Router) {
    this.user = { account: '', password: '' };
  }
  login() {
    interface role {
      id: string;
      user_id: string;
      role_id: number;
    }
    const result = this.auth.login(this.user).subscribe((res) => {
      if (res.msg === '登录成功') {
        const token: string = res.data.token;
        const roles: number[] = res.data.roles;

        localStorage.setItem('token', token);
        console.log(roles);

        // console.log(role);
        localStorage.setItem('role', JSON.stringify(roles));
        if (roles) {
          alert(res.msg);
          this.router.navigate(['/manage']);
        } else {
          alert('No Role');
          this.router.navigate(['/home']);
        }
        return;
      }
      // console.log(res.data);
      alert(res.msg);
      return;
    });
  }
  ngOnInit(): void {
    console.log(1);
  }
}
