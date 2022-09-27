import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HowellModule } from './common/howell.module';
import { LoginComponent } from './login/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service'
import { HttpClientModule } from '@angular/common/http';
import { LicenseComponent } from './login/license/license.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import zh from "@angular/common/locales/zh";

registerLocaleData(zh, 'zh-CN');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LicenseComponent,
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
