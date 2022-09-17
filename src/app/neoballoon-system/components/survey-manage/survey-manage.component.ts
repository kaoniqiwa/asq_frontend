import { Component, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { BabyModel } from 'src/app/network/model/baby.model';

import Swiper, { A11y, Navigation, Pagination, Scrollbar, SwiperOptions } from 'swiper';
import { SurveyManageBusiness } from './survey-manage.business';


import asq_age from "src/assets/files/asq_month.xlsx";

console.log(asq_age)

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
  babyId = "a26584f8-aa79-48b9-8fee-906025cd983c";
  babys: BabyModel[] = [];

  currentBaby: BabyModel | null = null;
  currentSurveyIndex = 0;

  config: SwiperOptions = {
    slidesPerView: 8,
    navigation: {}
  }

  constructor(private _business: SurveyManageBusiness, private _globalStorage: GlobalStorageService) { }

  async ngOnInit() {
    console.log(this._globalStorage.babys)

    this.babys = await this._business.listBaby();
    console.log(this.babys);
    if (this.babys.length)
      this.currentBaby = this.babys[0]
  }

}
