import { Component } from '@angular/core';
import { register } from '../register/register';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'nx-porject-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  sexs: number[] = [0, 1];
  value!: string;
  password2!: string;
  register!: register;
  constructor(private _register: AuthService, private router: Router) {
    this.register = {
      username: '',
      account: '',
      password: '',
      id: '',
      sex: NaN,
      age: NaN,
    };
  }
  Register() {
    if (
      this.register.account.length < 1 &&
      this.register.username.length < 1 &&
      this.register.password.length < 1 &&
      Number.isNaN(this.register.sex) &&
      Number.isNaN(this.register.age)
    ) {
      alert('用户信息不能为空');
      return;
    }
    if (this.register.password !== this.password2) {
      alert('两次密码不一致');
      return;
    }
    const result = this._register.register(this.register).subscribe(
      // (res) => {
      //   console.log(res);
      // },
      // (error: HttpErrorResponse) => {
      //   if (error.status == 400) {
      //     alert(error.error.message);
      //     console.log(error.error);
      //   }
      // }
      {
        next: (res) => {
          alert(res.msg);
          this.router.navigate(['/home']);
          console.log(res);
        },
        complete: () => {
          console.log('complete');
        },
        error: (error: HttpErrorResponse) => {
          if (error.status == 400) {
            alert(error.error.message);
            console.log(error.error);
          }
        },
      }
    );
  }
}
