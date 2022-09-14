import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { EducateDegree } from 'src/app/enum/educate-degree.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { Gender } from 'src/app/enum/gender.enum';
import { IdentityType } from 'src/app/enum/identity-type.enum';
import { MemberRole } from 'src/app/enum/member-role.enum';
import { BabyModel } from 'src/app/network/model/baby.model';
import { MemberModel } from 'src/app/network/model/member.model';
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

  currentIndex = 0;
  maxLength = 7;

  state = FormState.add;

  constructor(private _business: BabyInfoManageBusiness, private _fb: FormBuilder, private _router: Router, private _toastrService: ToastrService, private _globalStorage: GlobalStorageService) { }

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
      baby: this._fb.group({
        name: ['test1'],
        identityInfo: ['1212'],
        identityType: [IdentityType.Child],
        gender: [Gender.Male],
        birthday: [this.today],
        survey: [this.today],
        premature: [false],
        weight: ['200'],
        bornCondition: this._fb.group({
          isShun: true,
          isHelp: false,
          isMulti: false,
          abnormal: 'rrr'
        }),
      }),
      member: this._fb.group({
        name: ['测试宝宝1'],
        role: [MemberRole.Father],
        province: [''],
        city: [''],
        county: [''],
        phone: ['18221662082'],
        address: ['上海市'],
        email: ['1061886912@qq.com'],
        postCode: ['212300'],
        isHelp: ['1'],
        motherJob: ['教师'],
        fatherJob: ['厨师'],
        motherDegree: [''],
        fatherDegree: [''],
        otherDegree: [''],
        motherBirth: [''],
        fatherBirth: [''],
        more: [false]
      })
    })
  }
  async onSubmit() {

    let doctor = this._globalStorage.doctor;
    if (doctor) {
      for (let i = 0; i < this.infoArr.length; i++) {
        let info = this.infoArr[i];
        let member = info.value.member as IMember;
        let baby = info.value.baby as IBaby;

        let memberModel = new MemberModel();
        memberModel.id = '';
        memberModel.did = doctor.id;
        memberModel.name = member.name;
        memberModel.phone = member.phone;
        memberModel.member_role = Language.MemberRoleInfo(member.role);
        memberModel.province = member.province;
        memberModel.city = member.city;
        memberModel.county = member.county;
        memberModel.email = member.email;
        memberModel.post_code = member.postCode;
        memberModel.address = member.address;
        memberModel.mother_job = member.motherJob;
        memberModel.father_job = member.fatherJob;
        memberModel.mother_degree = member.motherDegree;
        memberModel.father_degree = member.fatherDegree;
        memberModel.other_degree = member.otherDegree;
        memberModel.mother_birth = member.motherBirth;
        memberModel.father_birth = member.fatherBirth;


        let res = await this._business.addMember(memberModel)
        if (res) {
          let babyModel = new BabyModel();
          babyModel.id = "";
          babyModel.mid = res.id;

          babyModel.name = baby.name;
          babyModel.gender = baby.gender;
          babyModel.birthday = baby.birthday;
          babyModel.survey_time = baby.survey;
          babyModel.premature = baby.premature;
          babyModel.is_shun = baby.bornCondition.isShun;
          babyModel.identity_info = baby.identityInfo;
          babyModel.identity_type = baby.identityType;
          babyModel.weight = baby.weight;
          babyModel.is_help = baby.bornCondition.isHelp;
          babyModel.is_multi = baby.bornCondition.isMulti;
          babyModel.other_abnormal = baby.bornCondition.abnormal;


          await this._business.addBaby(babyModel);
        }
      }
      this._toastrService.success('提交成功');
      this.navigateToSurveyManage();

    }


  }
  navigateToSurveyManage() {
    this._router.navigate(["/neoballoon/neoballoon-manage/survey-manage"])
  }

}


// identity: ['1212'],
// identityType: [IdentityType.Child],
// gender: [Gender.Female],
// birthday: [this.today],
// survey: [this.today],
// premature: ['1'],
// weight: ['200'],
// babyCondition: this._fb.group({
//   isShun: false,
//   isHelp: false,
//   isMulti: false,
//   yichang: 'rrr'
// }),


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