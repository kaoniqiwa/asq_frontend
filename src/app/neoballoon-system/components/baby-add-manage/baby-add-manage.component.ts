import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-baby-add-manage',
  templateUrl: './baby-add-manage.component.html',
  styleUrls: ['./baby-add-manage.component.less']
})
export class BabyAddManageComponent implements OnInit {

  // 新用户同意协议
  showAuthorize = false;

  showOldMember = false;

  // 快速了解三种筛查模式
  showQuick = false;

  selectUser = "";
  selectScan = "";
  selectMessage = "";

  constructor() { }

  ngOnInit(): void {
  }


  changeUser() {
    if (this.selectUser == '0') {
      this.showAuthorize = true;
    } else if (this.selectUser == '1') {
      this.showOldMember = true;
    }
  }
  changeScan() {

  }
  showQuickHandler() {
    this.showQuick = true;
  }
  closeAuthorize() {
    this.showAuthorize = false;
    this.selectUser = "";
  }
  closeOld() {
    this.showOldMember = false;
    this.selectUser = "";
  }
  closeQuick() {
    this.showQuick = false;
  }

}
