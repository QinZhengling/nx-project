import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { NgFor, registerLocaleData } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ManageComponent } from './manage/manage.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './Sidebar/sidebar.component';
import { EuipmentComponent } from './euipment/euipment.component';
import { UsersComponent } from './users/users.component';
import { EuipmentMaintanceComponent } from './euipment_maintance/euipment-maintance.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import zh from '@angular/common/locales/zh';
import { LogComponent } from './log/log.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { RoleComponent } from './role/role.component';
// import { AuthInterceptor } from './interceptor/interceptor';
registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ManageComponent,
    SidebarComponent,
    EuipmentComponent,
    UsersComponent,
    EuipmentMaintanceComponent,
    LogComponent,
    RoleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    NgFor,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    NzTableModule,
    NzDividerModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzDatePickerModule,
    NzPaginationModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  bootstrap: [AppComponent],
  exports: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ManageComponent,
    SidebarComponent,
    EuipmentComponent,
    UsersComponent,
    EuipmentMaintanceComponent,
    LogComponent,
    RoleComponent,
  ],
})
export class AppModule {}
