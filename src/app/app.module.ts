import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HowellModule } from './common/howell.module';
import { EnterpriseLoginComponent } from './login/enterprise-login/enterprise-login.component';
import { FamilyLoginComponent } from './login/family-login/family-login.component';
import { LoginManageComponent } from './login/login-manage/login-manage.component';

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
    AppRoutingModule,
    HowellModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
