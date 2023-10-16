import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleService } from '../service/role.service';
import { take } from 'rxjs';
interface User {
  id: string;
  user_id: string;
  role_id: number;
}
interface role {
  id: string;
  role_id: number;
  role_name: string;
}
@Component({
  selector: 'nx-porject-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  listOfData: User[] = [
    // { id: '1', user_id: 'user', role_id: 1 },
    // { id: '2', user_id: 'admin', role_id: 2 },
    // { id: '3', user_id: 'super', role_id: 3 },
  ];
  roles: role[] = [];
  title = '';
  content = '';
  updateContent = '';
  isRole = false;
  isOkLoadingRole = false;
  isVisible = false;
  isOkLoading = false;
  listOfDisplayData: User[] = [
    // { id: '1', user_id: 'user', role_id: 1 },
    // { id: '2', user_id: 'admin', role_id: 2 },
    // { id: '3', user_id: 'super', role_id: 3 },
  ];
  loading = true;
  total = 10;
  PageIndex = 1;
  PageSize = 10;
  addRole: role = {
    id: '',
    role_id: NaN,
    role_name: '',
  };
  sendInfo: User = {
    id: '',
    user_id: '',
    role_id: NaN,
  };
  addInfo: User = {
    id: '',
    user_id: '',
    role_id: NaN,
  };
  userTitle = '';
  constructor(private roleService: RoleService) {}

  getRoles() {
    this.roleService
      .findRoles()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.roles = res;
        },
      });
  }
  getUserRoles() {
    this.roleService
      .findUsers()
      .pipe(take(1))
      .subscribe((res) => {
        this.listOfData = res;
        this.listOfDisplayData = [...this.listOfData];
        this.loading = false;
      });
  }
  ngOnInit(): void {
    this.getRoles();
    this.getUserRoles();
  }
  changePageIndex(e: number) {
    console.log(e);
  }
  showModalRole(title: string, role: role): void {
    if (title === 'Add') {
      console.log('add');
    } else if (title === 'Delete') {
      this.content = role.role_name;
    } else {
      this.content = role.role_name;
    }
    this.title = title;
    // console.log(title, role.role_name);
    this.isRole = true;
  }

  handleOk(): void {
    if (this.title === 'Delete') {
      this.roles.findIndex((res) => {
        if (res.role_name === this.content) {
          this.roleService.deleteRole(res.role_id).pipe(take(1)).subscribe();
        }
      });
      // this.roleService.deleteRole('')
    } else if (this.title === 'Update') {
      console.log(this.updateContent);
      this.roles.findIndex((res) => {
        if (res.role_name === this.content) {
          this.roleService
            .updateRole(res.role_id, this.updateContent)
            .pipe(take(1))
            .subscribe();
        }
      });
      // this.roles[this.roles.indexOf(this.content)] = this.updateContent;
    } else {
      console.log(1);
      this.roleService
        .addRole(this.addRole)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err: HttpErrorResponse) => {
            alert(err.message);
          },
        });
    }
    this.getRoles();
    setTimeout(() => {
      this.isRole = false;
      this.isOkLoadingRole = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isRole = false;
  }

  showModal(title: string, content: User): void {
    if (title === 'Delete') {
      this.userTitle = 'Delete';
      console.log(1);
    } else if (title === 'Update') {
      this.userTitle = 'Update';
      console.log(2);
    } else {
      this.userTitle = 'Add';
    }
    this.sendInfo = content;
    this.isVisible = true;
  }

  UserOk(): void {
    if (this.userTitle === 'Delete') {
      this.roleService
        .deleteUserRole(this.sendInfo)
        .pipe(take(1))
        .subscribe({
          next: () => {
            console.log(1);
          },
          error: (err: HttpErrorResponse) => {
            alert(err.message);
          },
        });
      console.log(this.sendInfo);
    } else if (this.userTitle === 'Update') {
      console.log(this.sendInfo);
      this.roleService
        .updateUserRole(this.sendInfo)
        .pipe(take(1))
        .subscribe({
          error: () => {
            alert('修改失败');
          },
        });
      console.log(2);
    } else if (this.userTitle === 'Add') {
      this.roleService
        .addUserRole(this.addInfo)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);

            alert(err.error.message);
          },
        });
      // console.log(this.addInfo);

      if (!this.addInfo.user_id || !this.addInfo.role_id) {
        alert('请输入完整信息');
        return;
      }
      console.log(3);
    }
    this.isVisible = false;
    this.isOkLoading = false;
    this.getUserRoles();
    // setTimeout(() => {
    //   this.isVisible = false;
    //   this.isOkLoading = false;
    //   this.listOfDisplayData = [...this.listOfData];
    // }, 1000);
  }

  UserCancel(): void {
    this.isVisible = false;
  }
}
