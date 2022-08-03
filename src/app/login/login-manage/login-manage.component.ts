import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { EnterPriseLoginModel, LoginModel } from 'src/app/view-model/login.model';

@Component({
  selector: 'app-login-manage',
  templateUrl: './login-manage.component.html',
  styleUrls: ['./login-manage.component.less']
})
export class LoginManageComponent implements OnInit {

  showLicense = false;

  loginModel: LoginModel | null = null;

  constructor(private _title: Title, private _toastrService: ToastrService) {
    this._title.setTitle('用户登录')
  }

  ngOnInit(): void {

  }
  validate(model: LoginModel) {
    this.showLicense = true;
    this.loginModel = model;
  }
  closeEvent() {
    this.showLicense = false;
  }

}
