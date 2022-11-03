import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { BabyReportBusiness } from './baby-report.business';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/network/model/page-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestType } from 'src/app/enum/quest-type.enum';
import { BabyLibModel, BabyLibSearchInfo, QuestionLibModel, QuestionLibSearchInfo } from 'src/app/view-model/baby-lib.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import Swiper, { A11y, Navigation, Pagination, Scrollbar, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { GetQuestionParams } from 'src/app/network/request/question/question.params';

Swiper.use([
  Navigation, Pagination, Scrollbar
])

@Component({
  selector: 'app-baby-report',
  templateUrl: './baby-report.component.html',
  styleUrls: ['./baby-report.component.less'],
  providers: [BabyReportBusiness]
})
export class BabyReportComponent implements OnInit {

  //currentSwiperMonth: Array<string> | null = null;
  asq3MouthArr: any = [2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54,60];
  
  config: SwiperOptions = {
    slidesPerView: window.innerWidth<860?3:6,
    navigation: {}
  }

  @ViewChild(SwiperComponent) swiper!: SwiperComponent;

  user:any = {};
  doctor:any = {};
  baby:any = {};
  member:any = {};

  uid:any = '';
  did:any = '';
  bid:any = '';
  qid:any = '';
  mid:any = '';
  QuestType:any = '';

  questions:any = [];
  newMonth:any = 0;

  constructor(private _business: BabyReportBusiness, private _router: Router, private _sessionStorage: SessionStorageService ,private _activeRoute: ActivatedRoute) { 
    this._activeRoute.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.did = params['did'];
      this.bid = params['bid'];
      this.qid = params['qid'];
      this.mid = params['mid'];
    })
  }

  async ngOnInit() {
    
    this.user = this._sessionStorage.user;
    this.doctor = this._sessionStorage.doctor;
    if(this.bid){
      this.baby = await this._business.getBaby(this.bid);
    }
    if(this.mid){
      this.member = await this._business.getMember(this.mid);
    }

    console.log('this.baby',this.baby);
    console.log('this.member',this.member);
    this.QuestType = 'asq3';
    this.getQuestions();

  }

  async getQuestions(){
    let params = new GetQuestionParams();
    params.Bids = [this.bid];
    params.Uid = this.uid;
    params.QuestType = this.QuestType;
    this.questions = await this._business.getQuestionByBaby(params);
    console.log('this.questions', this.questions);
    this.swiper.swiperRef.slideTo(this.questions[0] && this.questions[0].QuestMonth);
  }

  checkScreen(num:any){
    if(this.questions.length <= 0)return false;
    for(var i=0; i<this.questions.length; i++){
      if( this.questions[i].QuestMonth == num && this.questions[i].QuestType == this.QuestType){
        return true;
      }
    }
    return false
  }

}

