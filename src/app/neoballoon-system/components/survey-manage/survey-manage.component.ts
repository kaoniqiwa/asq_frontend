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

  // 保存月份表单信息
  sheetMap = new Map<string, Array<string>>();
  surveyBtns = plainToInstance(SurveyBtnModel, SurveyBtns)

  currentIndex = 0;
  currentMonth: Array<string> | null = null;


  babyId = "a26584f8-aa79-48b9-8fee-906025cd983c";
  babys: BabyModel[] = [];

  currentBaby: BabyModel | null = null;

  // get currentSheet() {
  //   return this.sheetMap.get(this.currentIndex)
  // }


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
    console.log(this.surveyBtns);

    let currentBtn = this.surveyBtns.find(model => {
      return model.index == this.currentIndex
    })
    if (currentBtn) {
      this.currentMonth = this.sheetMap.get(currentBtn.key) ?? null;
    }
  }

  async ngOnInit() {

    this.babys = await this._business.listBaby();
    if (this.babys.length)
      this.currentBaby = this.babys[0]
  }

  clickSurveyBtn(model: SurveyBtnModel) {
    this.currentIndex = model.index;
    this.currentMonth = this.sheetMap.get(model.key) ?? null;
    // console.log(this.currentMonth)

  }
  submit() {
    let model = new QuestionModel();
    model.id = "";
    model.bid = "a26584f8-aa79-48b9-8fee-906025cd983c";
    model.questType = QuestType.Asq3;
    model.questMonth = "0";
    model.questResult = [{ "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": false }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }];

    this._business.create(model)
  }

}


interface ASQMonthFilter {
  name: string;
  data: [string, string, string, string]
}