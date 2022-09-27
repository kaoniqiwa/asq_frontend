import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { BabyModel } from 'src/app/network/model/baby.model';

import Swiper, { A11y, Navigation, Pagination, Scrollbar, SwiperOptions } from 'swiper';
import { SurveyManageBusiness } from './survey-manage.business';


import monthWorkBook from "src/assets/files/asq_month.xlsx";

// console.log(monthWorkBook)

import SurveyBtns from "src/assets/json/survey-manage.json";

import { plainToClass, plainToInstance } from 'class-transformer';
import { SurveyBtnModel } from 'src/app/view-model/survey-manage.model';
import { QuestionModel } from 'src/app/network/model/question.model';
import { QuestType } from 'src/app/enum/quest-type.enum';
import { DateDifference } from 'src/app/common/tools/tool';
import { formatDate } from '@angular/common';
import { Time, TimerDiff } from 'src/app/common/tools/time';
import { SwiperComponent } from 'swiper/angular';
import { GlobalToastrConfig } from 'ngx-toastr';
import { Router } from '@angular/router';

Swiper.use([
  Navigation, Pagination, Scrollbar, A11y
])


@Component({
  selector: 'survey-manage',
  templateUrl: './survey-manage.component.html',
  styleUrls: ['./survey-manage.component.less'],
  providers: [
    SurveyManageBusiness
  ]
})
export class SurveyManageComponent implements OnInit {

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


  babyId = "a26584f8-aa79-48b9-8fee-906025cd983c";
  babys: BabyModel[] = [];

  currentBaby: BabyModel | null = null;

  config: SwiperOptions = {
    slidesPerView: 8,
    navigation: {}
  }

  @ViewChild(SwiperComponent) swiper!: SwiperComponent;

  constructor(private _business: SurveyManageBusiness, private _globalStorage: GlobalStorageService, private _router: Router) {
    console.log(this._globalStorage.user)

    monthWorkBook.forEach((sheet: ASQMonthFilter) => {
      // 去掉标题
      sheet.data.shift();

      // 去掉列名
      sheet.data.shift();

      this.sheetMap.set(sheet.name, sheet.data)

    })

    // console.log(this.sheetMap);

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
            day: +startRes[1]
          }
          let end = {
            month: +endRes[0],
            day: +endRes[1]
          }
          duration.push({
            start,
            end
          })
        }
      }
    }
    // console.log(this.monthMap)


    //  currentType可以任意指定，不需硬绑定数组下标
    let currentBtn = this.surveyBtns.find(model => {
      return model.questType == this.currentType
    })
    if (currentBtn) {
      this.currentSwiperMonth = this.sheetMap.get(currentBtn.questType) ?? null;
    }

  }

  async ngOnInit() {

    // console.log(this._globalStorage.babys);
    this.babys = await this._business.listBaby();
    if (this.babys.length)
      this.currentBaby = this.babys[0]

    let end = new Date();
    let start = new Date('2022-07-01 00:00:00');
    // this.diff(start, today);
    this.timerDiff = Time.diff(start, end);
    console.log(this.timerDiff)
    // 1月10天 2月20天

    this.checkRange();
  }

  clickSurveyBtn(model: SurveyBtnModel) {
    this.currentType = model.questType;
    this.currentSwiperMonth = this.sheetMap.get(model.questType) ?? null;
    // console.log(this.currentMonth)

    // console.log(this.swiper.swiperRef.slideTo(0))

    // this.swiper.slideTo(0)

    this.checkRange();

    if (this.currentMonthIndex != -1) {
      this.swiper.swiperRef.slideTo(this.currentMonthIndex)
    }
  }
  checkRange() {
    if (this.timerDiff) {
      let months = this.monthMap.get(this.currentType);
      console.log(months)
      if (!months) return;
      this.currentMonthIndex = -1;
      for (let i = 0; i < months.length; i++) {
        let start = months[i].start;
        let end = months[i].end;

        let startDays = start.month * 30 + end.day;
        let endDays = end.month * 30 + end.day

        let curDays = this.timerDiff.month * 30 + this.timerDiff.day;

        if (curDays >= startDays && curDays <= endDays) {
          this.currentMonthIndex = i;
        }
      }
    }
    console.log(this.currentMonthIndex)
  }
  submit() {
    this._router.navigate(["/neoballoon/neoballoon-manage/asq3-question"])
  }

  gotoQuest() {

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