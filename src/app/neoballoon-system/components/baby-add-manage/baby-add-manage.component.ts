import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { BabyAddManageBusiness } from './baby-add-manage.business';

@Component({
  selector: 'app-baby-add-manage',
  templateUrl: './baby-add-manage.component.html',
  styleUrls: ['./baby-add-manage.component.less'],
  providers: [
    BabyAddManageBusiness
  ]
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
  user:any = null;
  doctor:any = null;
  qrcodeUrl = '';

  constructor(private _sessionStorage: SessionStorageService,private _business: BabyAddManageBusiness ,private _router: Router) {
    this.user = this._sessionStorage.user;
    this.doctor = this._sessionStorage.doctor;
    console.log('app-baby-add-manage',this._sessionStorage.user,this._sessionStorage.doctor);
  }

  ngOnInit(): void {
    //this.getUuid();
  }

  async getUuid(){
    let params:any = {};
    params.Uid = this.user.Id;
    params.Did = this.doctor.Id;

    let qrcode:any = await this._business.getUuid(params);
    let this_href = window.location.href.split('#')[0];
    console.log('href',window.location.href);
    console.log('this._router.url',this._router.url);
    console.log('qrcode',qrcode);
    this.qrcodeUrl = this_href+'#/mlogin?uid='+this.user.Id+'&did='+this.doctor.Id+'&uuid='+qrcode;
    console.log('qrcodeUrl',this.qrcodeUrl);
  }


  changeUser() {
    if (this.selectUser == '0') {
      this.showAuthorize = true;
    } else if (this.selectUser == '1') {
      this.showOldMember = true;
    }
  }
  changeScan(e:Event) {
    console.log('changeScan',this.selectScan);
    if(this.selectScan == 'ASQ-3'){
      this.getUuid();
    }
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
