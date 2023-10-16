import { Component, OnInit } from '@angular/core';
import { EquipmentsService } from '../service/equipments.service';
import { HttpErrorResponse } from '@angular/common/http';
import { getISOWeek } from 'date-fns';

import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
interface Euipment {
  id: string;
  e_id: string;
  e_name: string;
  e_state: string;
  e_type: string;
  in_time: string;
  warranty_time: string;
}
@Component({
  selector: 'nx-porject-euipment',
  templateUrl: './euipment.component.html',
  styleUrls: ['./euipment.component.css'],
})
export class EuipmentComponent implements OnInit {
  isEnglish = false;
  listOfData: Euipment[] = [
    // {
    //   id: '1',
    //   e_id: '1',
    //   e_name: '1',
    //   e_state: '1',
    //   e_type: '1',
    //   in_time: '1',
    //   warranty_time: '1',
    // },
    // {
    //   id: '2',
    //   e_id: '2',
    //   e_name: '2',
    //   e_state: '2',
    //   e_type: '2',
    //   in_time: '2',
    //   warranty_time: '2',
    // },
  ];
  searchValue = {
    e_id: '',
    e_name: '',
    e_state: '',
    e_type: '',
    in_time: '',
    warranty_time: '',
  };
  visible = false;
  listOfDisplayData = [...this.listOfData];
  loading = true;
  isVisible = false;
  isOkLoading = false;
  ModalTitle!: string;
  sendInfo!: Euipment;
  addInfo: Euipment = {
    id: '',
    e_id: '',
    e_name: '',
    e_state: '',
    e_type: '',
    in_time: '',
    warranty_time: '',
  };
  PageIndex = 1;
  PageSize = 10;
  total = 100;
  sort1 = 'ascend';
  constructor(
    private readonly euipments: EquipmentsService,
    private i18n: NzI18nService
  ) {}
  ngOnInit(): void {
    interface r {
      items: Euipment[];
      total: number;
    }
    this.euipments
      .getEquipmentsPage<r>(this.PageIndex, this.PageSize)
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
  }
  changePageIndex(e: number) {
    interface r {
      items: Euipment[];
      total: number;
    }
    this.euipments.getEquipmentsPage<r>(e, this.PageSize).subscribe({
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
      e_id: '',
      e_name: '',
      e_state: '',
      e_type: '',
      in_time: '',
      warranty_time: '',
    };
    this.search();
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  search(): void {
    this.visible = false;
    console.log(this.searchValue);
    interface r {
      items: Euipment[];
      total: number;
    }
    this.euipments
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
    //   (item: Euipment) => item.e_name.indexOf(this.searchValue.e_name) !== -1
    // );
  }
  showModal(title: string, ep: Euipment): void {
    if (title === 'Delete') {
      this.ModalTitle = 'Delete';
      console.log(1);
    } else if (title === 'Edit') {
      this.ModalTitle = 'Edit';
      console.log(2);
    } else {
      this.ModalTitle = 'Add';
      console.log(this.addInfo);
    }
    this.sendInfo = ep;
    this.isVisible = true;
  }

  handleOk(sendInfo: Euipment): void {
    if (this.ModalTitle === 'Delete') {
      this.euipments.deleteEquipment(sendInfo.id).subscribe({
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
    } else if (this.ModalTitle === 'Edit') {
      this.euipments.updateEquipment(sendInfo.id, sendInfo).subscribe({
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
    } else if (this.ModalTitle === 'Add') {
      if (
        !this.addInfo.e_name ||
        !this.addInfo.e_state ||
        !this.addInfo.e_type ||
        !this.addInfo.in_time
      ) {
        alert('请输入完整信息');
        return;
      }
      this.euipments.addEquipment(this.addInfo).subscribe({
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
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  sortFn(content: string, e: any) {
    if (e === 'ascend' && content === 'in_time') {
      this.listOfData = this.listOfData.sort((a, b) => {
        return new Date(a.in_time).getTime() - new Date(b.in_time).getTime();
      });
    } else if (e === 'descend' && content === 'in_time') {
      this.listOfData = this.listOfData.sort((a, b) => {
        return new Date(b.in_time).getTime() - new Date(a.in_time).getTime();
      });
    } else if (e === 'ascend' && content === 'warranty_time') {
      this.listOfData = this.listOfData.sort((a, b) => {
        return (
          new Date(a.warranty_time).getTime() -
          new Date(b.warranty_time).getTime()
        );
      });
    } else if (e === 'descend' && content === 'warranty_time') {
      this.listOfData = this.listOfData.sort((a, b) => {
        return (
          new Date(a.warranty_time).getTime() -
          new Date(b.warranty_time).getTime()
        );
      });
    }
    this.listOfDisplayData = [...this.listOfData];
    console.log(e);
  }
}
