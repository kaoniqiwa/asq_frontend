import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { MloginBusiness } from './mlogin.business';

//import { EnterPriseLoginModel, LoginModel } from 'src/app/view-model/login.model';
@Component({
  selector: 'mlogin',
  templateUrl: './mlogin.component.html',
  styleUrls: ['./mlogin.component.less'],
  providers: [
    MloginBusiness
  ]
})
export class MloginComponent implements OnInit {
  
  phoneStatus = true;
  screenStatus = false;
  helpStatus = false;
  authorizeStatus = false;
  readed = false;
  uid:any = '';
  did:any = '';
  uuid:any = '';
  user: any = null;
  doctor: any = null;



  constructor(private _title: Title, private _fb: FormBuilder, private _activeRoute: ActivatedRoute, private _business: MloginBusiness, private _sessionStorage: SessionStorageService,private _toastrService: ToastrService,private _router: Router) {
    this._sessionStorage.source = 2;
    this._activeRoute.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.did = params['did'];
      this.uuid = params['uuid'];
    })
    console.log('mlogin',this._sessionStorage.source,this.uid,this.did,this.uuid);
  }

  async ngOnInit() {
    this.user = await this._business.getUser(this.uid);
    this._sessionStorage.user = this.user;
    this.doctor = await this._business.getDoctor(this.did);
    this._sessionStorage.doctor = this.doctor;
    console.log('ngOnInit',this.user,this.doctor);
    
  }

  phoneSubmit(){
    this.phoneStatus = false;
    this.screenStatus = true;
  }

  screenSubmit(){
    this.screenStatus = false;
    this.authorizeStatus = true;
  }

  helpShow(){
    this.helpStatus = true;
  }
  helpHide(){
    this.helpStatus = false;
  }

  goToInfo(e:Event){
    e.stopPropagation();
    if(this.readed){
      
      this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"], {
        queryParams: {
          source: Number(this._sessionStorage.source.replace('"', "").replace('"', "")),
        }
      })
    }else{
      this._toastrService.warning('请阅读并勾选注意事项。');
    }
  }

  setDate(str: string) {
    var reg = /(\d{4})\-(\d{2})\-(\d{2})/;
    var date = str.replace(reg, "$1年$2月$3日");
    return date;
  }

  setThisScore(num: any) {
    if (Number(num) == 1) {
      return 10;
    } else if (Number(num) == 2) {
      return 5;
    } else {
      return 0;
    }
  }

  counter(i: number) {
    return new Array(i);
  }

}
