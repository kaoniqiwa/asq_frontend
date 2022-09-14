import { Component, OnInit } from '@angular/core';

import Swiper, { A11y, Navigation, Pagination, Scrollbar, SwiperOptions } from 'swiper';


Swiper.use([
  Navigation, Pagination, Scrollbar, A11y
])


@Component({
  selector: 'survey-manage',
  templateUrl: './survey-manage.component.html',
  styleUrls: ['./survey-manage.component.less']
})
export class SurveyManageComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 8,
    navigation: {}
  }

  constructor() { }

  ngOnInit(): void {
  }

}
