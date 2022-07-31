import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/enum/route-path.enum';
import { LoginModel } from 'src/app/view-model/login.model';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from 'src/app/network/auth/auth-request.service';

@Component({
  selector: 'app-enterprise-license',
  templateUrl: './enterprise-license.component.html',
  styleUrls: ['./enterprise-license.component.less']
})
export class EnterpriseLicenseComponent implements OnInit {

  agree = true;

  @Input() loginModel: LoginModel | null = null

  @Output() closeLicense = new EventEmitter();
  constructor(private _router: Router, private _authorization: AuthorizationService) { }

  ngOnInit(): void {
  }
  async login() {
    if (this.agree && this.loginModel) {
      let res = await this._authorization.login('1', '2')
      console.log(res)
      if (res) {
        this._router.navigateByUrl(RoutePath.neoballoon)
      }
    }
  }
  close() {
    this.closeLicense.emit()
  }

}
