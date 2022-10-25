import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { Asq3PrintBusiness } from './asq3print.business';

//import { EnterPriseLoginModel, LoginModel } from 'src/app/view-model/login.model';
@Component({
  selector: 'asq3print',
  templateUrl: './asq3print.component.html',
  styleUrls: ['./asq3print.component.less'],
  providers: [
    Asq3PrintBusiness
  ]
})
export class Asq3printComponent implements OnInit {
  complete = false;
  mouthArr: any = [2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54.60];
  type:any = 1;
  questMonth:any = 0;
  monthWorkBook: any = [];
  diArr:any = [];
  jieArr:any = [];
  gaoArr:any = [];
  scoreArr:any = [];
  gamesArr:any = [];
  uid:any = '';
  did:any = '';
  bid:any = '';
  qid:any = '';
  user: any = null;
  doctor: any = null;
  baby: any = null;
  question: any = null;
  zongHe:any = {};
  math = Math;
  constructor(private _title: Title, private _fb: FormBuilder, private _activeRoute: ActivatedRoute, private _business: Asq3PrintBusiness, private _sessionStorage: SessionStorageService,) {
    this.monthWorkBook = this._sessionStorage.monthWorkBook;
    
    this._activeRoute.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.did = params['did'];
      this.bid = params['bid'];
      this.qid = params['qid'];
      this.type = params['type'];
    })
  }

  async ngOnInit() {

    this.user = await this._business.getUser(this.uid);
    this.doctor = await this._business.getDoctor(this.did);
    this.baby = await this._business.getBaby(this.bid);
    this.question = await this._business.getQuestion(this.qid);
    this.gamesArr = await this._business.getGames(this.question.QuestMonth);

    let that = this;
    this.complete = true;
    this.scoreArr = JSON.parse(this.question.QuestScore);
    this.questMonth = this.question.QuestMonth;
    this.zongHe = JSON.parse(this.question.ZongHe);
    console.log('scoreArr',this.scoreArr);
    console.log('zongHe',this.zongHe);
    this.scoreArr.map(function (item: any, index: any) {
      if (item.jiezhi == '低于界值') {
        that.diArr.push(item);
      } else if (item.jiezhi == '接近界值') {
        that.jieArr.push(item);
      } else {
        that.gaoArr.push(item);
      }
    })

    console.log('asq3print',this.user,this.doctor,this.baby,this.question,this.gaoArr.length,this.scoreArr.length);
    //window.print();
  }

  setDate(str: string) {
    var reg = /(\d{4})\-(\d{2})\-(\d{2})/;
    var date = str.replace(reg, "$1年$2月$3日");
    return date;
  }

  setThisScore(num: any) {
    if (Number(num) == 1) {
      return 10;
    } else if (Number(num) == 2) {
      return 5;
    } else {
      return 0;
    }
  }

  counter(i: number) {
    return new Array(i);
  }

}
