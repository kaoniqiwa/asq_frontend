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
  phone:any = '';
  member:any = null;
  code:any = 123456;
  setCode:any = '';
  lastNum:any = '获取验证码';



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

  async sendSms(){
    if(this.lastNum != '获取验证码')return;
    console.log('this.phone',this.phone);
    if(!this.check_phone(String(this.phone))){
      this._toastrService.warning('请输入有效的手机号码！');
    }else{
      let params:any = {};
      params.phone = this.phone;
      let res:any = await this._business.sendSms(params);
      console.log('ngOnInit2',res);
      if(res.content.Message == 'OK'){
        this.code = res.code;
      }
      this.setTime();
      console.log('ngOnInit2',res,this.code);
    }
    
    
  }

  setTime(){
    let t = 30;
    let that = this;
    that.lastNum = t;
    let thisinterval = setInterval(function(){
      t--;
      that.lastNum = t;
      if(t<=0){
        that.lastNum = '获取验证码';
        clearInterval(thisinterval);
      }
    },1000)
  }

  phoneSubmit():any{
    console.log('phoneSubmit',this.setCode,this.code);
    /* if(!this.check_phone(String(this.phone))){
      return this._toastrService.warning('请输入有效的手机号码！');
    }
    if(this.setCode != this.code){
      return this._toastrService.error('验证码错误！');
    } */
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

  async goToInfo(e:Event){
    e.stopPropagation();
    
    if(this.readed){

      let res = await this._business.getMember(this.doctor.Id, this.phone);
      if (res.Data.length) {
        this.member = res.Data[0];
        this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"], {
          queryParams: {
            mid: this.member.Id,
            source: this._sessionStorage.source
          }
        })
      } else {
        this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"], {
          queryParams: {
            mid: '',
            phone:this.phone,
            source: this._sessionStorage.source
          }
        })
        this._toastrService.error('未查询到该用户，请填入基本信息')
      }
      
      /* this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"], {
        queryParams: {
          phone:this.phone,
          source: this._sessionStorage.source,
        }
      }) */
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

  check_phone(mobile:any){
    console.log('mobile.length',mobile.length);
      
    if(mobile.length!=11) 
    { 
      console.log('222');
        return false; 
    }
    
    var myreg = /^(((1[3-9][0-9]{1}))+\d{8})$/; 
    if(!myreg.test(mobile)) 
    { 
        console.log('333');
        return false; 
    }
    
    return true;
}

  counter(i: number) {
    return new Array(i);
  }

}
