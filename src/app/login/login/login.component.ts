import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';

import { EnterPriseLoginModel, LoginModel } from 'src/app/view-model/login.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  showLicense = false;
  autoLogin = true;
  loginModel: LoginModel | null = null;


  myForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  @Output()
  validate = new EventEmitter();

  constructor(private _title: Title, private _fb: FormBuilder,private _sessionStorage: SessionStorageService,) {
    this._title.setTitle('用户登录')
    this._sessionStorage.source = 1;
  }

  ngOnInit(): void {

  }

  login() {
    this.showLicense = true;
    this.loginModel = new EnterPriseLoginModel(this.myForm.value.username ?? "", this.myForm.value.password ?? "")
  }
  closeEvent() {
    this.showLicense = false;
  }
}
