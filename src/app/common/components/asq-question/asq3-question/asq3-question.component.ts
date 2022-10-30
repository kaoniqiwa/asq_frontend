import { NumberSymbol } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { PageType } from 'src/app/enum/page-type.enum';
import { QuestType } from 'src/app/enum/quest-type.enum';
import { Question } from 'src/app/network/model/question.model';
import { GetDividingParams } from 'src/app/network/request/games/dividing.params';
import { GetGamesParams } from 'src/app/network/request/games/games.params';
import { GetQuestionParams } from 'src/app/network/request/question/question.params';
import { ASQ3QuestionBusiness } from './asq3-question.business';
import printJS from 'print-js'

import questions from "./data.json";

// console.log('12', questions)
//import asq3 from '../../../../../assets/files/ASQGAME.xlsx';
//console.log('asq3',JSON.stringify(asq3));
@Component({
  selector: 'asq3-question',
  templateUrl: './asq3-question.component.html',
  styleUrls: ['./asq3-question.component.less'],
  providers: [
    ASQ3QuestionBusiness
  ]
})
export class Asq3QuestionComponent implements OnInit {

  //@Input() mounthNum: NumberSymbol = 0;
  //@Input() thisAnswers: any = [];
  math = Math;
  thisAnswers: any = [];
  /* thisAnswers:any = [
    {
        "answer": [
            "3",
            "3",
            "3",
            "3",
            "3",
            "3"
        ],
        "nextStatus": true,
        "prevStatus": false
    },
    {
        "answer": [
            "3",
            "3",
            "3",
            "3",
            "3",
            "3"
        ],
        "nextStatus": true,
        "prevStatus": true
    },
    {
        "answer": [
            "3",
            "3",
            "3",
            "3",
            "3",
            "3"
        ],
        "nextStatus": true,
        "prevStatus": true
    },
    {
        "answer": [
            "3",
            "3",
            "3",
            "3",
            "3",
            "3"
        ],
        "nextStatus": true,
        "prevStatus": true
    },
    {
        "answer": [
            "3",
            "3",
            "3",
            "3",
            "3",
            "3"
        ],
        "nextStatus": true,
        "prevStatus": true
    },
    {
        "answer": [
            "3",
            "3",
            "3",
            "3",
            "3",
            "3",
            "3",
            "3"
        ],
        "nextStatus": true,
        "prevStatus": true
    }
]; */
  zonghe:any = {};
  babyQuestions: any = questions;
  currentQuestionsObject: any = { name: '', data: [[], [], []] };
  title: any = '';
  currentQuestions: any = null;
  intQuestions: any = null;
  currentPage: any = 0;
  allPages: any = 0;
  currentAnswers: any = [];
  currentAnswer: any = {};
  scoreArr: any = [];
  mouthArr: any = [2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54.60];
  gamesArr: any = [];
  dividingArr: any = [];
  /* scoreArr:any = [
    {
        "score": 40,
        "nengqu": "沟通",
        "jiezhi": "高于界值"
    },
    {
        "score": 30,
        "nengqu": "粗大动作",
        "jiezhi": "接近界值"
    },
    {
        "score": 10,
        "nengqu": "精细动作",
        "jiezhi": "接近界值"
    },
    {
        "score": 0,
        "nengqu": "解决问题",
        "jiezhi": "高于界值"
    },
    {
        "score": 30,
        "nengqu": "个人-社会",
        "jiezhi": "低于界值"
    }
  ]; */

  pageType: PageType = PageType.dati;
  questType: QuestType = QuestType.ASQ3;
  questMonth: number = 0;
  bid: string = "";

  nengQu = ['沟通', '粗大动作', '精细动作', '解决问题', '个人-社会'];
  gaoArr: any = [];
  jieArr: any = [];
  diArr: any = [];
  monthWorkBook: any = [];
  doctor: any = null;
  user: any = null;
  member:any = null;
  baby: any = null;
  age: any = null;
  question:any = null;


