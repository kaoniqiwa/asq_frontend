import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { BabyQrcodeManageBusiness } from './baby-qrcode-manage.business';

@Component({
  selector: 'app-baby-qrcode-manage',
  templateUrl: './baby-qrcode-manage.component.html',
  styleUrls: ['./baby-qrcode-manage.component.less'],
  providers: [
    BabyQrcodeManageBusiness
  ]
})

export class BabyQrcodeManageComponent implements OnInit {

  // 新用户同意协议
  showAuthorize = false;

  showOldMember = false;

  // 快速了解三种筛查模式
  showQuick = false;

  selectUser = "";
  selectScan = "";
  selectMessage = "";
  user:any = {};
  doctor:any = {};
  qrcodeUrl = '';
  lastNum:any = '刷新';
  qrcodeShow = false;
  Am:any = '0';
  At:any = '0';
  thisinterval:any;

  constructor(private _sessionStorage: SessionStorageService,private _business: BabyQrcodeManageBusiness ,private _router: Router,private _activeRoute: ActivatedRoute) {
    this.user = this._sessionStorage.user;
    this.doctor = this._sessionStorage.doctor;
    this._activeRoute.queryParams.subscribe(params => {
      this.selectScan = params['selectScan'];
      this.Am = params['Am'];
      this.At = params['At'];
    })
    console.log('app-baby-add-manage',this._sessionStorage.user,this._sessionStorage.doctor);
  }

  ngOnInit(): void {
    this.getUuid();
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
    this.qrcodeUrl = this_href+'#/mlogin?uid='+this.user.Seq+'&did='+this.doctor.Seq+'&username='+qrcode.Username+'&password='+qrcode.Password+'&uuid='+qrcode.Uuid+'&type='+this.selectScan+'&Am='+this.Am+'&At='+this.At;
    console.log('qrcodeUrl',this.qrcodeUrl);
    this.qrcodeShow = true;
    this.setTime();
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
  setTime(){
    let t = 20;
    let that = this;
    that.lastNum = t+'S';
    clearInterval(that.thisinterval);
    that.thisinterval = setInterval(function(){
      t--;
      that.lastNum = t+'S';
      if(t<=0){
        that.lastNum = '刷新';
        that.qrcodeShow = false;
        clearInterval(that.thisinterval);
      }
    },1000)
  }
  refresh(){
    if(this.lastNum != '刷新')return
    this.getUuid();
  }
  

}
