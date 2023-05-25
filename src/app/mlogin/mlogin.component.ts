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
  testInfo:any = '调试结果';
  qrcodeStatus:any = true;
  source:any = 1;
  type:any = '';
  seq:any = '';
  Useq:any = '';
  Dseq:any = '';
  Am:any = '0';
  At:any = '0';

  constructor(private _title: Title, private _fb: FormBuilder, private _activeRoute: ActivatedRoute, private _business: MloginBusiness, private _sessionStorage: SessionStorageService,private _toastrService: ToastrService,private _router: Router) {
    
    this._activeRoute.queryParams.subscribe(params => {
      this.Useq = params['uid'];
      this.Dseq = params['did'];
      this.uuid = params['uuid'];
      this.phone = params['phone'];
      this.type = decodeURIComponent(params['type']);
      this.seq = params['seq'];
      this.Am = params['Am'];
      this.At = params['At'];
    })
    if(this.Useq == undefined || this.Dseq == undefined){
      this.qrcodeStatus = false;
      this.phoneStatus = false;
      this.screenStatus = false;
    }
    if(this.phone == undefined){
      this._sessionStorage.source = 2;
    }else{
      this._sessionStorage.source = 3;
      this.phoneStatus = false;
      this.screenStatus = true;
    }
    this._sessionStorage.uuid = this.uuid;
    this._sessionStorage.seq = this.seq;
    this._sessionStorage.Am = this.Am;
    this._sessionStorage.At = this.At;
    this.source = this._sessionStorage.source;
    //console.log('mlogin',this._sessionStorage.source,this.uid,this.did,this.uuid,this.phone);
  }

  async ngOnInit() {
    let Uparams:any = {};
    Uparams.Seq = this.Useq;
    this.user = await this._business.getUserBySeq(Uparams);
    this._sessionStorage.user = this.user;
    this.uid = this.user.Id;
    let Dparams:any = {};
    Dparams.Seq = this.Dseq;
    this.doctor = await this._business.getDoctorBySeq(Dparams);
    this._sessionStorage.doctor = this.doctor;
    this.did = this.doctor.Id;

    if(this.source == 2){
      if(this.uuid == undefined){
        this.qrcodeStatus = false;
        alert('链接已失效，请重新生成');
        return
        ////console.log('隐藏');
      }

      let params:any = {};
      params.Uuid = this.uuid;
      let res:any = await this._business.checkUuid(params);
      //console.log('res',res);
      if(!res){
        this.qrcodeStatus = false;
        alert('链接已失效，请重新生成');
        ////console.log('隐藏');
      }
    }else if(this.source == 3){

      let params:any = {};
      params.uid = this.Useq;
      params.did = this.Dseq;
      params.phone = this.phone;
      params.type = this.type;
      params.seq = this.seq;
      let res:any = await this._business.getStatus(params);
      //console.log('res',res);
      if(!res){
        this.qrcodeStatus = false;
        this.phoneStatus = false;
        this.screenStatus = false;
        alert('问卷已完成，链接失效。');
      }
    }
    

    //console.log('ngOnInit',this.user,this.doctor);

  }

  async sendSms(){
    if(this.lastNum != '获取验证码')return;
    //console.log('this.phone',this.phone);
    if(!this.check_phone(String(this.phone))){
      this._toastrService.warning('请输入有效的手机号码！');
    }else{
      let params:any = {};
      params.phone = this.phone;
      let res:any = await this._business.sendSms(params);
      //console.log('ngOnInit2',res);
      if(res.content.Message == 'OK'){
        this.code = res.code;
      }
      this.setTime();
      //console.log('ngOnInit2',res,this.code);
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
    if(!this.check_phone(String(this.phone))){
      return this._toastrService.warning('请输入有效的手机号码！');
    }
    if(this.setCode != this.code){
      return this._toastrService.error('验证码错误！');
    }
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
    this._sessionStorage.questscore = null;
    //console.log('this._sessionStorage.questscore_goToInfo',this._sessionStorage.questscore);

    if(this.readed){
      let res:any = await this._business.getMember(this.phone);
      this.member = res[0];
      if (res.length) {
        this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"], {
          queryParams: {
            type:this.type,
            mid: this.member.Id,
            source: this._sessionStorage.source,
            Am:this.Am,
            At:this.At
          }
        })
      } else {
        this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"], {
          queryParams: {
            type:this.type,
            mid: '',
            phone:this.phone,
            source: this._sessionStorage.source,
            Am:this.Am,
            At:this.At
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
    //console.log('mobile.length',mobile.length);
      
    if(mobile.length!=11) 
    { 
      //console.log('222');
        return false; 
    }
    
    var myreg = /^(((1[3-9][0-9]{1}))+\d{8})$/; 
    if(!myreg.test(mobile)) 
    { 
        //console.log('333');
        return false; 
    }
    
    return true;
  }

  counter(i: number) {
    return new Array(i);
  }

}
