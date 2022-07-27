import { Component, OnInit } from '@angular/core';
import { AccountOperationDisplay } from './account-operation.model';

@Component({
  selector: 'app-account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.less']
})
export class AccountOperationComponent implements OnInit {

  userName = '示教账号';
  display = new AccountOperationDisplay();

  constructor() { }

  ngOnInit(): void {
  }

  bindMobile(e: Event) {

  }
  changePassword(e: Event) {

  }
  logoutHandler() {

  }
}
