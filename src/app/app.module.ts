import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HowellModule } from './common/howell.module';
import { LoginComponent } from './login/login/login.component';
import { Asq3printComponent } from './print/asq3print/asq3print.component';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service'
import { HttpClientModule } from '@angular/common/http';
import { LicenseComponent } from './login/license/license.component';
import { CommonModule, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import zh from "@angular/common/locales/zh";
import { RouteReuseStrategy } from "@angular/router";
import { ReuseService } from "./route-reuse.service";
import { MloginComponent } from './mlogin/mlogin.component';

registerLocaleData(zh, 'zh-CN');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LicenseComponent,
    Asq3printComponent,
    MloginComponent,
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
    CookieService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
