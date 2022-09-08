import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/enum/route-path.enum';
import { LoginModel } from 'src/app/view-model/login.model';
import { AuthorizationService } from 'src/app/network/auth/auth-request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.less']
})
export class LicenseComponent implements OnInit {

  agree = true;
  isLogin = false;

  @Input() loginModel: LoginModel | null = null

  @Output() closeEvent = new EventEmitter();
  constructor(private _router: Router, private _authorization: AuthorizationService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
  }
  async login() {
    if (this.agree && this.loginModel) {
      this.isLogin = true;
      try {
        let res = await this._authorization.login(this.loginModel.username, this.loginModel.password).catch(e => {
          this._toastrService.error('登录失败')
        })
        if (res) {
          this._router.navigateByUrl(RoutePath.neoballoon)
        }
      } catch (e) {

      } finally {
        this.isLogin = false;
      }
    }
  }
  close() {
    this.closeEvent.emit()
  }

}
