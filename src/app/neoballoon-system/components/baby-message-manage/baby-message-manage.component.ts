import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { BabyMessageManageBusiness } from './baby-message-manage.business';
import { ValidPhone } from '../../../common/tools/tool';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-baby-message-manage',
  templateUrl: './baby-message-manage.component.html',
  styleUrls: ['./baby-message-manage.component.less'],
  providers: [
    BabyMessageManageBusiness
  ]
})

export class BabyMessageManageComponent implements OnInit {

  myForm = this._fb.group({
    phone: ['', [Validators.required, Validators.pattern(ValidPhone), Validators.maxLength(11)]]
  })
  
  messageStep:any = 1;

  selectScan = "";
  selectMessage = "";
  mphone = '';
  user:any = {};
  doctor:any = {};
  qrcodeUrl = '';
  lastNum:any = '刷新';
  qrcodeShow = false;
  sending:any = false;
  qrcode:any = {};
  Am:any = '0';
  At:any = '0';
  phones_r:any = '';
  phones_w:any = '';
  uploadFloat:any = false;
  uploadS:any = false;
  reader = new FileReader();

  constructor(private _sessionStorage: SessionStorageService,private _business: BabyMessageManageBusiness ,private _router: Router,private _activeRoute: ActivatedRoute,private _fb: FormBuilder,private _toastrService: ToastrService) {
    this.user = this._sessionStorage.user;
    this.doctor = this._sessionStorage.doctor;
    this._activeRoute.queryParams.subscribe(params => {
      this.selectMessage = params['selectMessage'];
      this.Am = params['Am'];
      this.At = params['At'];
    })
    console.log('app-baby-add-manage',this._sessionStorage.user,this._sessionStorage.doctor);

    this.reader.onloadstart = () => {
      // this.data = [];
      // this.loading = true;
      this.phones_r = '';
      this.phones_w = '';
    };
    this.reader.onload = (e: any) => {
      
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      const worksheet:any = wb.Sheets[wb.SheetNames[0]];
      const keys = Object.keys(worksheet);
      /////////////////////////////
      keys
          // 过滤以 ! 开头的 key
          .filter(k => k[0] !== '!')
          // 遍历所有单元格
          .forEach(k => {
              const value = worksheet[k].w;
              
              if(value != ''){
                if(!this.check_phone(String(value))){
                  this.phones_w += value+';';
                }else{
                  this.phones_r += value+';';
                }
                
              }
          });
      //////////////////////////
      //console.log('data',data)
    };
    this.reader.onloadend = () => {
      console.log('onloadend');
    };
  }

  async ngOnInit() {
    let params:any = {};
    params.Uid = this.user.Id;
    params.Did = this.doctor.Id;

    this.qrcode = await this._business.getUuid(params);
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

  async submit() {
    if (this._checkForm()) {
      if (this.doctor) {
        //this.messageStep = 2;
        if(!this.sending){
          this.sending = true;
          let phone = this.myForm.value.phone!;
          console.log('phone',phone);
          let params:any = {};//sendUrl($phone,$type,$uid,$did,$un,$pw,$sn);
          params.phone = phone;
          params.type = encodeURIComponent(this.selectMessage);
          params.uid = this.user.Seq;
          params.did = this.doctor.Seq;
          params.un = this.qrcode.Username;
          params.pw = this.qrcode.Password;
          params.sn = 'ASQ系统中文版';
          params.name = this.user.Name;
          params.Am = this.Am;
          params.At = this.At;
          let res:any = await this._business.sendUrl(params);
          if(res.content.Message == 'OK'){
            this.messageStep = 2;
          }
        }else{
          this._toastrService.warning('发送中！，请稍等。');
        }
        
      } else {
        this._toastrService.error('请先选择医生');
      }

    }
  }

  private setSelectMessage(){
    if(this.selectMessage == "ASQ-3"){
      return 3;
    }else if(this.selectMessage == "ASQ:SE-2"){
      return 2;
    }else if(this.selectMessage == "ASQ:SE"){
      return 1;
    }else{
      return 0;
    }
  }

  private _checkForm() {
    if (this.myForm.invalid) {
      if (this.myForm.get('phone')!.invalid) {
        if ('required' in this.myForm.get('phone')!.errors!) {
          this._toastrService.warning('请输入手机号');
          return false;
        }
        if ('pattern' in this.myForm.get('phone')!.errors!) {
          this._toastrService.warning('手机号格式不正确');
          return false;

        }
      }
    }
    return true;
  }

  showFloat(){
    if(this.uploadFloat){
      this.uploadFloat = false;
      this.phones_r = '';
      this.phones_w = '';
    }else{
      this.uploadFloat = true;
    }
  }

  upload(e:any){
    console.log('upload',e);
    var selectedFile = e.target.files[0];
    this.reader.readAsBinaryString(selectedFile);
  }
  

}
