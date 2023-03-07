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
import { ToastrService } from 'ngx-toastr';

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
  asqse2MouthArr: any = [2, 6, 12, 18, 24, 30, 36, 48, 60];
  
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
  source:any = '';

  constructor(private _business: BabyReportBusiness, private _router: Router, private _sessionStorage: SessionStorageService ,private _activeRoute: ActivatedRoute,private _toastrService: ToastrService) { 
    this._activeRoute.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.did = params['did'];
      this.bid = params['bid'];
      this.qid = params['qid'];
      this.mid = params['mid'];
    })
  }

  async ngOnInit() {
    this.source = this._sessionStorage.source;
    this.user = this._sessionStorage.user;
    this.doctor = this._sessionStorage.doctor;
    if(this.bid){
      this.baby = await this._business.getBaby(this.bid);
    }
    if(this.mid){
      this.member = await this._business.getMember(this.mid);
    }

    this._sessionStorage.baby = this.baby;
    this._sessionStorage.member = this.member;
    
    console.log('this.baby',this.baby);
    console.log('this.member',this.member);
    this.QuestType = 'ASQ-3';
    this.getQuestions();

  }

  async getQuestions(){
    let params = new GetQuestionParams();
    params.Bids = [this.bid];
    params.Uid = this.uid;
    //params.QuestType = this.QuestType;
    this.questions = await this._business.getQuestionByBaby(params);
    //console.log('this.questions', this.questions);
    this.swiper.swiperRef.slideTo(this.questions[0] && this.questions[0].QuestMonth);
  }

  checkScreen(num:any,type:any){
    let params:any = {};
    if(this.questions.length <= 0)return false;
    for(var i=0; i<this.questions.length; i++){
      if( this.questions[i].QuestMonth == num && this.questions[i].QuestType == type){
        params.Status = true;
        params.Qid = this.questions[i].Id;
        return params;
      }
    }
    params.status = false;
    return params
  }

  showReport(e:Event,num:any,questMonth:any,type:any){
    let thisQid = (e.target as HTMLInputElement).getAttribute('Qid');
    if(this.source!=1){
      this._toastrService.warning('请至筛查提供处了解详情');
    }else{
      //this._toastrService.success('敬请期待');
      if(type == 'ASQ-3'){
        this._router.navigate(["/neoballoon/neoballoon-manage/asq3-question", this.bid], {
          queryParams: {
            pageType: num,
            questType: type,
            questMonth: questMonth,
            model: 'report',
            Qid: thisQid,
            bid:this.bid
          }
        })
      }else if(type == 'ASQ:SE-2'){
        this._router.navigate(["/neoballoon/neoballoon-manage/asqse2-question", this.bid], {
          queryParams: {
            pageType: num,
            questType: type,
            questMonth: questMonth,
            model: 'report',
            Qid: thisQid,
            bid:this.bid
          }
        })
      }
      
    }
  }

}

