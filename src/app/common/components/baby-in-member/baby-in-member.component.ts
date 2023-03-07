import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/network/model/doctor.model';
import { Member } from 'src/app/network/model/member.model';
import { LocalStorageService } from '../../service/local-storage.service';
import { SessionStorageService } from '../../service/session-storage.service';
import { ValidPhone } from '../../tools/tool';
import { BabyInMemberBusiness } from './baby-in-member.business';

@Component({
  selector: 'baby-in-member',
  templateUrl: './baby-in-member.component.html',
  styleUrls: ['./baby-in-member.component.less'],
  providers: [
    BabyInMemberBusiness
  ]
})
export class BabyInMemberComponent implements OnInit {

  @Input() Am:any;
  @Input() At:any;
  @Output() closeEvent = new EventEmitter();



  myForm = this._fb.group({
    name: [''],
    phone: ['', [Validators.required, Validators.pattern(ValidPhone), Validators.maxLength(11)]]
  })


  member: Member | null = null;
  doctor: Doctor | null = null;


  constructor(private _business: BabyInMemberBusiness, private _fb: FormBuilder, private _toastrService: ToastrService, private _router: Router, private _sessionStorage: SessionStorageService) {
    this.doctor = this._sessionStorage.doctor;

  }

  ngOnInit(): void {
  }
  async submit() {
    if (this._checkForm()) {
      if (this.doctor) {
        let phone = this.myForm.value.phone!;
        let res = await this._business.getMember(this.doctor.Id, phone);
        if (res.Data.length) {
          this.member = res.Data[0];
          this._sessionStorage.mid = this.member.Id;
          this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"], {
            queryParams: {
              mid: this.member.Id,
              source: 1,
              Am:this.Am,
              At:this.At
            }
          })
        } else {
          this._sessionStorage.mid = '';
          this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"], {
            queryParams: {
              mid: '',
              phone:phone,
              source: 1,
              Am:this.Am,
              At:this.At
            }
          })
          this._toastrService.error('未查询到该用户，请填入基本信息')
        }
      } else {
        this._toastrService.error('请先选择医生');
      }

      // console.log(res)

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
