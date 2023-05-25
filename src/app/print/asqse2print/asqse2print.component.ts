import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { Asqse2PrintBusiness } from './asqse2print.business';
import {ASQ_SE2_DATA } from "../../neoballoon-system/components/baby-game/baby-game.data";


import questions from "../../common/components/asq-question/asqse2-question/data.json";

//import { EnterPriseLoginModel, LoginModel } from 'src/app/view-model/login.model';
@Component({
  selector: 'asqse2print',
  templateUrl: './asqse2print.component.html',
  styleUrls: ['./asqse2print.component.less'],
  providers: [
    Asqse2PrintBusiness
  ]
})
export class Asqse2printComponent implements OnInit {

  babyQuestions: any = questions;
  currentQuestionsObject: any = { name: '', data: [[], [], []] };
  currentQuestions: any = [];
  intQuestions: any = [];
  learnImg:any = [];
  imgUrl:any = 'assets/img/game/img/asqse2/';
  eatArr:any = ['吃','食','吐','饿','呕','恶心','撑','饱','胀','饭','餐','奶','乳','吞','咽','吮','吸','喂','饮','喝'];
  sleepArr:any = ['睡','困','醒','梦','惊','休','息','夜','累','憩','寝','趴','躺','眠'];
  shitArr:any = ['拉','尿','便','稀','厕','裤','马桶','屎'];


