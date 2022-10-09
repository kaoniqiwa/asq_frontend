import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Language } from 'src/app/common/tools/language';
import { convertToChinaNum, ValidPhone } from 'src/app/common/tools/tool';
import { EducateDegree } from 'src/app/enum/educate-degree.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { Gender } from 'src/app/enum/gender.enum';
import { IdentityType } from 'src/app/enum/identity-type.enum';
import { MemberRole } from 'src/app/enum/member-role.enum';
import { Baby } from 'src/app/network/model/baby.model';
import { Member } from 'src/app/network/model/member.model';
import { BabyInfoManageBusiness } from './baby-info-manage.business';

@Component({
  selector: 'baby-info-manage',
  templateUrl: './baby-info-manage.component.html',
  styleUrls: ['./baby-info-manage.component.less'],
  providers: [
    BabyInfoManageBusiness
  ]
})
export class BabyInfoManageComponent implements OnInit {


  Gender = Gender;

  dateFormat: string = 'yyyy-MM-dd';
  today = new Date();

  infoArr: Array<FormGroup> = [];
  memberGroup = this._fb.group({
    name: ['', Validators.required],
    relation: [MemberRole.None, Validators.required],
    province: [''],
    city: [''],
    county: [''],
    phone: ['', [Validators.required, Validators.pattern(ValidPhone)]],
    address: [''],
    email: [''],
    postCode: [''],
    isHelp: ['1'],
    motherJob: [''],
    fatherJob: [''],
    motherDegree: [''],
    fatherDegree: [''],
    otherDegree: [''],
    motherBirth: [''],
    fatherBirth: [''],
  })

  moreDetail = false;


  currentIndex = 0;
  maxLength = 5;

  state = FormState.add;