  constructor(private _business: ASQ3QuestionBusiness, private toastrService: ToastrService, private _sessionStorage: SessionStorageService, private _localStorage: LocalStorageService, private _activeRoute: ActivatedRoute, private _globalStorage: GlobalStorageService,) {
    this.monthWorkBook = this._sessionStorage.monthWorkBook;
    this.doctor = this._sessionStorage.doctor;
    this.user = this._sessionStorage.user;
    this.member = this._sessionStorage.member;
    this.baby = this._sessionStorage.baby;
    //this.age = this.birthToAge(this.baby.Birthday.split(' ')[0], this.baby.CreateTime.split(' ')[0]);

    this._activeRoute.queryParams.subscribe(params => {
      this.pageType = params['pageType'];
      this.questType = params['questType'];
      this.questMonth = params['questMonth'];
      this.bid = params['bid'];
    })
    console.log('constructor', this.user, this.doctor, this.member, this.baby, this.questMonth);
  }

  async ngOnInit() {

    this.currentQuestionsObject = this.babyQuestions[this.questMonth];
    this.title = this.currentQuestionsObject.name;
    this.currentQuestions = this.currentQuestionsObject.data;
    console.log('currentQuestions:', this.currentQuestions);
    this.intQuestions = this.setQuestions(this.currentQuestions);
    //console.log('intQuestions1:', this.intQuestions);
    this.allPages = this.intQuestions.length;

    this.getGames(this.questMonth);
    this.getDividing(this.questMonth);



  }

