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

@NgModule({
  declarations: [
    AppComponent,
    LoginManageComponent,
    FamilyLoginComponent,
    EnterpriseLoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HowellModule,
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
