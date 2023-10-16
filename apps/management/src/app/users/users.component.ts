import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
interface User {
  id: string;
  username: string;
  password: string;
  account: string;
  age: number;
  sex: number;
}
@Component({
  selector: 'nx-porject-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  listOfData: User[] = [
    // {
    //   id: '1',
    //   username: '张三',
    //   account: '123456',
    //   password: 'string',
    //   age: 120,
    //   sex: 1,
    // },
    // {
    //   id: '2',
    //   username: '李四',
    //   account: '123456',
    //   password: 'string',
    //   age: 220,
    //   sex: 1,
    // },
    // {
    //   id: '3',
    //   username: '王五',
    //   account: '123456',
    //   password: 'string',
    //   age: 320,
    //   sex: 1,
    // },
    // {
    //   id: '4',
    //   username: '赵六',
    //   password: 'string',
    //   account: '123456',
    //   age: 201,
    //   sex: 1,
    // },
    // {
    //   id: '5',
    //   username: '钱七',
    //   password: 'string',
    //   account: '123456',
    //   age: 220,
    //   sex: 1,
    // },
    // {
    //   id: '6',
    //   username: '周八',
    //   password: 'string',
    //   account: '123456',
    //   age: 10,
    //   sex: 1,
    // },
    // {
    //   id: '7',
    //   username: '吴九',
    //   account: '123456',
    //   age: 19,
    //   password: 'string',
    //   sex: 1,
    // },
    // {
    //   id: '8',
    //   username: '郑十',
    //   password: 'string',
    //   account: '123456',
    //   age: 30,
    //   sex: 1,
    // },
    // {
    //   id: '9',
    //   username: '王十一',
    //   password: 'string',
    //   account: '123456',
    //   age: 50,
    //   sex: 1,
    // },
    // {
    //   id: '10',
    //   username: 'abc',
    //   account: '123456',
    //   password: 'string',
    //   age: 110,
    //   sex: 1,
    // },
    // {
    //   id: '11',
    //   username: 'abc',
    //   account: '123456',
    //   password: 'string',
    //   age: 110,
    //   sex: 1,
    // },
  ];
  PageIndex = 1;
  PageSize = 10;
  total = 100;
  sexs: number[] = [0, 1];
  searchValue = {
    username: '',
    account: '',
  };
  visible = false;
  constructor(private users: UserService) {}
  listOfDisplayData = [...this.listOfData];
  loading = true;
  isVisible = false;
  isOkLoading = false;
  ModalTitle!: string;
  sendInfo!: User;
  addInfo: User = {
    id: '',
    password: '',
    username: '',
    account: '',
    age: 18,
    sex: 0,
  };
  filterGender = [
    { text: '男', value: 0 },
    { text: '女', value: 1 },
  ];
  ngOnInit() {
    // this.listOfDisplayData = [...this.listOfData];
    // this.total = this.listOfData.length;
    interface r {
      items: User[];
      total: number;
    }
    this.users.getUsersPage<r>(this.PageIndex, this.PageSize).subscribe({
      next: (res) => {
        this.listOfData = res.items;
        this.total = res.total;
        this.listOfDisplayData = [...this.listOfData];
        this.loading = false;
        console.log(this.listOfData);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          location.reload();
          sessionStorage.clear();
        }
      },
    });
  }
  changePageIndex(e: number) {
    interface r {
      items: User[];
      total: number;
    }
    this.users.getUsersPage<r>(e, this.PageSize).subscribe({
      next: (res) => {
        this.listOfData = res.items;
        this.total = res.total;
        this.listOfDisplayData = [...this.listOfData];
        this.loading = false;
      },
    });
  }
  reset(): void {
    this.searchValue = {
      username: '',
      account: '',
    };
    this.search();
  }

  search(): void {
    this.visible = false;
    interface r {
      items: User[];
      total: number;
    }
    this.users
      .search<r>(this.searchValue, this.PageIndex, this.PageSize)
      .subscribe({
        next: (res) => {
          this.listOfData = res.items;
          this.total = res.total;
          this.listOfDisplayData = [...this.listOfData];
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            location.reload();
            sessionStorage.clear();
          }
        },
      });
    // this.listOfDisplayData = this.listOfData.filter(
    //   (item: User) => item.username.indexOf(this.searchValue.account) !== -1
    // );
  }
  showModal(title: string, user: User): void {
    if (title === 'Delete') {
      this.ModalTitle = 'Delete';
      console.log(1);
    } else if (title === 'Edit') {
      this.ModalTitle = 'Edit';
      console.log(2);
    } else {
      this.ModalTitle = 'Add';
    }
    this.sendInfo = user;
    this.isVisible = true;
  }

  handleOk(sendInfo: User): void {
    if (this.ModalTitle === 'Delete') {
      this.users.deleteUser(sendInfo.id).subscribe((res) => {
        console.log(res);
        this.ngOnInit();
      });
    } else if (this.ModalTitle === 'Edit') {
      this.users.updateUser(sendInfo.id, sendInfo).subscribe(() => {
        this.ngOnInit();
      });
    } else if (this.ModalTitle === 'Add') {
      console.log(this.addInfo);

      if (
        !this.addInfo.username ||
        !this.addInfo.password ||
        !this.addInfo.account ||
        !this.addInfo.age
      ) {
        alert('请输入完整信息');
        return;
      }
      if (
        this.addInfo.username.length < 5 &&
        this.addInfo.password.length < 5 &&
        this.addInfo.account.length < 5
      ) {
        alert('用户名，账号，密码长度必须大于5');
        return;
      }
      this.users.addUser(this.addInfo).subscribe({
        next: () => {
          this.ngOnInit();
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
      });
    }
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      this.listOfDisplayData = [...this.listOfData];
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  sortFn(content: string, e: any) {
    if (e === 'ascend' && content === 'account') {
      this.listOfData = this.listOfData.sort((a, b) =>
        a.account.localeCompare(b.account)
      );
    } else if (e === 'descend' && content === 'account') {
      this.listOfData = this.listOfData.sort((a, b) =>
        b.account.localeCompare(a.account)
      );
    } else if (e === 'ascend' && content === 'age') {
      this.listOfData = this.listOfData.sort((a, b) => {
        return a.age - b.age;
      });
    } else if (e === 'descend' && content === 'age') {
      this.listOfData = this.listOfData.sort((a, b) => {
        return b.age - a.age;
      });
    }
    this.listOfDisplayData = [...this.listOfData];
    console.log(e);
  }
  filterFn(e: any) {
    console.log(e[0]);
    if (e[0] === 0) {
      this.listOfDisplayData = this.listOfData.filter((item) => item.sex === 0);
      // this.listOfDisplayData = [...this.listOfData];
    } else if (e[0] === 1) {
      this.listOfDisplayData = this.listOfData.filter((item) => item.sex === 1);
      // this.listOfDisplayData = [...this.listOfData];
    } else {
      this.listOfDisplayData = [...this.listOfData];
    }
  }
}
