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
import { param } from 'jquery';
import { ToastrService } from 'ngx-toastr';
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
    private http: HttpClient,
    private _toastrService: ToastrService,
  ) {
    this._title.setTitle('用户登录');
    this._sessionStorage.source = 1;
    console.log(AppConfigService.settings);
  }

  ngOnInit(): void {
    this.getCode();
  }

  async getCode() {
    this.code = '/app/asq_server/captcha.php?r='+Math.random();
  }

  checkCode(){
    let params:any = {};
    params.auto_code = this.myForm.value.code;
    this._business.ckeckCode(params);
  }

  login() {
    /* let params:any = {};
    params.auto_code = this.myForm.value.code;
    let res = this._business.ckeckCode(params);
    console.log('login',res); */

    this.http.post('/app/asq_server/company.php', {
        responseType: 'json',
        Flow:'checkCode',
        auto_code:this.myForm.value.code
      }).subscribe((res:any) => {
        
        console.log('res',res);
        if(res.Data == 1){
          this.showLicense = true;
          this.loginModel = new EnterPriseLoginModel(
            this.myForm.value.username ?? '',
            this.myForm.value.password ?? '',
            this.myForm.value.code ?? ''
          );
        }else{
          this._toastrService.error('验证码错误！');
        }
      });

  }
  closeEvent() {
    this.showLicense = false;
  }
}
