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
import { GetQuestionParams } from 'src/app/network/request/question/question.params';
import { ASQ3QuestionBusiness } from './asq3-question.business';

import questions from "./data.json";

// console.log('12', questions)

//import asq3 from '../../../../../assets/files/ASQ_3.xlsx';

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

  @Input() mounthNum: NumberSymbol = 0;
  @Input() thisAnswers: any = [];

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
        "jiezhi": "低于界值"
    },
    {
        "score": 0,
        "nengqu": "解决问题",
        "jiezhi": "低于界值"
    },
    {
        "score": 30,
        "nengqu": "个人-社会",
        "jiezhi": "接近界值"
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


  constructor(private _business: ASQ3QuestionBusiness, private toastrService: ToastrService, private _sessionStorage: SessionStorageService, private _localStorage: LocalStorageService, private _activeRoute: ActivatedRoute) {
    console.log('constructor', this._localStorage.user.Name, _sessionStorage.doctor);

    this._activeRoute.params.subscribe((params: Params) => {
      this.bid = params['bid'];
    })

    this._activeRoute.queryParams.subscribe(params => {
      this.pageType = params['pageType'];
      this.questType = params['questType'];
      this.questMonth = params['questMonth'];

    })

    console.log("getparams", this.bid, this.pageType, this.questType, this.questMonth);
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
      console.log('gaojiediarr', this.gaoArr, this.jieArr, this.diArr);
      //this.request();
    }


  }

  async ngOnInit() {//thisAnswers

    this.currentQuestionsObject = this.babyQuestions[this.mounthNum];
    this.title = this.currentQuestionsObject.name;
    this.currentQuestions = this.currentQuestionsObject.data;
    console.log('currentQuestions:', this.currentQuestions);
    this.intQuestions = this.setQuestions(this.currentQuestions);
    //console.log('intQuestions1:', this.intQuestions);
    this.allPages = this.intQuestions.length;
    if (this.thisAnswers.length > 0) {
      this.currentAnswers = this.thisAnswers;
      this.currentAnswer = this.currentAnswers[0];

      //答案和题目合并
      for (let i = 0; i < this.intQuestions.length; i++) {
        //if (i != 0) {
        this.intQuestions[i].answer = this.currentAnswers[i].answer;
        //}
      }
      //console.log('intQuestions:', this.intQuestions);
      return
    }

    for (let i = 0; i < this.intQuestions.length; i++) {
      this.currentAnswers[i] = { 'answer': [], nextStatus: false, prevStatus: true };
      //console.log('this.currentAnswer_old:', i, this.currentAnswers[i]);
      if (i == 0) {
        this.currentAnswers[i].prevStatus = false;
        this.intQuestions[i].answer = this.currentAnswers[i].answer;
      }
      //console.log('this.currentAnswer_new:', i, this.currentAnswers[i]);
    }
    this.currentAnswer = this.currentAnswers[0];
    

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

  radioClick(e: Event) {

    let l = Number((e.target as HTMLInputElement).getAttribute('l')) - 1;
    let xu = Number((e.target as HTMLInputElement).getAttribute('xu'));
    let v = (e.target as HTMLInputElement).value;
    //console.log(xu,v,this.currentAnswer.answer.length,this.currentAnswer.answer,'---before');

    this.currentAnswer.answer[xu] = v;

    //console.log(xu, v, this.currentAnswer.answer.length, this.currentAnswer.answer, '---after');
    /*this.currentAnswer.map(function(item:any,index:any){
      console.log('map1',index,item);
      if(item == undefined){
        console.log('map2',index,item);
      }
    })*/
    if (Object.keys(this.currentAnswer.answer).length == l) {
      this.currentAnswer.nextStatus = true;
      this.currentAnswers[this.currentPage] = this.currentAnswer;
      //console.log('currentAnswers:', this.currentAnswers);
    }
    this.intQuestions[this.currentPage].answer = this.currentAnswer.answer;
    console.log('intQuestions:', this.intQuestions);

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

  getScore(arr: any, indexFa: any) {//界值状态转化
    let thisScore = 0;
    let thisScoreObj: any = {};
    arr.map(function (item: any, index: any) {
      if (Number(item) == 1) {
        thisScore += 10;
      } else if (Number(item) == 2) {
        thisScore += 5;
      }
    })

    thisScoreObj.score = thisScore;
    thisScoreObj.nengqu = this.nengQu[indexFa];
    if (thisScore <= 3.3 * arr.length) {
      thisScoreObj.jiezhi = "低于界值";
      this.diArr.push(thisScoreObj);
    } else if (thisScore > 3.3 * arr.length && thisScore < 6.6 * arr.length) {
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
    console.log('this.pageType_before',this.pageType);
    this.pageType --;
    console.log('this.pageType_after',this.pageType);
  }

  async request() {

    let model = new GetQuestionParams();
    model.Bid = this.bid;// 宝宝ID；
    model.QuestType = this.questType;// asq3答卷
    model.QuestMonth = String(this.questMonth);//2月份

    let res = await this._business.getQuestion(model);
    if (res) {
      this.toastrService.success('提交成功');
      console.log('res:', res,'this.pageType',this.pageType);
    }
  }

  async submit() {
    let that = this;
    this.currentAnswers.map(function (item: any, index: any) {
      if ((index + 1) != that.currentAnswers.length) {
        that.scoreArr.push(that.getScore(item.answer, index));
      }
    });

    let model = new Question();
    model.Id = "";
    model.Bid = this.bid;// 宝宝ID；
    model.QuestType = this.questType;// asq3答卷
    model.QuestMonth = String(this.questMonth);//2月份
    model.QuestResult = this.currentAnswers;// 答题结果
    model.QuestScore = JSON.stringify(this.scoreArr);// 运算结果

    let res = await this._business.create(model);
    if (res) {
      this.toastrService.success('提交成功');
      this.pageType = 2;
      console.log('res:', res,'this.pageType',this.pageType);
    }
  }

}
