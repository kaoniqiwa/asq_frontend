import { formatDate, getLocaleDateFormat } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel } from 'src/app/common/components/confirm-dialog/confirm-dialog.model';
import { DatePickerModel } from 'src/app/common/components/date-picker/date-picker.component';
import { PointerBoxComponent } from 'src/app/common/components/pointer-box/pointer-box.component';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { Language } from 'src/app/common/tools/language';
import { Time } from 'src/app/common/tools/time';
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
  Number(arg0: string) {
    throw new Error('Method not implemented.');
  }
  // member id
  mid = "";

  // 根据mid查询到的 member信息
  member: any = null;
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
  //呼出浮层,false为不显示，true位显示
  float = false;

  dateFormat: string = 'yyyy-MM-dd';
  today = new Date();

  transformDate = (date: Date | string) => {
    return formatDate(date, this.dateFormat, 'en')
  }
  province = "请选择";
  city = "请选择";
  county = "请选择";

  mphone = '';

  editMemberInfo = false;
  // 问卷人信息
  memberGroup = this._fb.group({
    name: [''],
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
    motherBirth: [''],
    fatherBirth: [''],
  })

  getMotherBirth() {
    if (this.memberGroup.value.motherBirth) {

      let arr = this.memberGroup.value.motherBirth.split("-")
      return {
        year: +arr[0],
        month: +arr[1],
        date: +arr[2]
      }

    } else {

      return {
        year: 0,
        month: 0,
        date: 0
      }
    }
  }
  getFatherBirth() {
    if (this.memberGroup.value.fatherBirth) {

      let arr = this.memberGroup.value.fatherBirth.split("-")
      return {
        year: +arr[0],
        month: +arr[1],
        date: +arr[2]
      }

    } else {

      return {
        year: 0,
        month: 0,
        date: 0
      }
    }
  }
  // 宝宝信息
  babyGroupArr: Array<FormGroup> = [];


  moreDetail = false;


  currentIndex = 0;

  // 最大宝宝数
  maxLength = 5;
  source = 0;
  memberResId = '';
  memberChange = false;


  @ViewChild('Pointer', { static: false })
  public Pointer!: PointerBoxComponent;

  get Phone() {
    return this.memberGroup.get('phone') as FormControl;
  }
  getBirthday(group: FormGroup) {
    return group.get('birthday') as FormControl;
  }

  constructor(private _business: BabyInfoManageBusiness, private _fb: FormBuilder, private _router: Router, private _toastrService: ToastrService, private _activeRoute: ActivatedRoute, private _sessionStorage: SessionStorageService) {
    this._activeRoute.queryParams.subscribe((params) => {
      this.source = params['source'];
      
      if (params['phone']) {
        this.mphone = params['phone'];
        this.memberGroup.patchValue({
          phone: this.mphone,
        })
        this.Phone.disable();
      }

      if(params['mid']){
        this.mid = params['mid'];
        this._sessionStorage.mid = params['mid'];
      }else{
        if(!params['phone']){
          this.mid = this._sessionStorage.mid;
        }
      }
      this._sessionStorage.source = params['source'];
      console.log('source_after', this.source, this.mphone);
      
    })

    //console.log('this.memberGroup.value.phone',this.memberGroup.value.phone);
  }

  async ngOnInit() {
    /* let params:any = {};
    params.uid = '3b897c6b-53c0-415d-9080-cd530b769da1';
    params.type = 'AsqLeft';
    let updateLeft = await this._business.updateLeft(params);
    console.log('updateLeft',updateLeft); */

    if (this.mid) {
      this.member = await this._business.getMember(this.mid);
      let that = this;
      let { Data: babys } = await this._business.listBaby([this.mid]);

      babys.map(function (item: any, index: any) {
        item.SurveyTime = that.transformDate(that.today);
      })
      console.log('ngOnInit', babys, this.member);
      this.babyInMember = babys;

    } else {
      this.addBabyGroup();
    }
    this._updateForm();
    
  }

  checkIsChanqian(e:Event){
    let thisCheck = (e.target as HTMLInputElement).getAttribute('value');
    let isChanqian = this.babyGroupArr[this.currentIndex].getRawValue().bornCondition.isChanqian;
    if(thisCheck == isChanqian){
      this.babyGroupArr[this.currentIndex].patchValue({
        bornCondition: {
              isChanqian: ''
            }
      });
    }
  }//checkIsMulti

  checkIsMulti(e:Event){
    let thisCheck = (e.target as HTMLInputElement).getAttribute('value');
    let isMulti = this.babyGroupArr[this.currentIndex].getRawValue().bornCondition.isMulti;
    if(thisCheck == isMulti){
      this.babyGroupArr[this.currentIndex].patchValue({
        bornCondition: {
              isMulti: ''
            }
      });
    }
  }


  ngAfterViewInit(): void {
    // console.log('view init');
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
      //newGroup.get('birthday')?.enable();
      //newGroup.get('surveyTime')?.disable();
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
        if(this.babyGroupToBeAdd.length>0){
          this.babyGroupToBeAdd.splice(this.babyGroupToBeAdd.length-1,1);
        }
        
        if (this.currentIndex == index) {
          this.currentIndex = index - 1
        }
      }
    } else {
      this._toastrService.warning('请依次删除')
    }
  }
  getYmd(date: any, str: any) {
    let thisDate = date;
    console.log('getYmd', thisDate);
    //if(birthday == '')return 0;
    if (str == 'Y') {
      return +thisDate.split('-')[0];
    } else if (str == 'M') {
      return +thisDate.split('-')[1];
    } else {
      return +thisDate.split('-')[2];
    }

  }
  newBabyGroup() {
    return this._fb.group({
      id: '',
      name: ["", Validators.required],
      identityInfo: [''],
      identityType: [IdentityType.Child],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      surveyTime: [this.transformDate(this.today)],
      premature: ['否'],
      prematrueweek: '0',
      prematrueday: '0',
      rectifyage: '',
      weight: [''],
      bornCondition: this._fb.group({
        isShun: '是',
        isChanqian: '',
        isMulti: '',
        abnormal: ''
      }),
      isAnswer:0,
      editBabyInfo: false,
      editBabyBirthday:0,
      editBabysurveyTime:0
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
  pickerChange(date: DatePickerModel, group: FormGroup) {
    let currentPremature = '否';
    if ((+this.rectify(this.babyGroupArr[this.currentIndex].getRawValue().birthday, this.babyGroupArr[this.currentIndex].getRawValue().surveyTime, 0, 0).split('月')[0] > 24)) {
      currentPremature = '否';
    }

    let birthday = date.year + "-" + date.month + "-" + date.date;
    group.patchValue({
      birthday: birthday,
      premature: currentPremature
    })
    //console.log('pickerChange', date ,group);
  }
  pickerChange2(date: DatePickerModel, group: FormGroup) {

    let surveyTime = date.year + "-" + date.month + "-" + date.date;
    group.patchValue({
      surveyTime: surveyTime,
    })
  }

  pickerChange3(date: any, group: FormGroup) {

    let motherBirth = date.year + "-" + date.month + "-" + date.date;
    group.patchValue({
      motherBirth: motherBirth,
    })
  }
  pickerChange4(date: any, group: FormGroup) {

    let fatherBirth = date.year + "-" + date.month + "-" + date.date;
    group.patchValue({
      fatherBirth: fatherBirth,
    })
  }
  changeBirthday(date: Date, group: FormGroup) {

    let currentPremature = '否';
    if ((+this.rectify(this.babyGroupArr[this.currentIndex].getRawValue().birthday, this.babyGroupArr[this.currentIndex].getRawValue().surveyTime, 0, 0).split('月')[0] > 24)) {
      currentPremature = '否';
    }
    group.patchValue({
      birthday: this.transformDate(date),
      premature: currentPremature
    })
  }
  changeBabyInfo(group: FormGroup) {
    let editBabyInfo = group.value.editBabyInfo;
    let isAnswer = group.value.isAnswer;
    editBabyInfo = !editBabyInfo;
    group.patchValue({
      editBabyInfo
    })

    if (editBabyInfo) {
      group.enable();
      if(isAnswer == 1){
        group.get('prematrueweek')?.disable();
        group.get('prematrueday')?.disable();
        group.get('premature')?.disable();
        group.patchValue({
          editBabysurveyTime:0
        })
      }else{
        group.patchValue({
          editBabyBirthday:0,
          editBabysurveyTime:0
        })
      }
      //group.get('birthday')?.disable();
      //group.get('surveyTime')?.disable();
    } else {
      group.disable();
      group.patchValue({
        editBabyBirthday:1,
        editBabysurveyTime:1
      })

    }

  }
  changeMemberInfo() {
    this.editMemberInfo = !this.editMemberInfo;
    if (this.editMemberInfo) {

      this.memberGroup.enable();
      this.memberChange = false;
      this.Phone.disable();
    } else {
      this.memberGroup.disable();
      this.memberChange = true;

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
  onSubmitFloat(e: any) {
    console.log(e, 'onSubmitFloat');
    console.log('this._sessionStorage.questscore_onSubmitFloat',this._sessionStorage.questscore);
    if(this._sessionStorage.questscore != null){
      this._toastrService.error('不能重复答题，即将跳转到筛查页面！');
      if(this.source!=1){
        this._router.navigate(["/mlogin"])
      }else{
        this._router.navigate(["/neoballoon/neoballoon-manage/baby-add-manage"])
      }
    }else{
      if (e == 1) {
        if (this._checkForm()) {
          console.log('通过')
          this.Pointer.setBirthDay(this.babyGroupArr[this.currentIndex].getRawValue().birthday);
          this.Pointer.setShow(1);
          this.float = true;
        }
      } else if (e == 2) {
        this.Pointer.setShow(2);
        this.float = true;
        this.onSubmit();
      } else if (e == 3) {
        this.Pointer.setShow(0);
        this.float = false;
      } else if (e == 4) {
        this.Pointer.setShow(0);
        this.float = false;
        this.navigateToSurveyManage(this.memberResId);
      }
    }
    
  }

  async onSubmit() {
    console.log('this.memberGroup.value.phone4',this.memberGroup.value.phone);
    //console.log(this.babyGroupArr, this.babyGroupArr[this.currentIndex].getRawValue().birthday);
    //console.log(this.memberGroup);
    //console.log('onSubmit', this.rectify(this.babyGroupArr[this.currentIndex].getRawValue().birthday, this.babyGroupArr[this.currentIndex].getRawValue().surveyTime, this.babyGroupArr[this.currentIndex].getRawValue().prematrueweek, this.babyGroupArr[this.currentIndex].getRawValue().prematrueday));


    //if (this._checkForm()) {
    //console.log('通过')
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

        this.member = await this._business.updateMember(this.member);
        console.log('this.member', this.member);

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
            console.log('rectify', this.rectify(rawValue.birthday, rawValue.surveyTime, rawValue.prematrueweek, rawValue.prematrueday), rawValue.birthday, rawValue.surveyTime, rawValue.prematrueweek, rawValue.prematrueday);
            babyModel.Rectifyage = this.rectify(rawValue.birthday, rawValue.surveyTime, rawValue.prematrueweek, rawValue.prematrueday);
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
      console.log('doctor',doctor,this.memberGroup.value.phone);
      if (doctor) {
        let phone = this.mphone;
        if (phone) {
          let { Data: existMember } = await this._business.listMember([phone])
          //console.log('existMember',existMember);
          if (existMember.length) {
            this.existMember = existMember[0];
            this._toastrService.error('该问卷人已存在,请重新填写手机号');
            this.Pointer.setShow(0);
            this.float = false;
            // this.showExist = true;
            return;
          }
        }


        let memberModel = new Member();
        memberModel.Id = '';
        memberModel.Did = doctor.Id;
        memberModel.Name = this.memberGroup.value.name ?? '';
        memberModel.Phone = this.mphone ?? "";
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


        this.member = await this._business.addMember(memberModel);


        for (let i = 0; i < this.babyGroupArr.length; i++) {
          let babyGroup = this.babyGroupArr[i];
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
          console.log('rectify', this.rectify(rawValue.birthday, rawValue.surveyTime, rawValue.prematrueweek, rawValue.prematrueday), rawValue.birthday, rawValue.surveyTime, rawValue.prematrueweek, rawValue.prematrueday);
          babyModel.Rectifyage = this.rectify(rawValue.birthday, rawValue.surveyTime, rawValue.prematrueweek, rawValue.prematrueday);
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
        this.memberResId = this.member.Id;



      } else {
        this._toastrService.error('请先选择医生');
        this._router.navigate(["/neoballoon/neoballoon-manage/account"])
      }

    }

    this._sessionStorage.member = this.member;
    console.log('member', this._sessionStorage.member);

    //}

  }

  navigateToSurveyManage(mid: string) {
    this._router.navigate(["/neoballoon/neoballoon-manage/survey-manage", mid], {
      queryParams: {
        currentIndex: this.currentIndex,
      }
    })
  }
  goBack() {
    this._router.navigate(["/neoballoon/neoballoon-manage/baby-add-manage"])
  }
  rectify(birthday: any, surveyTime: any, week: any, day: any) {

    const MAX_WEEK = 40;
    const MAX_DAY = 0;
    const WEEK_UNIT = 7;

    let aweek = 0;
    let aday = 0;
    let month = 0;
    let halfmoth = 0;
    let leftweek = 0;

    if (week != 0) {
      console.log('矫正');
      aweek = MAX_WEEK - week;
      if (day > 0) {
        aweek--;
        aday = WEEK_UNIT - day;
      }
      month = Math.trunc(aweek / 4);
      halfmoth = Math.trunc((aweek % 4) / 2);
      leftweek = (aweek % 4) % 2;
    }

    if (birthday) {
      let birth = birthday.split('-');
      let survey = surveyTime.split('-');

      // 分别计算年月日差值
      let age = survey.map((val: any, index: any) => {
        return Number(val) - Number(birth[index]);
      })
      // 当天数为负数时，月减 1，天数加上月总天数
      if (age[2] < 0) {
        age[1]--
        age[2] += 30
      }
      // 当月数为负数时，年减 1，月数加上 12
      if (age[1] < 0) {
        age[0]--
        age[1] += 12
      }
      let birthMonth = (Number(age[0]) * 12 + Number(age[1]));
      let birthDay = age[2];

      let lmonth = birthMonth - month;
      let lday = birthDay - halfmoth * 15 - leftweek * WEEK_UNIT - aday;
      if (lday < 0) {
        lmonth--;
        lday = lday + 30;
      }

      return lmonth + '月' + lday + '天';

    } else {
      return '';
    }

  }

  /*************private ********************/


  private _updateForm() {


    /* this.memberGroup.patchValue({
      motherBirth: '2021-09-19'
    }) */
    //console.log('this.memberGroup.value.phone2',this.memberGroup.value.phone);
    if (this.member) {
      this.memberGroup.disable();
      this.memberChange = true;
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
          //alert(baby.Birthday);
          info.patchValue({
            id: baby.Id,
            name: baby.Name,
            gender: baby.Gender,
            birthday: this.transformDate(String(baby.Birthday).split(' ')[0]),
            surveyTime: baby.SurveyTime,
            identityType: baby.IdentityType,
            identityInfo: baby.IdentityInfo,
            premature: baby.Premature,
            prematrueweek: baby.Prematrueweek,
            prematrueday: baby.Prematrueday,
            rectifyage: this.rectify(baby.Birthday, baby.SurveyTime, baby.Prematrueweek, baby.Prematrueday),
            weight: baby.Weight,
            bornCondition: {
              isShun: baby.IsShun,
              isChanqian: baby.IsChanqian,
              isMulti: baby.IsMulti,
              abnormal: baby.OtherAbnormal
            },
            isAnswer:baby.Isanswer,
            editBabyBirthday:1,
            editBabysurveyTime:1

          })
          this.babyGroupArr.push(info)
        }
      }

      console.log('this.babyGroupArr',this.babyGroupArr);

    }

    //console.log('this.memberGroup.value.phone3',this.memberGroup.value.phone);


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

      if (control.invalid) {
        if (control.get('name')!.invalid) {
          this._toastrService.warning('宝宝' + convertToChinaNum(i + 1) + ': 请输入宝宝姓名');
          return false;
        }
        if (control.get('gender')!.invalid) {
          this._toastrService.warning('宝宝' + convertToChinaNum(i + 1) + ': 请选择宝宝性别');
          return false;
        }
        if (control.get('birthday')!.invalid) {
          this._toastrService.warning('宝宝' + convertToChinaNum(i + 1) + ': 请选择宝宝出生日期');
          return false;
        }

      }

      let rectifyage = +this.rectify(control.getRawValue().birthday, control.getRawValue().surveyTime, control.getRawValue().prematrueweek, control.getRawValue().prematrueday).split('月')[0];
      if (rectifyage < 1) {
        this._toastrService.warning('宝宝' + convertToChinaNum(i + 1) + ': 该宝宝年龄过小，没有适龄的问卷');
        return false;
      }
      if (rectifyage > 66) {
        this._toastrService.warning('宝宝' + convertToChinaNum(i + 1) + ': 该宝宝年龄过大，没有适龄的问卷');
        return false;
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
  id: string,
  name: string;
  identityInfo: string;
  identityType: IdentityType;
  gender: Gender;
  birthday: string;
  survey: string;
  premature: boolean;
  prematrueweek: string;
  prematrueday: string;
  rectifyage: any;
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