  constructor(private _business: BabyInfoManageBusiness, private _fb: FormBuilder, private _router: Router, private _toastrService: ToastrService, private _localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this._init();
  }
  private _init() {
    this.addInfo();

  }
  addInfo() {
    if (this.infoArr.length < this.maxLength) {
      this.infoArr.push(this.newInfo());

    }
  }
  deleteInfo(index: number, e: Event) {
    e.stopPropagation();

    if (index == this.infoArr.length - 1) {
      this.infoArr.splice(index, 1);
      if (this.currentIndex == index) {
        this.currentIndex = index - 1
      }
    } else {
      this._toastrService.warning('请依次删除')
    }
  }
  newInfo() {
    return this._fb.group({
      name: ['', Validators.required],
      identityInfo: [''],
      identityType: [IdentityType.Child],
      gender: ['', Validators.required],
      birthday: [this.today],
      survey: [this.today],
      premature: [false],
      weight: [''],
      bornCondition: this._fb.group({
        isShun: true,
        isHelp: false,
        isMulti: false,
        abnormal: ''
      }),
    })
  }
  changeBirthday(date: Date, group: FormGroup) {
    group.patchValue({
      birthday: date
    })
  }
  async onSubmit() {
    // console.log(this.infoArr)

    if (this._checkForm()) {
      // let doctor = this._localStorage.doctor;
      // if (doctor) {

      //   let member = this.memberGroup.value;

      //   let memberModel = new Member();
      //   memberModel.Id = '';
      //   memberModel.Did = doctor.Id;
      //   memberModel.Name = member.name ?? '';
      //   memberModel.Phone = member.phone ?? "";
      //   memberModel.Province = member.province ?? "";
      //   memberModel.City = member.city ?? "";
      //   memberModel.County = member.county ?? "";
      //   memberModel.Email = member.email ?? "";
      //   memberModel.PostCode = member.postCode ?? "";
      //   memberModel.Address = member.address ?? "";
      //   memberModel.MotherJob = member.motherJob ?? "";
      //   memberModel.FatherJob = member.fatherJob ?? "";
      //   memberModel.MotherDegree = +(member.motherDegree ?? "");
      //   memberModel.FatherDegree = +(member.fatherDegree ?? "");
      //   memberModel.OtherDegree = +(member.otherDegree ?? "");
      //   memberModel.MotherBirth = member.motherBirth ?? "";
      //   memberModel.FatherBirth = member.fatherBirth ?? "";


      //   let memberRes = await this._business.addMember(memberModel);


      //   for (let i = 0; i < this.infoArr.length; i++) {
      //     let info = this.infoArr[i];
      //     let baby = info.value as IBaby;


      //     let babyModel = new Baby();
      //     babyModel.Id = "";
      //     babyModel.Mid = memberRes.Id;
      //     babyModel.Relation = '父亲';
      //     babyModel.Name = baby.name;
      //     babyModel.Gender = baby.gender;
      //     babyModel.Birthday = baby.birthday;
      //     babyModel.SurveyTime = baby.survey;
      //     babyModel.Premature = baby.premature;
      //     babyModel.IsShun = baby.bornCondition.isShun;
      //     babyModel.IdentityInfo = baby.identityInfo;
      //     babyModel.IdentityType = baby.identityType;
      //     babyModel.Weight = baby.weight;
      //     babyModel.IsHelp = baby.bornCondition.isHelp;
      //     babyModel.IsMulti = baby.bornCondition.isMulti;
      //     babyModel.OtherAbnormal = baby.bornCondition.abnormal;


      //     let babyRes = await this._business.addBaby(babyModel);
      //     console.log('添加 baby ', babyRes);

      //   }

      //   this._toastrService.success('提交成功');
      //   this.navigateToSurveyManage(memberRes.Id);

      // }
      // else {
      //   this._toastrService.error('请先选择医生');
      //   this._router.navigate(["/neoballoon/neoballoon-manage/account"])
      // }
    }


  }
  navigateToSurveyManage(mid: string) {
    this._router.navigate(["/neoballoon/neoballoon-manage/survey-manage", mid])
  }
  goBack() {
    this._router.navigate(["/neoballoon/neoballoon-manage/baby-add-manage"])
  }
  private _checkForm() {
    for (let i = 0; i < this.infoArr.length; i++) {
      let control = this.infoArr[i];
      // console.log(control)
      if (control.invalid) {
        if (control.get('name')!.invalid) {
          this._toastrService.warning('宝宝' + convertToChinaNum(i + 1) + ': 请输入宝宝姓名');
          return false;
        }
        if (control.get('gender')!.invalid) {
          this._toastrService.warning('宝宝' + convertToChinaNum(i + 1) + ': 请选择宝宝性别');
          return false;
        }
      }
    }
    if (this.memberGroup.invalid) {
      if (this.memberGroup.get('name')?.invalid) {
        this._toastrService.warning('请输入问卷人姓名');
        return false;
      }
      if (this.memberGroup.get('relation')?.invalid) {
        this._toastrService.warning('请选择问卷人身份');
        return false;
      }
      if (this.memberGroup.get('phone')!.invalid) {
        if ('required' in this.memberGroup.get('phone')!.errors!) {
          this._toastrService.warning('请输入问卷人手机号');
        }
        if ('pattern' in this.memberGroup.get('phone')!.errors!) {
          this._toastrService.warning('请输入正确的手机号格式');
        }
        return false;
      }

    }
    return true;
  }


}


interface IBaby {
  name: string;
  identityInfo: string;
  identityType: IdentityType;
  gender: Gender;
  birthday: string;
  survey: string;
  premature: boolean;
  weight: string;
  bornCondition: IBabyCondition;

}
interface IBabyCondition {
  isShun: boolean;
  isHelp: boolean;
  isMulti: boolean;
  abnormal: string;

}

interface IMember {
  name: string;
  role: MemberRole;
  province: string;
  city: string;
  county: string;
  phone: string;
  address: string;
  email: string;
  postCode: string;
  isHelp: boolean;
  motherJob: string;
  fatherJob: string
  motherDegree: EducateDegree;
  fatherDegree: EducateDegree
  otherDegree: EducateDegree
  motherBirth: string;
  fatherBirth: string;
  more: boolean;
}