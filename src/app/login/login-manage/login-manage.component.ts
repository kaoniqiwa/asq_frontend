import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-manage',
  templateUrl: './login-manage.component.html',
  styleUrls: ['./login-manage.component.less']
})
export class LoginManageComponent implements OnInit {

  showLicense = false;


  constructor(private _title: Title) {
    this._title.setTitle('登录')
  }

  ngOnInit(): void {

  }
  validate(flag: boolean) {
    this.showLicense = true;
  }
  closeLicense() {
    this.showLicense = false;
  }

}
