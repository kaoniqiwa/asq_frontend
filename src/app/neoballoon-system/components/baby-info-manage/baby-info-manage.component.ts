import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormState } from 'src/app/enum/form-state.enum';

@Component({
  selector: 'baby-info-manage',
  templateUrl: './baby-info-manage.component.html',
  styleUrls: ['./baby-info-manage.component.less']
})
export class BabyInfoManageComponent implements OnInit {

  dateFormat: string = 'yyyy-MM-dd';
  today = new Date();

  infoArr: Array<FormGroup> = [];

  currentIndex = 0;
  maxLength = 7;

  state = FormState.add;

  constructor(private _fb: FormBuilder, private _router: Router, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this._init();
  }
  private _init() {
    this.addInfo();

  }
  addInfo() {
    if (this.infoArr.length < this.maxLength) {
      this.infoArr.push(this.newInfo());
      console.log(this.infoArr)

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
        babyName: ['hello'],
        babyIdentify: ['1212'],
        babyIdentityType: ['0'],
        babyGender: ['0'],
        babyBirthday: [''],
        babySurvey: [this.today],
        babyEarly: ['1'],
        babyWeight: ['200'],
        babyCondition: this._fb.group({
          isShun: '0',
          isHelp: '',
          isMulti: '',
          yichang: 'rrr'
        }),
      }),
      family: this._fb.group({
        guardName: ['rrrr'],
        guardIdentidy: ['0'],
        guardCountry: [''],
        guardPhone: ['18221662082'],
        guardAddress: ['上海市'],
        guardEmail: ['1061886912@qq.com'],
        guardPostCode: ['212300'],
        guardHelp: ['1'],
        motherJob: ['教师'],
        fatherJob: ['厨师'],
        motherDegree: [''],
        fatherDegree: [''],
        otherDegree: [''],
        motherBirth: [''],
        fatherBirth: [''],
        moreDetail: [false]
      })
    })
  }
  onSubmit() {
    // this.navigateToSurveyManage();

  }
  navigateToSurveyManage() {
    this._router.navigate(["/neoballoon/neoballoon-manage/survey-manage"])
  }

}
