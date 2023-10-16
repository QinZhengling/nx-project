import { Component, OnInit } from '@angular/core';
import { EquipmentsService } from '../service/equipments.service';
import { HttpErrorResponse } from '@angular/common/http';
import { getISOWeek } from 'date-fns';

import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { LogsService } from '../service/logs.service';
interface userLogs {
  id: string;
  username: string;
  account: string;
  u_do: string;
  create_time: string;
  create_user: string;
}
interface equipmentLogs {
  id: string;
  e_id: string;
  e_type: string;
  e_name: string;
  e_do: string;
  create_time: string;
  create_user: string;
}
@Component({
  selector: 'nx-porject-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})
export class LogComponent implements OnInit {
  isEnglish = false;
  ListofUserData: userLogs[] = [];
  listOfEquipmentData: equipmentLogs[] = [];
  searchValue = '';
  visible = false;
  log = 'userLogs';
  listOfDisplayUserData: userLogs[] = [];
  listOfDisplayEquipmentData: equipmentLogs[] = [];
  loading = true;
  loadingE = true;
  isVisible = false;
  isOkLoading = false;
  ModalTitle!: string;
  PageIndex = 1;
  PageSize = 10;
  total = 100;
  constructor(
    private readonly logs: LogsService,
    private i18n: NzI18nService
  ) {}
  ngOnInit(): void {
    interface r {
      items: userLogs[];
      total: number;
    }
    interface e {
      items: equipmentLogs[];
      total: number;
    }
    if (this.log === 'userLogs') {
      this.logs.getUsersPage<r>(this.PageIndex, this.PageSize).subscribe({
        next: (res) => {
          this.ListofUserData = res.items;
          this.ListofUserData = this.ListofUserData.sort((a, b) => {
            const dateA = new Date(a.create_time);
            const dateB = new Date(b.create_time);
            return dateA.getTime() - dateB.getTime();
          });
          this.listOfDisplayUserData = [...this.ListofUserData];
          this.loading = false;
          this.total = res.total;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            location.reload();
            localStorage.clear();
          }
        },
      });
    } else {
      this.logs
        .getEquipmentPage<e>(this.PageIndex, this.PageSize)
        .subscribe((res) => {
          this.listOfEquipmentData = res.items;
          this.listOfEquipmentData = this.listOfEquipmentData.sort((a, b) => {
            const dateA = new Date(a.create_time);
            const dateB = new Date(b.create_time);
            return dateA.getTime() - dateB.getTime();
          });
          this.listOfDisplayEquipmentData = [...this.listOfEquipmentData];

          this.loadingE = false;
          this.total = res.total;
        });
    }
  }
  changePageIndex(e: number) {
    interface r {
      items: userLogs[];
      total: number;
    }
    interface e {
      items: equipmentLogs[];
      total: number;
    }
    if (this.log === 'userLogs') {
      this.logs.getUsersPage<r>(e, this.PageSize).subscribe({
        next: (res) => {
          this.ListofUserData = res.items;
          this.total = res.total;
          this.listOfDisplayUserData = [...this.ListofUserData];
          this.loading = false;
        },
      });
    } else {
      this.logs.getEquipmentPage<e>(e, this.PageSize).subscribe({
        next: (res) => {
          this.listOfEquipmentData = res.items;
          this.total = res.total;
          this.listOfDisplayEquipmentData = [...this.listOfEquipmentData];
          this.loading = false;
        },
      });
    }
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  search(): void {
    this.visible = false;
    // this.listOfDisplayData = this.listOfData.filter(
    //   (item) => item.e_name.indexOf(this.searchValue) !== -1
    // );
  }
  change() {
    this.log === 'userLogs'
      ? (this.log = 'equipmentLogs')
      : (this.log = 'userLogs');
    this.PageIndex = 1;
    this.PageSize = 5;
    this.ngOnInit();
  }
}
