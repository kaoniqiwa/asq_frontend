import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HowellModule } from './common/howell.module';
import { LoginComponent } from './login/login/login.component';
import { Asq3printComponent } from './print/asq3print/asq3print.component';
import { Asqse2printComponent } from './print/asqse2print/asqse2print.component';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LicenseComponent } from './login/license/license.component';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
  registerLocaleData,
} from '@angular/common';
import zh from '@angular/common/locales/zh';
import { RouteReuseStrategy } from '@angular/router';
import { ReuseService } from './route-reuse.service';
import { MloginComponent } from './mlogin/mlogin.component';
import { OtherloginComponent } from './otherlogin/otherlogin.component';
import { AppConfigService } from './common/service/app-init.service';
import { AppHttpInterceptor } from './common/service/app-interceptor.service';
import { CancelInterceptor } from './common/service/cancel-interceptor.service';

registerLocaleData(zh, 'zh-CN');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LicenseComponent,
    Asq3printComponent,
    Asqse2printComponent,
    MloginComponent,
    OtherloginComponent,
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
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CancelInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'zh-CN',
    },
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// 启动项目前加载项目配置
export function initializeApp(appConfigService: AppConfigService) {
  return () => appConfigService.init();
}
