import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/enum/route-path.enum';
import { AccountOperationDisplay } from './account-operation.model';

@Component({
  selector: 'app-account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.less']
})
export class AccountOperationComponent implements OnInit {

  userName = '示教账号';
  display = new AccountOperationDisplay();

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  bindMobile(e: Event) {

  }
  changePassword(e: Event) {

  }
  logoutHandler() {
    this._router.navigateByUrl(RoutePath.login)
  }
}
