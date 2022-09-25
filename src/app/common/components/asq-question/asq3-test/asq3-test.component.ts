import { NumberSymbol } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestType } from 'src/app/enum/ques-type.enum';
import { QuestionModel } from 'src/app/view-model/question.model';
import { ASQTestBusiness } from './asq3-test.business';

import questions from "./data.json";

console.log('12', questions)

//import asq3 from '../../../../../assets/files/ASQ_3.xlsx';

//console.log('asq3',JSON.stringify(asq3));
@Component({
  selector: 'asq3-test',
  templateUrl: './asq3-test.component.html',
  styleUrls: ['./asq3-test.component.less'],
  providers: [
    ASQTestBusiness
  ]
})
export class Asq3TestComponent implements OnInit {

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

  constructor(private _business: ASQTestBusiness, private toastrService: ToastrService) {

  }

  async ngOnInit() {//thisAnswers
    this.currentQuestionsObject = this.babyQuestions[this.mounthNum];
    this.title = this.currentQuestionsObject.name;
    this.currentQuestions = this.currentQuestionsObject.data;
    this.intQuestions = this.setQuestions(this.currentQuestions);
    
    this.allPages = this.intQuestions.length;
    if (this.thisAnswers.length > 0) {
      this.currentAnswers = this.thisAnswers;
      this.currentAnswer = this.currentAnswers[0];

      //答案和题目合并
      for (let i = 0; i < this.intQuestions.length; i++) {
        if (i != 0) {
          this.intQuestions[i].answer = this.currentAnswers[i-1];
        }
      }
      console.log('intQuestions:', this.intQuestions);
      return
    }

    for (let i = 0; i < this.intQuestions.length; i++) {
      this.currentAnswers[i] = { 'answer': [], nextStatus: false, prevStatus: true };
      console.log('this.currentAnswer_old:', i, this.currentAnswers[i]);
      if (i == 0) {
        this.currentAnswers[i].prevStatus = false;
      }
      console.log('this.currentAnswer_new:', i, this.currentAnswers[i]);
    }
    this.currentAnswer = this.currentAnswers[0];

  }

  setQuestions(arr: any) {//重组数据
    let questions: any = [];
    let question: any = [];
    let queAndAns: any = {};
    arr.forEach(function (obj: any, index: any) {
      if (index != 0 && obj.length != 0) {
        question.push(obj);
        if ((arr[index + 1] && arr[index + 1].length == 0) || (index + 1) == arr.length) {
          queAndAns.question = question;
          questions.push(queAndAns);
          question = [];
        }

      }
    })
    console.log('questions', questions)
    return questions;

  }

  radioClick(e: Event) {

    let l = Number((e.target as HTMLInputElement).getAttribute('l')) - 1;
    let xu = Number((e.target as HTMLInputElement).getAttribute('xu'));
    let v = (e.target as HTMLInputElement).value;
    //console.log(xu,v,this.currentAnswer.answer.length,this.currentAnswer.answer,'---before');

    this.currentAnswer.answer[xu] = v;

    console.log(xu, v, this.currentAnswer.answer.length, this.currentAnswer.answer, '---after');
    /*this.currentAnswer.map(function(item:any,index:any){
      console.log('map1',index,item);
      if(item == undefined){
        console.log('map2',index,item);
      }
    })*/
    if (Object.keys(this.currentAnswer.answer).length == l) {
      this.currentAnswer.nextStatus = true;
      this.currentAnswers[this.currentPage] = this.currentAnswer;
      console.log('currentAnswers:', this.currentAnswers);
    }

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

  async submit() {
    let model = new QuestionModel();
    model.id = "";
    model.bid = "sdfsdf";// 宝宝ID；
    model.questType = QuestType.Asq3;// asq3答卷
    model.questMonth = "0";//2月份
    model.questResult = ['sdf'];// 答题结果

    let res = await this._business.create(model);
    if (res) {
      this.toastrService.success('提交成功');
    }
  }

}
