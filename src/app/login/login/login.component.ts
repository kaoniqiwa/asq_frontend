import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';

import { EnterPriseLoginModel, LoginModel } from 'src/app/view-model/login.model';
import { LoginBusiness } from './login.business';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [
    LoginBusiness
  ]
})
export class LoginComponent implements OnInit {

  showLicense = false;
  autoLogin = true;
  loginModel: LoginModel | null = null;
  code:any = '';

  myForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    code: ['', Validators.required]
  })

  @Output()
  validate = new EventEmitter();

  constructor(private _business: LoginBusiness,private _title: Title, private _fb: FormBuilder,private _sessionStorage: SessionStorageService,) {
    this._title.setTitle('用户登录')
    this._sessionStorage.source = 1;
  }

  ngOnInit(): void {
    this.getCode();
  }

  async getCode(){
    //this.code = await this._business.getCode();
    //console.log('getCode',this.code);
  }

  login() {
    this.showLicense = true;
    this.loginModel = new EnterPriseLoginModel(this.myForm.value.username ?? "", this.myForm.value.password ?? "", this.myForm.value.code ?? "")
  }
  closeEvent() {
    this.showLicense = false;
  }
}
