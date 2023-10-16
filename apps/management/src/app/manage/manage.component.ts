import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { EquipmentsService } from '../service/equipments.service';
import { LogsService } from '../service/logs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'nx-porject-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.less'],
})
export class ManageComponent implements OnInit {
  isActive1 = false;
  isActive2 = false;
  isActive3 = false;
  isActive4 = false;
  isActive5 = false;
  img1 = '../../assets/users.svg';
  img2 = '../../assets/equipment.svg';
  img3 = '../../assets/equipment2.svg';
  img4 = '../../assets/log.svg';
  img5 = '../../assets/log.svg';
  allUsers!: number;
  allEquipments!: number;
  allMaintenances!: number;
  allLog!: number;
  constructor(
    private readonly users: UserService,
    private readonly equipments: EquipmentsService,
    private readonly logs: LogsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const path = window.location.pathname;
    if (path.includes('users')) {
      this.isActive1 = true;
      this.img1 = '../../assets/users_after.svg';
    } else if (path.includes('euipment')) {
      this.isActive2 = true;
      this.img2 = '../../assets/equipment_after.svg';
    } else if (path.includes('euipment_maintance')) {
      this.isActive3 = true;
      this.img3 = '../../assets/equipment2_after.svg';
    } else if (path.includes('log')) {
      this.isActive4 = true;
      this.img4 = '../../assets/log_after.svg';
    } else if (path.includes('role')) {
      this.isActive5 = true;
      this.img5 = '../../assets/log_after.svg';
    }
    // 获取所有用户

    this.users.getUsers().subscribe({
      next: (res) => {
        console.log(res.length);
        this.allUsers = res.length;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          sessionStorage.clear();
        }
      },
    });
    interface r {
      total: number;
    }
    this.equipments.getEquipments<r>().subscribe({
      next: (res) => {
        console.log(res.total);

        this.allEquipments = res.total;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          sessionStorage.clear();
        }
      },
    });
    this.equipments.getMaintenances().subscribe({
      next: (res) => {
        this.allMaintenances = res.length;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          sessionStorage.clear();
        }
      },
    });
    this.logs.getUserLogs().subscribe({
      next: (res) => {
        this.allLog = res.length;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          sessionStorage.clear();
        }
      },
    });
    this.logs.getEquipmentLogs().subscribe({
      next: (res) => {
        this.allLog += res.length;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          sessionStorage.clear();
        }
      },
    });
  }

  toggleClick(num: number) {
    const item = localStorage.getItem('role');
    console.log(item);

    switch (num) {
      case 1:
        if (item) {
          const role = Array.from(JSON.parse(item));
          console.log(role);
          if (role.includes(2)) {
            this.img1 = '../../assets/users_after.svg';
            this.img2 = '../../assets/equipment.svg';
            this.img3 = '../../assets/equipment2.svg';
            this.img4 = '../../assets/log.svg';
            this.img5 = '../../assets/log.svg';
            this.isActive1 = true;
            this.isActive2 = false;
            this.isActive3 = false;
            this.isActive4 = false;
            this.isActive5 = false;
            this.router.navigate(['/manage/users']);
          } else {
            alert('No Roles');
          }
        }
        break;
      case 2:
        if (item) {
          const role = Array.from(JSON.parse(item));
          console.log(role);
          if (role.includes(2)) {
            this.img1 = '../../assets/users.svg';
            this.img2 = '../../assets/equipment_after.svg';
            this.img3 = '../../assets/equipment2.svg';
            this.img4 = '../../assets/log.svg';
            this.img5 = '../../assets/log.svg';
            this.isActive1 = false;
            this.isActive2 = true;
            this.isActive3 = false;
            this.isActive4 = false;
            this.isActive5 = false;
            this.router.navigate(['/manage/euipment']);
          } else {
            alert('No Roles');
          }
        }

        break;
      case 3:
        if (item) {
          const role = Array.from(JSON.parse(item));
          console.log(role);
          if (role.includes(2)) {
            this.img1 = '../../assets/users.svg';
            this.img2 = '../../assets/equipment.svg';
            this.img3 = '../../assets/equipment2_after.svg';
            this.img4 = '../../assets/log.svg';
            this.img5 = '../../assets/log.svg';
            this.isActive1 = false;
            this.isActive2 = false;
            this.isActive3 = true;
            this.isActive4 = false;
            this.isActive5 = false;
            this.router.navigate(['/manage/euipment_maintance']);
          } else {
            alert('No Roles');
          }
        }

        break;
      case 4:
        if (item) {
          const role = Array.from(JSON.parse(item));
          console.log(role);
          if (role.includes(2)) {
            this.img1 = '../../assets/users.svg';
            this.img2 = '../../assets/equipment.svg';
            this.img3 = '../../assets/equipment2.svg';
            this.img4 = '../../assets/log_after.svg';
            this.img5 = '../../assets/log.svg';
            this.isActive1 = false;
            this.isActive2 = false;
            this.isActive3 = false;
            this.isActive4 = true;
            this.isActive5 = false;
            this.router.navigate(['/manage/log']);
          } else {
            alert('No Roles');
          }
        }

        break;
      case 5:
        if (item) {
          const role = Array.from(JSON.parse(item));
          console.log(role);
          if (role) {
            this.img1 = '../../assets/users.svg';
            this.img2 = '../../assets/equipment.svg';
            this.img3 = '../../assets/equipment2.svg';
            this.img4 = '../../assets/log.svg';
            this.img5 = '../../assets/log_after.svg';
            this.isActive1 = false;
            this.isActive2 = false;
            this.isActive3 = false;
            this.isActive4 = false;
            this.isActive5 = true;
            this.router.navigate(['/manage/role']);
          } else {
            alert('No Roles');
          }
        }
        break;
      default:
        return;
    }
  }
  @HostListener('document:keydown.tab', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    event.preventDefault();
  }
}
