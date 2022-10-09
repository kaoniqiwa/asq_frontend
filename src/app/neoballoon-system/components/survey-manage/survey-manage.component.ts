import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Baby } from 'src/app/network/model/baby.model';

import Swiper, { A11y, Navigation, Pagination, Scrollbar, SwiperOptions } from 'swiper';
import { SurveyManageBusiness } from './survey-manage.business';


import monthWorkBook from "src/assets/files/asq_month.xlsx";



monthWorkBook.forEach((sheet: ASQMonthFilter) => {
  // 去掉标题
  sheet.data.shift();

  // 去掉列名
  sheet.data.shift();

})

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
export class SurveyManageComponent implements OnInit, OnDestroy {

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


  babys: Baby[] = [];

  currentBaby: Baby | null = null;

  config: SwiperOptions = {
    slidesPerView: 8,
    navigation: {}
  }

  @ViewChild(SwiperComponent) swiper!: SwiperComponent;

  constructor(private _business: SurveyManageBusiness, private _localStorage: LocalStorageService, private _globalStorage: GlobalStorageService, private _router: Router, private _activeRoute: ActivatedRoute, private _toastrService: ToastrService) {

    this._activeRoute.params.subscribe((params: Params) => {
      this.mid = params['mid'];
    })

    monthWorkBook.forEach((sheet: ASQMonthFilter) => {
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
      this.currentBaby = this.babys[0];

    }

    this.checkRange();


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
    this.currentBaby = baby;
    this.checkRange()
  }
  checkRange() {
    if (this.currentBaby) {
      let start = new Date(this.currentBaby.Birthday);
      let end = new Date(this.currentBaby.SurveyTime);
      this.timerDiff = Time.diff(start, end);

      let months = this.monthMap.get(this.currentType);
      // console.log(months)
      if (!months) return;
      this.currentMonthIndex = -1;
      for (let i = 0; i < months.length; i++) {
        let start = months[i].start;
        let end = months[i].end;

        let startDays = start.month * 30 + start.day;
        let endDays = end.month * 30 + end.day

        let curDays = this.timerDiff.month * 30 + this.timerDiff.day;

        if (curDays >= startDays && curDays <= endDays) {
          this.currentMonthIndex = i;
        }
        if (i == 0) {
          if (curDays < startDays) {
            this._toastrService.warning("该宝宝年龄过小还没有适用的问卷！");
          }
        }

      }

    }
    console.log(this.currentMonthIndex)
  }

  gotoQuest(e: Event) {
    e.stopPropagation();
    if (this.currentBaby) {
      this._router.navigate(["/neoballoon/neoballoon-manage/asq3-question", this.currentBaby.Id], {
        queryParams: {
          pageType: PageType.dati,
          questType: this.currentType,
          questMonth: this.currentMonthIndex
        }
      })
    }

  }
  ngOnDestroy(): void {
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