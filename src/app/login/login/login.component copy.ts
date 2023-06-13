import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  Sanitizer,
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {
  DomSanitizer,
  SafeResourceUrl,
  Title,
} from '@angular/platform-browser';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';

import {
  EnterPriseLoginModel,
  LoginModel,
} from 'src/app/view-model/login.model';
import { LoginBusiness } from './login.business';
import { AppConfigService } from 'src/app/common/service/app-init.service';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [LoginBusiness],
})
export class LoginComponent implements OnInit {
  showLicense = false;
  autoLogin = true;
  loginModel: LoginModel | null = null;
  code: any = '';
  imgUrl: any = '';

  myForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    code: ['', Validators.required],
  });

  @Output()
  validate = new EventEmitter();

  constructor(
    private _business: LoginBusiness,
    private _title: Title,
    private _fb: FormBuilder,
    private _sessionStorage: SessionStorageService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this._title.setTitle('用户登录');
    this._sessionStorage.source = 1;
    console.log(AppConfigService.settings);
  }

  ngOnInit(): void {
    this.getCode();
  }

  async getCode() {
    // this.code = await this._business.getCode();
    // console.log('getCode', this.code);
    // axios({
    //   url: '/app/asq_server/captcha.php?r=0.5072714284767665',
    //   method: 'GET',
    //   responseType: 'blob',
    // }).then((res) => {
    //   console.log(res);
    //   let resUrl = window.URL.createObjectURL(
    //     new Blob([res.data], { type: 'image/png' })
    //   );
    //   this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(resUrl);
    //   console.log(this.imgUrl);
    // });

    this.http
      .get('/app/asq_server/captcha.php?r=0.5072714284767665', {
        responseType: 'blob',
      })
      .subscribe((res) => {
        let resUrl = window.URL.createObjectURL(
          new Blob([res], { type: 'image/png' })
        );
        this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(resUrl);
        console.log(this.imgUrl);
      });
  }

  login() {
    // this.showLicense = true;
    // this.loginModel = new EnterPriseLoginModel(
    //   this.myForm.value.username ?? '',
    //   this.myForm.value.password ?? '',
    //   this.myForm.value.code ?? ''
    // );

    let code = this.myForm.value.code;
    console.log(code);

    this.http
      .post<any>('/app/asq_server/company.php', {
        Flow: 'checkCode',
        auto_code: 123,
      })
      .subscribe(console.log);
  }
  closeEvent() {
    this.showLicense = false;
  }
}
