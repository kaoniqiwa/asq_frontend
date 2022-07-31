import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HowellModule } from './common/howell.module';
import { EnterpriseLoginComponent } from './login/enterprise-login/enterprise-login.component';
import { FamilyLoginComponent } from './login/family-login/family-login.component';
import { LoginManageComponent } from './login/login-manage/login-manage.component';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service'
import { HttpClientModule } from '@angular/common/http';
import { EnterpriseLicenseComponent } from './login/enterprise-license/enterprise-license.component';
import { FamilyLicenseComponent } from './login/family-license/family-license.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginManageComponent,
    FamilyLoginComponent,
    EnterpriseLoginComponent,
    EnterpriseLicenseComponent,
    FamilyLicenseComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HowellModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 1500,
      extendedTimeOut: 1500,
      closeButton: false,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
    }),
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
