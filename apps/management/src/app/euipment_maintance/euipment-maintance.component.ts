import { Component, OnInit } from '@angular/core';
import { EquipmentsService } from '../service/equipments.service';
import { HttpErrorResponse } from '@angular/common/http';
interface maintance {
  id: string;
  e_id: string;
  e_name: string;
  m_info: string;
  m_time: string;
  create_time: string;
  create_user: string;
}
@Component({
  selector: 'nx-porject-euipment-maintance',
  templateUrl: './euipment-maintance.component.html',
  styleUrls: ['./euipment-maintance.component.css'],
})
export class EuipmentMaintanceComponent implements OnInit {
  listOfData: maintance[] = [
    // {
    //   id: '1',
    //   e_id: '1',
    //   e_name: '1',
    //   m_info: '1',
    //   m_time: '1',
    //   create_time: '1',
    //   create_user: '1',
    // },
    // {
    //   id: '2',
    //   e_id: '2',
    //   e_name: '2',
    //   m_info: '2',
    //   m_time: '2',
    //   create_time: '2',
    //   create_user: '2',
    // },
  ];
  searchValue = '';
  visible = false;
  listOfDisplayData = [...this.listOfData];
  loading = true;
  isVisible = false;
  isOkLoading = false;
  ModalTitle!: string;
  sendInfo!: maintance;
  addInfo: maintance = {
    id: '',
    e_id: '',
    e_name: '',
    m_info: '',
    m_time: '',
    create_time: '',
    create_user: '',
  };
  PageIndex = 1;
  PageSize = 10;
  total = 100;
  constructor(private readonly euipments: EquipmentsService) {}
  ngOnInit(): void {
    interface r {
      items: maintance[];
      total: number;
    }
    this.euipments
      .getMaintenancesPage<r>(this.PageIndex, this.PageSize)
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
            localStorage.clear();
          }
        },
      });
  }
  changePageIndex(e: number) {
    interface r {
      items: maintance[];
      total: number;
    }
    this.euipments.getMaintenancesPage<r>(e, this.PageSize).subscribe({
      next: (res) => {
        this.listOfData = res.items;
        this.total = res.total;
        this.listOfDisplayData = [...this.listOfData];
        this.loading = false;
      },
    });
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
    this.listOfDisplayData = this.listOfData.filter(
      (item: maintance) => item.e_name.indexOf(this.searchValue) !== -1
    );
  }
  showModal(title: string, ep: maintance): void {
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
    console.log(this.ModalTitle);

    this.sendInfo = ep;
    this.isVisible = true;
  }

  handleOk(sendInfo: maintance): void {
    if (this.ModalTitle === 'Delete') {
      this.euipments.deleteMaintenances(sendInfo.e_id, sendInfo.id).subscribe({
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
      this.euipments.updateMaintenances(sendInfo.id, sendInfo).subscribe({
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
        !this.addInfo.e_id ||
        !this.addInfo.m_info ||
        !this.addInfo.m_time
      ) {
        alert('请输入完整信息');
        return;
      }
      this.euipments.addMaintenances(this.addInfo).subscribe({
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
}
