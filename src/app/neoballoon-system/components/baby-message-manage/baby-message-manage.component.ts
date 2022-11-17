import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { BabyMessageManageBusiness } from './baby-message-manage.business';
import { ValidPhone } from '../../../common/tools/tool';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private _sessionStorage: SessionStorageService,private _business: BabyMessageManageBusiness ,private _router: Router,private _activeRoute: ActivatedRoute,private _fb: FormBuilder,private _toastrService: ToastrService) {
    this.user = this._sessionStorage.user;
    this.doctor = this._sessionStorage.doctor;
    this._activeRoute.queryParams.subscribe(params => {
      this.selectMessage = params['selectMessage'];
    })
    console.log('app-baby-add-manage',this._sessionStorage.user,this._sessionStorage.doctor);
  }

  async ngOnInit() {
    let params:any = {};
    params.Uid = this.user.Id;
    params.Did = this.doctor.Id;

    this.qrcode = await this._business.getUuid(params);
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
          params.type = this.selectMessage;
          params.uid = this.user.Seq;
          params.did = this.doctor.Seq;
          params.un = this.qrcode.Username;
          params.pw = this.qrcode.Password;
          params.sn = 'ASQ系统中文版';
          params.name = this.user.Name;
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
  

}
