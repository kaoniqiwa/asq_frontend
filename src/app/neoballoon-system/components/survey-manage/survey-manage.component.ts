import { Component, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { BabyModel } from 'src/app/network/model/baby.model';

import Swiper, { A11y, Navigation, Pagination, Scrollbar, SwiperOptions } from 'swiper';
import { SurveyManageBusiness } from './survey-manage.business';


import monthWorkBook from "src/assets/files/asq_month.xlsx";

// console.log(monthWorkBook)

import SurveyBtns from "src/assets/json/survey-manage.json";
import { plainToClass, plainToInstance } from 'class-transformer';
import { SurveyBtnModel } from 'src/app/view-model/survey-manage.model';

console.log(SurveyBtns)
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
  myGender = '0';

  surveyBtns = plainToInstance(SurveyBtnModel, SurveyBtns)

  asq3Month: Array<string> = [];
  asq3SEMonth: Array<string> = [];
  asq3SE2Month: Array<string> = [];

  currentMonth = this.asq3Month;

  babyId = "a26584f8-aa79-48b9-8fee-906025cd983c";
  babys: BabyModel[] = [];

  currentBaby: BabyModel | null = null;
  currentSurveyIndex = 0;

  thisAnswers = [{ "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": false }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }];

  config: SwiperOptions = {
    slidesPerView: 8,
    navigation: {}
  }

  constructor(private _business: SurveyManageBusiness, private _globalStorage: GlobalStorageService) {
    console.log(this.surveyBtns)
    // monthWorkBook.forEach((sheet: ASQMonthFilter) => {
    //   console.log(sheet)
    //   sheet.data.shift();
    //   if (sheet.name == 'asq3') {
    //     this.asq3Month = sheet.data;
    //   }
    //   if (sheet.name == 'asqse') {
    //     this.asq3SEMonth = sheet.data;
    //   }
    //   if (sheet.name == 'asqse2') {
    //     this.asq3SE2Month = sheet.data;
    //   }
    // })
    // console.log(this.asq3Month)
  }

  async ngOnInit() {

    // console.log(this.currentMonth);
    // this.babys = await this._business.listBaby();
    // if (this.babys.length)
    //   this.currentBaby = this.babys[0]
  }

  changeGender(val: any) {
    console.log(val)
  }

}


interface ASQMonthFilter {
  name: string;
  data: [string, string, string, string]
}