import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoutePath } from 'src/app/enum/route-path.enum';
import { GlobalStorageService } from '../../service/global-storage.service';
import { SessionStorageService } from '../../service/session-storage.service';
import { AccountOperationDisplay } from './account-operation.model';

@Component({
  selector: 'app-account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.less']
})
export class AccountOperationComponent implements OnInit {

  display = new AccountOperationDisplay();

  constructor(private _router: Router, private route: ActivatedRoute, private _sessionStorage: SessionStorageService, private _globalStorage: GlobalStorageService, private _cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  bindMobile(e: Event) {

  }
  changePassword(e: Event) {

  }
  selectSubAccount() {
    this._globalStorage.doctor = null;

    this._router.navigate(['account'], { relativeTo: this.route })
  }
  logoutHandler() {
    this._globalStorage.doctor = null;
    this._sessionStorage.clear();
    this._cookieService.deleteAll();
    this._router.navigateByUrl(RoutePath.login)
  }
}