  asqse2Img:any = ASQ_SE2_DATA;
  complete = false;
  mouthArr: any = [2, 6, 12, 18, 24, 30, 36, 48, 60];
  type:any = 1;
  questMonth:any = 0;
  monthWorkBook: any = [];
  diArr:any = [];
  jieArr:any = [];
  gaoArr:any = [];
  fgaoArr: any = [];
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
  zongHe:any = [];
  math = Math;
  pstatus = 1;
  constructor(private _title: Title, private _fb: FormBuilder, private _activeRoute: ActivatedRoute, private _business: Asqse2PrintBusiness, private _sessionStorage: SessionStorageService,) {
    this.monthWorkBook = this._sessionStorage.monthWorkBook;
    
    this._activeRoute.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.did = params['did'];
      this.bid = params['bid'];
      this.qid = params['qid'];
      this.type = params['type'];
      this.pstatus = params['pstatus']?params['pstatus']:this.pstatus;
    })

    //console.log('ASQ_SE2_DATA',this.asqse2Img[this.questMonth])
  }
  

  async ngOnInit() {

    this.user = await this._business.getUser(this.uid);
    this.doctor = await this._business.getDoctor(this.did);
    this.baby = await this._business.getBaby(this.bid);
    this.question = await this._business.getQuestion(this.qid);
    //this.gamesArr = await this._business.getGames(this.mouthArr[this.question.QuestMonth]);

    //console.log('ngOnInit',this.qid,this.question)

    let that = this;
    this.complete = true;
    this.scoreArr = JSON.parse(this.question.QuestScore);
    this.questMonth = this.question.QuestMonth;
    this.zongHe = JSON.parse(this.question.ZongHe);

    this.currentQuestionsObject = this.babyQuestions[this.questMonth];
    this.currentQuestions = this.currentQuestionsObject.data;
    //console.log('currentQuestions:', this.currentQuestions);
    this.intQuestions = this.setQuestions(this.currentQuestions);
    let d5 = this.currentQuestions[0][5] != null && this.currentQuestions[0][5].split('、');
    let d6 = this.currentQuestions[0][6] != null && this.currentQuestions[0][6].split('、');

    //console.log('intQuestions',this.intQuestions,this.currentQuestions,d5,d6);

    for(var i=0;i<d5.length;i++){
      let _url = d5[i].replace(/-/, "/");
      let newUrl = '';
      for(var j=0;j<Number(d6[i]);j++){
        newUrl = this.imgUrl+_url+'/'+(j+1)+'.jpg';
        this.learnImg.push(newUrl);
      }
    }
    //console.log('learnImg1',this.learnImg);
    
    console.log('zongHe',this.zongHe);
    this.scoreArr.map(function (item: any, index: any) {
      if (item.jiezhi == '低于界值') {
        that.diArr.push(item);
      } else if (item.jiezhi == '接近界值') {
        that.jieArr.push(item);
      } else {
        that.gaoArr.push(item);
      }
      if (item.jiezhi != '高于界值') {
        that.fgaoArr.push(item);
      }
    })

    //console.log('scoreArr',this.scoreArr[0]);

    
    for(var n=0;n<this.scoreArr[0].answer.length;n++){
      let thisScore = this.setThisScore(this.scoreArr[0].answer[n]);
      if(this.scoreArr[0].worry[n] == true){
        thisScore+=5;
      }
      if(thisScore>=10 && this.intQuestions[0].question[n][5]!= null){
        //console.log('showStudy',this.intQuestions[0].question[n][5],this.intQuestions[0].question[n][6]);
        let o5 = this.intQuestions[0].question[n][5].split('、');
        let o6 = String(this.intQuestions[0].question[n][6]).split('、');
        //console.log('o5',o5,o6);
        for(var ii=0;ii<o5.length;ii++){
          let _url = o5[ii].replace(/-/, "/");
          //console.log('_url',_url);
          let newUrl = '';
          for(var jj=0;jj<Number(o6[ii]);jj++){
            newUrl = this.imgUrl+_url+'/'+(jj+1)+'.jpg';
            this.learnImg.push(newUrl);
          }
        }
      }
      //console.log('answer',this.scoreArr[0].answer[n],this.scoreArr[0].worry[n],this.intQuestions[0].question[n]);
      
    }

    if(this.zongHe.result[0] != null){
      if(this.checkEat(this.zongHe.result[0])){
        let _url = this.zongHe.question[0][5].split('、')[0].replace(/-/, "/");
        let newUrl = '';
        for(var ee=0;ee<Number(this.zongHe.question[0][6].split('、')[0]);ee++){
          newUrl = this.imgUrl+_url+'/'+(ee+1)+'.jpg';
          this.learnImg.push(newUrl);
        }
      }

      if(this.checkSleep(this.zongHe.result[0])){
        let _url = this.zongHe.question[0][5].split('、')[1].replace(/-/, "/");
        let newUrl = '';
        for(var ee=0;ee<Number(this.zongHe.question[0][6].split('、')[1]);ee++){
          newUrl = this.imgUrl+_url+'/'+(ee+1)+'.jpg';
          this.learnImg.push(newUrl);
        }
      }

      if(this.zongHe.question[0][5].split('、').length >=3 && this.checkShit(this.zongHe.result[0])){
        let _url = this.zongHe.question[0][5].split('、')[2].replace(/-/, "/");
        let newUrl = '';
        for(var ee=0;ee<Number(this.zongHe.question[0][6].split('、')[2]);ee++){
          newUrl = this.imgUrl+_url+'/'+(ee+1)+'.jpg';
          this.learnImg.push(newUrl);
        }
      }
    }

    for(var nn=3;nn<this.zongHe.answer.length;nn++){
      if(this.zongHe.answer[nn] == 1){
        let _url = this.zongHe.question[nn][5].split('、')[0].replace(/-/, "/");
        let newUrl = '';
        for(var ee=0;ee<Number(String(this.zongHe.question[nn][6]).split('、')[0]);ee++){
          newUrl = this.imgUrl+_url+'/'+(ee+1)+'.jpg';
          this.learnImg.push(newUrl);
        }
      }
      
    }

    //console.log('learnImg2',this.learnImg);

    this.learnImg = this.learnImg.filter(function(item:any,index:any){
      return that.learnImg.indexOf(item) === index;
    });
    //console.log('learnImg3',this.learnImg);

    //console.log('asq3print',this.user,this.doctor,this.baby,this.question,this.gaoArr.length,this.scoreArr.length);
    if(this.pstatus == 1){

      let thistimeout = setTimeout(function(){
        window.print();
      },(this.type==3 || this.type==4 || this.type==5)?5000:2000)
      
      
    }
    
    
  }

  checkEat(str:any){
    for(var s=0;s<this.eatArr.length;s++){
      if(str.indexOf(this.eatArr[s]) != -1){
        return true;
      }
    }
    return false;
  }

  checkSleep(str:any){
    for(var s=0;s<this.sleepArr.length;s++){
      if(str.indexOf(this.sleepArr[s]) != -1){
        return true;
      }
    }
    return false;
  }

  checkShit(str:any){
    for(var s=0;s<this.shitArr.length;s++){
      if(str.indexOf(this.shitArr[s]) != -1){
        return true;
      }
    }
    return false;
  }

  setQuestions(arr: any) {//重组数据
    let questions: any = [];
    let question: any = [];
    let jiangeNum:any = 0;

    arr.forEach(function (obj: any, index: any) {
      if (index != 0 && obj.length != 0) {
        if(obj.length>1)question.push(obj);
        if ((arr[index + 1] && ((jiangeNum==0 && arr[index + 1].length <= 1)||(jiangeNum==1 && arr[index + 1].length == 0))) || (index + 1) == arr.length) {
          jiangeNum++;
          let queAndAns: any = {};
          queAndAns.question = question;
          questions.push(queAndAns);
          question = [];
        }

      }
    })
    console.log('questions', questions)
    return questions;

  }

  setDate(str: string) {
    var reg = /(\d{4})\-(\d{2})\-(\d{2})/;
    var date = str.replace(reg, "$1年$2月$3日");
    return date;
  }

  setThisScore(num: any) {
    if (Number(num) == 1) {
      return 0;
    } else if (Number(num) == 2) {
      return 5;
    } else {
      return 10;
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  /* printSomething() {
    this.dom = document.getElementById('printTable'); // 将要被打印的表格
    printJS({
      printable: this.dom,
      type: 'html',
      css: 'assets/view.css',
      scanStyles: false,
    });
  } */

}
