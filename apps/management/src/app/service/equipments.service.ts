/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
interface Euipment {
  id: string;
  e_id: string;
  e_name: string;
  e_state: string;
  e_type: string;
  in_time: string;
  warranty_time: string;
}
interface maintance {
  id: string;
  e_id: string;
  e_name: string;
  m_info: string;
  m_time: string;
  create_time: string;
  create_user: string;
}
@Injectable({
  providedIn: 'root',
})
export class EquipmentsService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000/api';
  private readonly token: string = localStorage.getItem('token') as string;

  getEquipments<r>() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<r>(`${this.baseUrl}/equipments`, { headers })
      .pipe(take(1));
  }
  search<r>(
    searchValue: {
      e_id: string;
      e_name: string;
      e_state: string;
      e_type: string;
      in_time: string;
      warranty_time: string;
    },
    PageIndex: number,
    PageSize: number
  ) {
    const params = new HttpParams()
      .set('PageIndex', PageIndex)
      .set('PageSize', PageSize)
      .set('e_id', searchValue.e_id)
      .set('e_name', searchValue.e_name)
      .set('e_state', searchValue.e_state)
      .set('e_type', searchValue.e_type)
      .set('in_time', searchValue.in_time)
      .set('warranty_time', searchValue.warranty_time);
    // console.log(params);

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<r>(`${this.baseUrl}/equipments`, { params, headers })
      .pipe(take(1));
  }
  getEquipmentsPage<r>(PageIndex: number, PageSize: number) {
    const params = new HttpParams()
      .set('PageIndex', PageIndex)
      .set('PageSize', PageSize);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<r>(`${this.baseUrl}/equipments/page`, {
        params,
        headers,
      })
      .pipe(take(1));
  }
  getMaintenances() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<[]>(`${this.baseUrl}/equipments/maintances`, {
        headers,
      })
      .pipe(take(1));
  }
  getMaintenancesPage<r>(PageIndex: number, PageSize: number) {
    const params = new HttpParams()
      .set('PageIndex', PageIndex)
      .set('PageSize', PageSize);
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<r>(`${this.baseUrl}/equipments/maintances/page`, {
        params,
        headers,
      })
      .pipe(take(1));
  }

  deleteEquipment(id: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .delete(`${this.baseUrl}/equipments/${id}`, { headers })
      .pipe(take(1));
  }
  updateEquipment(id: string, ep: Euipment) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .put(`${this.baseUrl}/equipments/` + `${id}`, ep, {
        headers,
      })
      .pipe(take(1));
  }
  addEquipment(ep: Euipment) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .post(`${this.baseUrl}/equipments`, ep, {
        headers,
      })
      .pipe(take(1));
  }

  deleteMaintenances(e_id: string, id: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .delete(`${this.baseUrl}/equipments/${e_id}/maintances/${id}`, {
        headers,
      })
      .pipe(take(1));
  }
  updateMaintenances(id: string, ep: maintance) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .put(`${this.baseUrl}/equipments/` + `${id}` + '/maintance', ep, {
        headers,
      })
      .pipe(take(1));
  }
  addMaintenances(ep: maintance) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .post(`${this.baseUrl}/equipments/maintances`, ep, {
        headers,
      })
      .pipe(take(1));
  }
}
