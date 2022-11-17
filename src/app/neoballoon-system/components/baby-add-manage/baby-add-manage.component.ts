import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { BabyAddManageBusiness } from './baby-add-manage.business';
//import asq3 from 'src/assets/files/ASQ-3.asq202211092.xlsx';
//console.log(JSON.stringify(asq3));
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
  user:any = {};
  doctor:any = {};

  constructor(private _sessionStorage: SessionStorageService,private _business: BabyAddManageBusiness ,private _router: Router) {
    this.user = this._sessionStorage.user;
    this.doctor = this._sessionStorage.doctor;
    console.log('app-baby-add-manage',this._sessionStorage.user,this._sessionStorage.doctor);
    console.log('this._sessionStorage.questscore_changeScan',this._sessionStorage.questscore);
  }

  ngOnInit(): void {
    //this.getUuid();
  }

  gotoSearch(){
    this.showOldMember = true;
    this.showAuthorize = false;
  }

  changeUser() {
    this._sessionStorage.questscore = null;
    console.log('this._sessionStorage.questscore_changeUser',this._sessionStorage.questscore);
    this.showAuthorize = true;
    /* if (this.selectUser == '0') {
      this.showAuthorize = true;
    } else if (this.selectUser == '1') {
      this.showOldMember = true;
    } */
  }
  changeScan(e:Event) {
    console.log('changeScan',this.selectScan);
    this._sessionStorage.questscore = null;
    console.log('this._sessionStorage.questscore_changeScan',this._sessionStorage.questscore);
    if(this.selectScan == 'ASQ-3'){
      this._router.navigate(["/neoballoon/neoballoon-manage/baby-qrcode-manage"], {
        queryParams: {
          selectScan: this.selectScan,
        }
      })

    }
  }

  changeMessage(e:Event){
    this._sessionStorage.questscore = null;
    console.log('this._sessionStorage.questscore_changeMessage',this._sessionStorage.questscore);
    if(this.selectMessage == 'ASQ-3'){
      this._router.navigate(["/neoballoon/neoballoon-manage/baby-message-manage"], {
        queryParams: {
          selectMessage: this.selectMessage,
        }
      })

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
