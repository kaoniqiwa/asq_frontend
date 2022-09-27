import { Component, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { BabyModel } from 'src/app/network/model/baby.model';

import Swiper, { A11y, Navigation, Pagination, Scrollbar, SwiperOptions } from 'swiper';
import { SurveyManageBusiness } from './survey-manage.business';


import monthWorkBook from "src/assets/files/asq_month.xlsx";

console.log(monthWorkBook)

import SurveyBtns from "src/assets/json/survey-manage.json";
import { plainToClass, plainToInstance } from 'class-transformer';
import { SurveyBtnModel } from 'src/app/view-model/survey-manage.model';
import { QuestionModel } from 'src/app/view-model/question.model';
import { QuestType } from 'src/app/enum/quest-type.enum';
import { DateDifference } from 'src/app/common/tools/tool';
import { formatDate } from '@angular/common';
import { Time, TimerDiff } from 'src/app/common/tools/time';

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

  // 保存问卷类型按钮信息
  surveyBtns = plainToInstance(SurveyBtnModel, SurveyBtns)

  // 当前问卷类型
  currentType = QuestType.ASQ3;

  // 当前问卷年龄段
  currentMonth: Array<string> | null = null;

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

  constructor(private _business: SurveyManageBusiness) {

    monthWorkBook.forEach((sheet: ASQMonthFilter) => {
      // 去掉标题
      sheet.data.shift();

      // 去掉列名
      sheet.data.shift();

      this.sheetMap.set(sheet.name, sheet.data)
    })
    // console.log(this.sheetMap);

    //  currentType可以任意指定，不需硬绑定数组下标
    let currentBtn = this.surveyBtns.find(model => {
      return model.questType == this.currentType
    })
    if (currentBtn) {
      this.currentMonth = this.sheetMap.get(currentBtn.key) ?? null;
    }



  }

  async ngOnInit() {

    this.babys = await this._business.listBaby();
    if (this.babys.length)
      this.currentBaby = this.babys[0]

    let end = new Date();
    let start = new Date('2022-07-01 00:00:00');
    // this.diff(start, today);
    this.timerDiff = Time.diff(start, end);
    console.log(this.timerDiff)
  }

  clickSurveyBtn(model: SurveyBtnModel) {
    this.currentType = model.questType;
    this.currentMonth = this.sheetMap.get(model.key) ?? null;
    // console.log(this.currentMonth)

  }
  submit() {
    let model = new QuestionModel();
    model.id = "";
    model.bid = "a26584f8-aa79-48b9-8fee-906025cd983c";
    model.questType = QuestType.ASQ3;
    model.questMonth = "0";
    model.questResult = [{ "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": false }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }];

    this._business.create(model)
  }


}


interface ASQMonthFilter {
  name: string;
  data: [string, string, string, string]
}
// 2022-7-1
// 2022-9-27