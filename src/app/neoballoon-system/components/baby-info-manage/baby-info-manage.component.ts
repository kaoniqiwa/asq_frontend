import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { Language } from 'src/app/common/tools/language';
import { convertToChinaNum, ValidPhone } from 'src/app/common/tools/tool';
import { DialogEnum } from 'src/app/enum/dialog.enum';
import { EducateDegree } from 'src/app/enum/educate-degree.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { Gender } from 'src/app/enum/gender.enum';
import { IdentityType } from 'src/app/enum/identity-type.enum';
import { MemberRelation } from 'src/app/enum/member-role.enum';
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
export class BabyInfoManageComponent implements OnInit, AfterViewInit {
  // member id
  mid = "";

  // 根据mid查询到的 member信息
  member: Member | null = null;
  existMember: Member | null = null;

  // 当前member下已经有的baby
  babyInMember: Baby[] = [];

  // 新添加的宝宝
  babyGroupToBeAdd: FormGroup[] = []

  // 性别
  Gender = Gender;

  // 文化程度
  EducateDegree = EducateDegree;

  dialogModel = new ConfirmDialogModel('确认删除', '删除该宝宝?');
  dialogModelExist = new ConfirmDialogModel('', '已存在该用户,是否进入筛查?');
  showConfirm = false;
  showExist = false;


  dateFormat: string = 'yyyy-MM-dd';
  today = new Date();

  transformDate = (date: Date | string) => {
    return formatDate(date, this.dateFormat, 'en')
  }
  province = "请选择";
  city = "请选择";
  county = "请选择";

