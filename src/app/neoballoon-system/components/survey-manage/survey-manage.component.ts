import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Baby } from 'src/app/network/model/baby.model';

import Swiper, { A11y, Navigation, Pagination, Scrollbar, SwiperOptions } from 'swiper';
import { SurveyManageBusiness } from './survey-manage.business';
import { GetQuestionParams } from "src/app/network/request/question/question.params";

import SurveyBtns from "src/assets/json/survey-manage.json";

import { plainToClass, plainToInstance } from 'class-transformer';
import { SurveyBtnModel } from 'src/app/view-model/survey-manage.model';
import { Question } from 'src/app/network/model/question.model';
import { QuestType } from 'src/app/enum/quest-type.enum';
import { DateDifference } from 'src/app/common/tools/tool';
import { formatDate } from '@angular/common';
import { Time, TimerDiff } from 'src/app/common/tools/time';
import { SwiperComponent } from 'swiper/angular';
import { GlobalToastrConfig, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageType } from 'src/app/enum/page-type.enum';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';

Swiper.use([
  Navigation, Pagination, Scrollbar
])


@Component({
  selector: 'survey-manage',
  templateUrl: './survey-manage.component.html',
  styleUrls: ['./survey-manage.component.less'],
  providers: [
    SurveyManageBusiness
  ]
})
export class SurveyManageComponent implements OnInit, OnDestroy {

  monthWorkBook: any;
  mid: string = "";

  // 保存年龄段表单信息
  sheetMap = new Map<string, Array<string>>();

  // 根据表单信息，提取出开始、结束天数
  monthMap = new Map<string, Array<Duration>>();

  // 保存问卷类型按钮信息
  surveyBtns = plainToInstance(SurveyBtnModel, SurveyBtns)

  // 当前问卷类型
  currentType = QuestType.ASQ3;

  // 当前swiper内容
  currentSwiperMonth: Array<string> | null = null;

  // 计算后得到的年龄段
  timerDiff: TimerDiff | null = null;

  // 当前问卷，哪个年龄段
  currentMonthIndex = -1;

  monthed:any = [];

  questions:any = [];
  babys: Baby[] = [];

  currentBaby: any = null;

  config: SwiperOptions = {
    slidesPerView: window.innerWidth<860?3:8,
    navigation: {}
  }

  @ViewChild(SwiperComponent) swiper!: SwiperComponent;

  constructor(private _business: SurveyManageBusiness, private _localStorage: LocalStorageService, private _globalStorage: GlobalStorageService, private _sessionStorage: SessionStorageService, private _router: Router, private _activeRoute: ActivatedRoute, private _toastrService: ToastrService) {


    

    this._activeRoute.params.subscribe((params: Params) => {
      this.mid = params['mid'];
    })


    this.monthWorkBook = this._sessionStorage.monthWorkBook;
    // console.log(this.sheetMap);

    this.monthWorkBook.forEach((sheet: ASQMonthFilter) => {
      this.sheetMap.set(sheet.name, sheet.data)
    })


    // 提取数值
    for (let [key, value] of this.sheetMap.entries()) {
      // console.log(key, value)
      let duration: Array<Duration> = [];
      this.monthMap.set(key, duration)
      for (let i = 0; i < value.length; i++) {
        let startRes = value[i][1].match(/\d+/g);
        let endRes = value[i][2].match(/\d+/g);
        if (startRes && endRes) {
          let start = {
            month: +startRes[0],
            day: startRes[1] ? +startRes[1] : 0
          }
          let end = {
            month: +endRes[0],
            day: endRes[1] ? + endRes[1] : 30
          }
          duration.push({
            start,
            end
          })
        }
      }
    }
    console.log(this.monthMap)


    //  currentType可以任意指定，不需硬绑定数组下标
    let currentBtn = this.surveyBtns.find(model => {
      return model.questType == this.currentType
    })
    if (currentBtn) {
      this.currentSwiperMonth = this.sheetMap.get(currentBtn.questType) ?? null;
    }




  }

  async ngOnInit() {

    let { Data: babys } = await this._business.listBaby(this.mid);
    this.babys = babys;
    // console.log('babys', this.babys)

    if (this.babys.length) {
      // this.currentBaby = this.babys[0];
      this.changeBaby(this.babys[0]);

    }

    this.getQuestions()

  }

  async getQuestions(){
    console.log('ngOnInit', this.currentBaby.Id);
    let params = new GetQuestionParams();
    params.Bids = [this.currentBaby.Id];
    this.questions = await this._business.getQuestionByBaby(params);
    console.log('this.questions', this.questions);
  }

  checkScreen(num:any){
    if(this.questions.length <= 0)return false;
    for(var i=0; i<this.questions.length; i++){
      if( this.questions[i].QuestMonth == num && this.questions[i].QuestType == this.currentType){
        //console.log(i);
        return true;
      }
    }
    return false
  }

  clickSurveyBtn(model: SurveyBtnModel) {
    this.currentType = model.questType;
    this.currentSwiperMonth = this.sheetMap.get(model.questType) ?? null;

    this.checkRange();

    // if (this.currentMonthIndex != -1) {
    //   this.swiper.swiperRef.slideTo(this.currentMonthIndex)
    // }
  }
  changeBaby(baby: Baby) {
    console.log('baby',baby);
    this.currentBaby = baby;
    this.checkRange();
    this._sessionStorage.baby = baby;
    this.getQuestions();
  }
  checkRange() {
    if (this.currentBaby) {
      let months = this.monthMap.get(this.currentType);
      //console.log('months',months);
      let currentage = this.currentBaby.Rectifyage;
      let currentmonth = Number(currentage.split('月')[0]);

      if (!months) return;
      this.currentMonthIndex = -1;
      for (let i = 0; i < months.length; i++) {
        let startmonth =  months[i].start.month;
        let endmonth =  months[i].end.month;
        if(currentmonth>=startmonth && currentmonth<=endmonth){
          this.currentMonthIndex = i;
          break;
        }

      }

    }
    this.swiper.swiperRef.slideTo(this.currentMonthIndex);
    console.log('this.currentMonthIndex',this.currentMonthIndex)
  }

  gotoEntry(e: Event) {
    e.stopPropagation();
    if (this.currentBaby) {
      this._router.navigate(["/neoballoon/neoballoon-manage/asq-entry", this.currentBaby.Id], {
        queryParams: {
          pageType: PageType.dati,
          questType: this.currentType,
          questMonth: this.currentMonthIndex,
          bid:this.currentBaby.Id
        }
      })
    }
  }
  ngOnDestroy() {
    console.log('destroy');
  }
  goBack() {
    this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"])
  }

}


interface ASQMonthFilter {
  name: string;
  data: [string, string, string, string]
}
// 2022-7-1
// 2022-9-27
export interface Duration {
  start: {
    month: number,
    day: number
  },
  end: {
    month: number,
    day: number
  }
}