  init() {
    if (this.thisAnswers.length > 0) {
      this.currentAnswers = this.thisAnswers;
      this.currentAnswer = this.currentAnswers[0];

      console.log('this.currentAnswer:', this.currentAnswer);

      //答案和题目合并
      for (let i = 0; i < this.intQuestions.length; i++) {
        this.intQuestions[i].answer = this.currentAnswers[i].answer;
        this.intQuestions[i].result = this.currentAnswers[i].result;
      }
      this.setCurrentAnswers();
      //console.log('intQuestions:', this.intQuestions);

    } else {
      for (let i = 0; i < this.intQuestions.length; i++) {
        this.currentAnswers[i] = { 'answer': [], nextStatus: false, prevStatus: true ,'result': []};
        //console.log('this.currentAnswer_old:', i, this.currentAnswers[i]);
        if (i == 0) {
          this.currentAnswers[i].prevStatus = false;
          this.intQuestions[i].answer = this.currentAnswers[i].answer;
        }
        //console.log('this.currentAnswer_new:', i, this.currentAnswers[i]);
      }
      this.currentAnswer = this.currentAnswers[0];
    }

    //console.log("getparams", this.bid, this.pageType, this.questType, this.questMonth);
    if (this.pageType != 0) {
      let that = this;
      this.scoreArr.map(function (item: any, index: any) {
        if (item.jiezhi == '低于界值') {
          that.diArr.push(item);
        } else if (item.jiezhi == '接近界值') {
          that.jieArr.push(item);
        } else {
          that.gaoArr.push(item);
        }
      })
      //console.log('gaojiediarr', this.gaoArr, this.jieArr, this.diArr);
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  checkDetil() {
    this.pageType = 3;
  }

  next() {
    this.pageType = 4;
  }

  setQuestions(arr: any) {//重组数据
    let questions: any = [];
    let question: any = [];

    arr.forEach(function (obj: any, index: any) {
      if (index != 0 && obj.length != 0) {
        question.push(obj);
        if ((arr[index + 1] && arr[index + 1].length == 0) || (index + 1) == arr.length) {
          let queAndAns: any = {};
          queAndAns.question = question;
          questions.push(queAndAns);
          question = [];
        }

      }
    })
    //console.log('questions', questions)
    return questions;

  }

  setDate(str: string) {
    var reg = /(\d{4})\-(\d{2})\-(\d{2})/;
    var date = str.replace(reg, "$1年$2月$3日");
    return date;
  }

  radioClick(e: Event) {

    let l = Number((e.target as HTMLInputElement).getAttribute('l')) - 1;
    let xu = Number((e.target as HTMLInputElement).getAttribute('xu'));
    let v = (e.target as HTMLInputElement).value;
    //console.log(xu,v,this.currentAnswer.answer.length,this.currentAnswer.answer,'---before');

    this.currentAnswer.answer[xu] = v;

    if (Object.keys(this.currentAnswer.answer).length == l) {
      this.currentAnswer.nextStatus = true;
      this.currentAnswers[this.currentPage] = this.currentAnswer;
      //console.log('currentAnswers:', this.currentAnswers);
    }
    this.intQuestions[this.currentPage].answer = this.currentAnswer.answer;
    //console.log('intQuestions:', this.intQuestions,this.currentAnswers);

    //console.log((e.target as HTMLInputElement).value,(e.target as HTMLInputElement).getAttribute('l'));
  }

  nextQuestions(e: Event) {
    this.currentPage++;
    this.currentAnswer = this.currentAnswers[this.currentPage];
  }

  prevQuestions(e: Event) {
    this.currentPage--;
    this.currentAnswer = this.currentAnswers[this.currentPage];
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

  getScore(arr: any, indexFa: any ,rearr: any,ns: any,ps: any,) {//界值状态转化
    let thisScore = 0;
    let thisScoreObj: any = {};
    let that = this;
    arr.map(function (item: any, index: any) {
      if (Number(item) == 1) {
        thisScore += that.setThisScore(1);
      } else if (Number(item) == 2) {
        thisScore += that.setThisScore(2);
      }
    })
    thisScoreObj.nextStatus = ns;
    thisScoreObj.prevStatus = ps;
    thisScoreObj.result = rearr;
    thisScoreObj.answer = arr;
    thisScoreObj.score = thisScore;
    thisScoreObj.nengqu = this.nengQu[indexFa];
    if (thisScore <= this.dividingArr[indexFa].min) {
      thisScoreObj.jiezhi = "低于界值";
      this.diArr.push(thisScoreObj);
    } else if (thisScore > this.dividingArr[indexFa].min && thisScore <= this.dividingArr[indexFa].max) {
      thisScoreObj.jiezhi = "接近界值";
      this.jieArr.push(thisScoreObj);
    } else {
      thisScoreObj.jiezhi = "高于界值";
      this.gaoArr.push(thisScoreObj);
    }

    return thisScoreObj;
  }

  gotoShuaiCha() {
    this.pageType = 2;
  }

  gotoBack() {
    console.log('this.pageType_before', this.pageType);
    this.pageType--;
    console.log('this.pageType_after', this.pageType);
  }

  async request() {

    let model = new GetQuestionParams();
    model.Bids = [this.bid];// 宝宝ID；
    model.QuestType = this.questType;// asq3答卷
    model.QuestMonth = String(this.questMonth);//2月份

    let res = await this._business.getQuestion(model);
    if (res) {
      this.toastrService.success('提交成功');
      console.log('res:', res, 'this.pageType', this.pageType);
    }
  }

  setCurrentAnswers() {
    let that = this;
    that.currentAnswers.map(function (item: any, index: any) {
      if ((index + 1) != that.currentAnswers.length) {
        that.scoreArr.push(that.getScore(item.answer, index,item.result,item.nextStatus,item.prevStatus));
      }else{
        that.zonghe.question = that.intQuestions[index].question;
        that.zonghe.answer = item.answer;
        that.zonghe.result = item.result;
      }
    });
  }

  async submit() {

    this.setCurrentAnswers();

    let model = new Question();
    model.Id = "";
    model.Cid = this.user.Id;
    model.Did = this.doctor.Id;
    model.Mid = this.member.Id;
    model.Bid = this.bid;// 宝宝ID；
    model.QuestType = this.questType;// asq3答卷
    model.QuestMonth = String(this.questMonth);//2月份
    //model.QuestResult = JSON.stringify(this.currentAnswers);// 答题结果
    model.ZongHe = JSON.stringify(this.zonghe);//综合能力结果
    model.QuestScore = JSON.stringify(this.scoreArr);// 运算结果
    model.Source = this._sessionStorage.source;
    model.SurveyTime = this.baby.SurveyTime;
    console.log('model',model);

    let res = await this._business.create(model);
    if (res) {
      this.toastrService.success('提交成功');
      this.question = res;
      this.pageType = 2;
      console.log('all:',this.user,this.baby,this.doctor,this.question);
    }
  }

  async getGames(TestId: any) {
    let that = this;

    let res = await this._business.getGames(TestId);
    if (res) {
      //this.toastrService.success('返回成功');
      that.gamesArr = res;
      console.log('getGames_res:', that.gamesArr);

    }
  }

  async getDividing(TestId: any) {
    let that = this;

    let res = await this._business.getDividing(TestId);
    if (res) {
      //this.toastrService.success('返回成功');
      that.dividingArr = res;
      console.log('getDividing_res:', that.dividingArr);
      this.init();
    }
  }

  printModel(str:any) {
    
  }

}