  editMemberInfo = false;
  // 问卷人信息
  memberGroup = this._fb.group({
    name: ['', Validators.required],
    relation: [MemberRelation.None, Validators.required],
    province: [''],
    city: [''],
    county: [''],
    phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(ValidPhone)]],
    address: [''],
    email: [''],
    postCode: [''],
    isHelp: [''],
    helpInfo: [''],
    motherJob: [''],
    fatherJob: [''],
    motherDegree: [EducateDegree.None],
    fatherDegree: [EducateDegree.None],
    otherDegree: [EducateDegree.None],
    motherBirth: [this.transformDate(this.today)],
    fatherBirth: [this.transformDate(this.today)],
  })

  // 宝宝信息
  babyGroupArr: Array<FormGroup> = [];


  moreDetail = false;


  currentIndex = 0;

  // 最大宝宝数
  maxLength = 5;


  get Phone() {
    return this.memberGroup.get('phone') as FormControl;
  }
  getBirthday(group: FormGroup) {
    return group.get('birthday') as FormControl;
  }

  constructor(private _business: BabyInfoManageBusiness, private _fb: FormBuilder, private _router: Router, private _toastrService: ToastrService, private _activeRoute: ActivatedRoute, private _sessionStorage: SessionStorageService) {
    this._activeRoute.queryParams.subscribe((params) => {
      this.mid = params['mid'];
      console.log('member id', this.mid);
    })
  }

  async ngOnInit() {
    if (this.mid) {
      this.member = await this._business.getMember(this.mid);

      let { Data: babys } = await this._business.listBaby([this.mid]);
      console.log(babys)
      this.babyInMember = babys;

    } else {
      this.addBabyGroup();
    }
    this._updateForm();

    // this.province = "辽宁省";
    // this.city = "大连市";

    // this.county = "中山区"




  }
  ngAfterViewInit(): void {
    console.log('view init');
    // $('#target').distpicker({
    //   province: this.province,
    //   city: this.city,
    //   district: this.county
    // });
  }
  changeProvince(province: string) {
    this.province = province;

    this.city = "";

    this.county = "";

    this.memberGroup.patchValue({
      province: this.province,
      city: this.city,
      county: this.county

    })
  }
  changeCity(city: string) {
    this.city = city;

    this.county = "";
    this.memberGroup.patchValue({
      province: this.province,
      city: this.city,
      county: this.county

    })

  }
  changeCounty(county: string) {
    this.county = county;
    this.memberGroup.patchValue({
      province: this.province,
      city: this.city,
      county: this.county

    })
  }
  addBabyGroup() {
    if (this.babyGroupArr.length < this.maxLength) {
      let newGroup = this.newBabyGroup();
      newGroup.get('surveyTime')?.disable();
      this.babyGroupToBeAdd.push(newGroup);
      this.babyGroupArr.push(newGroup);

    }
  }
  deleteBabyGroup(index: number, e: Event) {
    e.stopPropagation();

    if (index == this.babyGroupArr.length - 1) {
      if (index <= this.babyInMember.length - 1) {

        this.showConfirm = true;
      }
      else {
        this.babyGroupArr.splice(index, 1);
        if (this.currentIndex == index) {
          this.currentIndex = index - 1
        }
      }
    } else {
      this._toastrService.warning('请依次删除')
    }
  }
  newBabyGroup() {
    return this._fb.group({
      name: ["", Validators.required],
      identityInfo: [''],
      identityType: [IdentityType.Child],
      gender: ['', Validators.required],
      birthday: [this.transformDate(this.today)],
      surveyTime: [this.transformDate(this.today)],
      premature: ['否'],
      prematrueweek: '0',
      prematrueday: '0',
      weight: [''],
      bornCondition: this._fb.group({
        isShun: '是',
        isChanqian: '',
        isMulti: "",
        abnormal: ''
      }),
      editBabyInfo: false
    })
  }
  async dialogMsgEvent(status: DialogEnum) {
    this.showConfirm = false;
    if (status == DialogEnum.confirm) {
      console.log(this.currentIndex)
      let baby = this.babyInMember[this.currentIndex];
      // this._deleteRows(this.willBeDeleted)

      let res = await this._business.deleteBaby(baby);
      console.log(res)
    } else if (status == DialogEnum.cancel) {

    }
  }
  dialogEditMsgEvent(status: DialogEnum) {
    this.showExist = false;
    if (status == DialogEnum.confirm) {
      console.log(this.mid)
      if (this.existMember) {
        this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"], {
          queryParams: {
            mid: this.existMember.Id
          }
        })
      }


    } else if (status == DialogEnum.cancel) {

    }
  }
  changeBirthday(date: Date, group: FormGroup) {
    group.patchValue({
      birthday: this.transformDate(date)
    })
  }
  changeBabyInfo(group: FormGroup) {
    let editBabyInfo = group.value.editBabyInfo;
    editBabyInfo = !editBabyInfo;
    group.patchValue({
      editBabyInfo
    })

    if (editBabyInfo) {
      group.enable();
      group.get('birthday')?.disable();
      group.get('surveyTime')?.disable();
    } else {
      group.disable();

    }

  }
  changeMemberInfo() {
    this.editMemberInfo = !this.editMemberInfo;
    if (this.editMemberInfo) {

      this.memberGroup.enable();

      this.Phone.disable();
    } else {
      this.memberGroup.disable();

    }

  }
  keyupHandler(group: FormGroup) {
    // console.log(group.value.name)
    let reg = /[^\u4e00-\u9fa5]/g;
    let x = group.value.name.replace(reg, "");
    console.log(x)

    group.patchValue({
      name: x
    })

  }
  async onSubmit() {
    console.log(this.babyGroupArr,this.babyGroupArr[this.currentIndex].getRawValue().premature);
    console.log(this.memberGroup);

    if (this._checkForm()) {
      if (this.mid) {
        console.log('老用户');

        if (this.member) {
          this.member.Name = this.memberGroup.value.name ?? "";
          this.member.Relation = this.memberGroup.value.relation ?? MemberRelation.None;
          this.member.Province = this.province;
          this.member.City = this.city
          this.member.County = this.county;
          this.member.Email = this.memberGroup.value.email ?? "";
          this.member.PostCode = this.memberGroup.value.postCode ?? "";
          this.member.Address = this.memberGroup.value.address ?? "";
          this.member.MotherJob = this.memberGroup.value.motherJob ?? "";
          this.member.FatherJob = this.memberGroup.value.fatherJob ?? "";
          this.member.MotherDegree = this.memberGroup.value.motherDegree ?? EducateDegree.None
          this.member.FatherDegree = this.memberGroup.value.fatherDegree ?? EducateDegree.None
          this.member.OtherDegree = this.memberGroup.value.otherDegree ?? EducateDegree.None
          this.member.MotherBirth = this.memberGroup.value.motherBirth ?? "";
          this.member.FatherBirth = this.memberGroup.value.fatherBirth ?? "";

          this._business.updateMember(this.member);


          if (this.babyInMember) {
            for (let i = 0; i < this.babyInMember.length; i++) {
              let baby = this.babyInMember[i];
              let babyGroup = this.babyGroupArr[i]
              baby.Name = babyGroup.value.name;

              this._business.updateBaby(baby);
            }
          }
          if (this.babyGroupToBeAdd) {
            for (let i = 0; i < this.babyGroupToBeAdd.length; i++) {
              let babyGroup = this.babyGroupToBeAdd[i];

              let rawValue = babyGroup.getRawValue();


              let babyModel = new Baby();
              babyModel.Id = "";
              babyModel.Mid = this.member.Id;
              babyModel.Name = rawValue.name;
              babyModel.Gender = rawValue.gender;
              babyModel.Birthday = rawValue.birthday;
              babyModel.SurveyTime = rawValue.surveyTime;
              babyModel.Premature = rawValue.premature;
              babyModel.Prematrueweek = rawValue.prematrueweek;
              babyModel.Prematrueday = rawValue.prematrueday;
              babyModel.IsShun = rawValue.bornCondition.isShun;
              babyModel.IdentityInfo = rawValue.identityInfo;
              babyModel.IdentityType = rawValue.identityType;
              babyModel.Weight = rawValue.weight;
              babyModel.IsChanqian = rawValue.bornCondition.isChanqian;
              babyModel.IsMulti = rawValue.bornCondition.isMulti;
              babyModel.OtherAbnormal = rawValue.bornCondition.abnormal;

              let babyRes = await this._business.addBaby(babyModel);
            }
          }
          this._toastrService.success('提交成功');
          this.navigateToSurveyManage(this.member.Id);


        }

      } else {
        console.log('新用户');
        let doctor = this._sessionStorage.doctor;
        if (doctor) {
          let phone = this.memberGroup.value.phone;
          if (phone) {
            let { Data: existMember } = await this._business.listMember([phone])
            console.log(existMember)
            if (existMember.length) {
              this.existMember = existMember[0];
              this._toastrService.error('该问卷人已存在,请重新填写手机号');
              // this.showExist = true;
              return;
            }
          }


          let memberModel = new Member();
          memberModel.Id = '';
          memberModel.Did = doctor.Id;
          memberModel.Name = this.memberGroup.value.name ?? '';
          memberModel.Phone = this.memberGroup.value.phone ?? "";
          memberModel.Relation = this.memberGroup.value.relation ?? MemberRelation.None;
          memberModel.Province = this.memberGroup.value.province ?? "";
          memberModel.City = this.memberGroup.value.city ?? "";
          memberModel.County = this.memberGroup.value.county ?? "";
          memberModel.Email = this.memberGroup.value.email ?? "";
          memberModel.IsHelp = this.memberGroup.value.isHelp ?? "";
          memberModel.HelpInfo = this.memberGroup.value.helpInfo ?? "";
          memberModel.PostCode = this.memberGroup.value.postCode ?? "";
          memberModel.Address = this.memberGroup.value.address ?? "";
          memberModel.MotherJob = this.memberGroup.value.motherJob ?? "";
          memberModel.FatherJob = this.memberGroup.value.fatherJob ?? "";
          memberModel.MotherDegree = this.memberGroup.value.motherDegree ?? EducateDegree.None
          memberModel.FatherDegree = this.memberGroup.value.fatherDegree ?? EducateDegree.None
          memberModel.OtherDegree = this.memberGroup.value.otherDegree ?? EducateDegree.None
          memberModel.MotherBirth = this.memberGroup.value.motherBirth ?? "";
          memberModel.FatherBirth = this.memberGroup.value.fatherBirth ?? "";


          let memberRes = await this._business.addMember(memberModel);


          for (let i = 0; i < this.babyGroupArr.length; i++) {
            let babyGroup = this.babyGroupArr[i];
            let rawValue = babyGroup.getRawValue();

            let babyModel = new Baby();
            babyModel.Id = "";
            babyModel.Mid = memberRes.Id;
            babyModel.Name = rawValue.name;
            babyModel.Gender = rawValue.gender;
            babyModel.Birthday = rawValue.birthday;
            babyModel.SurveyTime = rawValue.surveyTime;
            babyModel.Premature = rawValue.premature;
            babyModel.Prematrueweek = rawValue.prematrueweek;
            babyModel.Prematrueday = rawValue.prematrueday;
            babyModel.IsShun = rawValue.bornCondition.isShun;
            babyModel.IdentityInfo = rawValue.identityInfo;
            babyModel.IdentityType = rawValue.identityType;
            babyModel.Weight = rawValue.weight;
            babyModel.IsChanqian = rawValue.bornCondition.isChanqian;
            babyModel.IsMulti = rawValue.bornCondition.isMulti;
            babyModel.OtherAbnormal = rawValue.bornCondition.abnormal;


            let babyRes = await this._business.addBaby(babyModel);
            console.log('添加 baby ', babyRes);

          }

          this._toastrService.success('提交成功');
          this.navigateToSurveyManage(memberRes.Id);



        }
        else {
          this._toastrService.error('请先选择医生');
          this._router.navigate(["/neoballoon/neoballoon-manage/account"])
        }
      }

    }


  }
  navigateToSurveyManage(mid: string) {
    this._router.navigate(["/neoballoon/neoballoon-manage/survey-manage", mid])
  }
  goBack() {
    this._router.navigate(["/neoballoon/neoballoon-manage/baby-add-manage"])
  }


  /*************private ********************/


  private _updateForm() {


    if (this.member) {
      this.memberGroup.disable();

      this.province = this.member.Province ?? "";
      this.city = this.member.City ?? "";
      this.county = this.member.County ?? "";



      this.memberGroup.patchValue({
        name: this.member.Name,
        relation: this.member.Relation,
        province: this.member.Province,
        city: this.member.City,
        county: this.member.County,
        phone: this.member.Phone,
        address: this.member.Address,
        email: this.member.Email,
        postCode: this.member.PostCode,
        isHelp: this.member.IsHelp,
        helpInfo: this.member.HelpInfo,
        motherJob: this.member.MotherJob,
        fatherJob: this.member.FatherJob,
        motherDegree: this.member.MotherDegree,
        fatherDegree: this.member.FatherDegree,
        otherDegree: this.member.OtherDegree,
        motherBirth: this.member.MotherBirth,
        fatherBirth: this.member.FatherBirth,
      })
      if (this.babyInMember) {
        for (let i = 0; i < this.babyInMember.length; i++) {
          let baby = this.babyInMember[i];
          let info = this.newBabyGroup();
          info.disable();
          info.patchValue({
            name: baby.Name,
            gender: baby.Gender,
            birthday: this.transformDate(baby.Birthday),
            surveyTime: this.transformDate(baby.SurveyTime),
            identityType: baby.IdentityType,
            identityInfo: baby.IdentityInfo,
            premature: baby.Premature,
            prematrueweek: baby.Prematrueweek,
            prematrueday: baby.Prematrueday,
            weight: baby.Weight,
            bornCondition: {
              isShun: baby.IsShun,
              isChanqian: baby.IsChanqian,
              isMulti: baby.IsMulti,
              abnormal: baby.OtherAbnormal
            }

          })
          this.babyGroupArr.push(info)
        }
      }

    }


    $('#target').distpicker({
      province: this.province,
      city: this.city,
      district: this.county
    });
  }

  private _checkForm() {
    console.log(this.memberGroup.get('phone')!.errors)
    for (let i = 0; i < this.babyGroupArr.length; i++) {
      let control = this.babyGroupArr[i];
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
          return false;
        }
        // if (this.memberGroup.get('phone')!.value!.length != 11) {
        //   this._toastrService.warning('请输入11位手机号');
        //   return false;
        // }
        if ('pattern' in this.memberGroup.get('phone')!.errors!) {
          this._toastrService.warning('请输入正确的手机号格式');
          return
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
  prematrueweek: string;
  prematrueday: string;
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
  role: MemberRelation;
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