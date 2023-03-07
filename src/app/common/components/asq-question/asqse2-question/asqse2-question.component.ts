import { NumberSymbol } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
import { ASQse2QuestionBusiness } from './asqse2-question.business';
import printJS from 'print-js';
import {ASQ_SE2_DATA } from "../../../../neoballoon-system/components/baby-game/baby-game.data";

/* let url:any = 'src/assets/imgaudio/ASQ-3-audio/2-1.mp3';
import(${url}).then((res)=>{
  console.log('OK');
}).catch((e)=>{
  console.log('error');
}) */

import questions from "./data.json";

// console.log('12', questions)
//import asqse2 from 'src/assets/files/ASQSE-2-0131.xlsx';
//console.log('asqse2',JSON.stringify(asqse2));
@Component({
  selector: 'asqse2-question',
  templateUrl: './asqse2-question.component.html',
  styleUrls: ['./asqse2-question.component.less'],
  providers: [
    ASQse2QuestionBusiness
  ]
})
export class Asqse2QuestionComponent implements OnInit {


  //@Input() mounthNum: NumberSymbol = 0;
  //@Input() thisAnswers: any = [];
  asqse2Img:any = ASQ_SE2_DATA;
  helperAudio:any = new Audio();
  helperTopAudio:any = new Audio();
  helperImg:any = '';
  helperQuestion:any = '';
  helperAudioStatus:any = false;
  helperTopAudioStatus:any = false;
  helperNum:any = 0;
  math = Math;
  thisAnswers: any = [];

  zonghe:any = {};
  babyQuestions: any = questions;
  currentQuestionsObject: any = { name: '', data: [[], [], []] };
  title: any = '';
  currentQuestions: any = [];
  intQuestions: any = [];
  currentPage: any = 0;
  allPages: any = 0;
  currentAnswers: any = [];
  currentAnswer: any = {};
  scoreArr: any = [];
  mouthArr: any = [2, 6, 12, 18, 24, 30, 36, 48, 60];
  gamesArr: any = [];
  dividingArr: any = [];

  pageType: any = PageType.dati;
  //pageType: any = 3;
  questType: any = QuestType.ASQ3;
  questMonth: number = 0;
  bid: string = "";

  nengQu = ['综合问题','其他问题'];
  gaoArr: any = [];
  jieArr: any = [];
  diArr: any = [];
  monthWorkBook: any = [];
  doctor: any = {};
  user: any = {};
  member:any = {};
  baby: any = {};
  age: any = {};
  question:any = {};
  source:any = '';
  qid:any = '';
  model:any = '';
  Am:any = '0';
  At:any = '0';
  currentT:any = [false,false,false,false,false,false];

  //呼出浮层,false为不显示，true位显示
  float = false;
  helperfloat = false;
  mutexfloat = false;

  //当前点击选择对象
  currentXu:any = '';
  currentArr:any = '';
  otherArr:any = '';
  showStr:any = '';
  currentNengqu:any = '';
  checkStatus:any = false;


  constructor(private _business: ASQse2QuestionBusiness, private _toastrService: ToastrService, private _sessionStorage: SessionStorageService, private _localStorage: LocalStorageService, private _activeRoute: ActivatedRoute, private _globalStorage: GlobalStorageService,private _router: Router) {
    this.monthWorkBook = this._sessionStorage.monthWorkBook;
    this.doctor = this._sessionStorage.doctor;
    this.user = this._sessionStorage.user;
    this.member = this._sessionStorage.member;
    this.baby = this._sessionStorage.baby;
    this.source = this._sessionStorage.source;
    this.Am = this._sessionStorage.Am;
    this.At = this._sessionStorage.At;

    this._activeRoute.queryParams.subscribe(params => {
      this.pageType = params['pageType'];
      this.questType = params['questType'];
      this.questMonth = params['questMonth'];
      this.bid = params['bid'];
      this.qid = params['Qid'];
      this.model = params['model'];
      
    })
    

    console.log('this.model',ASQ_SE2_DATA,this.asqse2Img[this.questMonth]);

    this.scoreArr = this._sessionStorage.questscore || [];
    this.thisAnswers = this._sessionStorage.questscore || [];
    this.zonghe = this._sessionStorage.zonghe || {};

    console.log('constructor',this.scoreArr,this.scoreArr.length, this.user, this.doctor, this.member, this.baby, this.questMonth);
  }

  async ngOnInit() {

    /* let params:any = {};
    params.testid = this.mouthArr[this.questMonth];
    let questions:any = await this._business.getQuestionsByMonth(params);
    console.log('questions',questions); */

    
    let that = this;
    this.currentQuestionsObject = this.babyQuestions[this.questMonth];
    this.title = this.currentQuestionsObject.name;
    this.currentQuestions = this.currentQuestionsObject.data;
    //console.log('currentQuestions:', this.currentQuestions);
    this.intQuestions = this.setQuestions(this.currentQuestions);
    console.log('intQuestions1:', this.intQuestions);
    this.allPages = this.intQuestions.length;

    if(this.qid != undefined){
      let res:any = await this._business.get(this.qid);
      if (res) {
        //console.log('res',res);
        this.question = res;
        //console.log('scoreArr1',this.scoreArr,JSON.parse(res.QuestScore));
        this.scoreArr = JSON.parse(res.QuestScore);
        this.thisAnswers = JSON.parse(res.QuestScore);
        this.zonghe = JSON.parse(res.ZongHe);
        

        //console.log('scoreArr2',this.scoreArr,JSON.parse(res.QuestScore));
      }
    }

    //this.getGames(this.mouthArr[this.questMonth]);
    this.getDividing(this.mouthArr[this.questMonth],3);//SE2 typeid=2
    //this.currentNengqu =  this.intQuestions[this.currentPage].question[0][0];

    //console.log('this.currentNengqu',this.currentNengqu);


    this.helperAudio.addEventListener("playing", function(){
      //console.log('helperAudio_playing');
      that.helperAudioStatus = true;
    });
    this.helperAudio.addEventListener("pause", function(){
      //console.log('helperAudio_pause');
      that.helperAudioStatus = false;
    });

    this.helperTopAudio.addEventListener("playing", function(){
      that.helperTopAudioStatus = true;
    });
    this.helperTopAudio.addEventListener("pause", function(){
      that.helperTopAudioStatus = false;
    });

  }

  helperPlay(e:Event){
    if(!this.helperTopAudioStatus){
      this.helperTopAudio.src = 'assets/imgaudio/ASQ-SE2-audio/ts.mp3';
      this.helperTopAudio.load();
      this.helperTopAudio.play();
      this.helperAudio.pause();
    }else{
      this.helperTopAudio.pause();
    }
    
  }

  showHelper(e:Event){

    let l = Number((e.target as HTMLInputElement).getAttribute('l')) - 1;//当前问题组的长度
    let j = Number((e.target as HTMLInputElement).getAttribute('j'));//当前能区的序号，0开始
    let k = Number((e.target as HTMLInputElement).getAttribute('k'));//所有能区的长度
    let xu = Number((e.target as HTMLInputElement).getAttribute('xu'));//当前问题的序号，0开始
    let audioNum = Number((e.target as HTMLInputElement).getAttribute('num'));

    let model = Number((e.target as HTMLInputElement).getAttribute('model'));//1为音乐，2为音乐+图片
    this.helperQuestion = (e.target as HTMLInputElement).getAttribute('question');//题目

    let num = j*k+xu+1;
    let img_url:any = 'ASQ-SE2-img/'+this.mouthArr[this.questMonth]+'-'+num+'.png';
    if(model == 2){
      this.helperImg = 'assets/imgaudio/'+img_url;
      this.onHelperFloat(1);
    }
    if(this.helperNum == num){
      if(this.helperAudioStatus){
        this.helperAudio.pause();
      }else{
        this.helperAudio.play();
        this.helperTopAudio.pause();
      }
      return;
    }else{
      this.helperNum = num;
    }
    
    let audio_url:any = 'ASQ-SE2-audio/'+audioNum+'.mp3';
    this.helperAudio.src = 'assets/imgaudio/'+audio_url;
    console.log('this.helperAudio.src',this.helperAudio.src);
    this.helperAudio.load();
    this.helperAudio.play();
    this.helperTopAudio.pause();
    

  }

  init() {
    if (this.thisAnswers.length > 0) {
      this.zonghe.nextStatus = true;
      this.zonghe.prevStatus = true;
      this.thisAnswers[1] = this.zonghe;

      this.currentAnswers = this.thisAnswers;
      this.currentAnswer = this.currentAnswers[0];

      console.log('this.currentAnswer:', this.currentAnswer,this.intQuestions);

      //答案和题目合并
      for (let i = 0; i < this.intQuestions.length; i++) {
        if(this.currentAnswers[i]){
          this.intQuestions[i].answer = this.currentAnswers[i].answer;
          this.intQuestions[i].worry = this.currentAnswers[i].worry;
          this.intQuestions[i].result = this.currentAnswers[i].result;
        }
        if(i==1){
          this.intQuestions[i].answer = this.zonghe.answer;
          this.intQuestions[i].worry = this.zonghe.worry;
          this.intQuestions[i].result = this.zonghe.result;
          
        }
        
      }

      this.setCurrentAnswers();
      //console.log('intQuestions:', this.intQuestions);

    } else {
      for (let i = 0; i < this.intQuestions.length; i++) {
        this.currentAnswers[i] = { 'answer': [],'worry': [], nextStatus: false, prevStatus: true ,'result': []};
        //console.log('this.currentAnswer_old:', i, this.currentAnswers[i]);
        if (i == 0) {
          this.currentAnswers[i].prevStatus = false;
          this.intQuestions[i].answer = this.currentAnswers[i].answer;
          this.intQuestions[i].worry = this.currentAnswers[i].worry;
        }
        if(i==1){
          this.currentAnswers[i].answer[2] = 1;
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
    //this.currentAnswer = {'answer': ['2','2','2','2','2','3','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1'],'worry': [], nextStatus: false, prevStatus: false ,'result': []} 
  }

  counter(i: number) {
    return new Array(i);
  }

  checkDetil() {
    this.pageType = 3;
  }

  nextQx() {
    this.pageType = 4;
  }

  nextGa() {
    this.pageType = 5;
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

  checkRed(num:any,item:any,value:any,fz:any):any{
    if(this.At == '0'){
      return false;
    }else{
      //console.log('this.currentAnswer.result[num-1]',this.currentAnswer.result && this.currentAnswer.result[num-1]);
      if(this.checkInput(item,value,fz) && (this.currentAnswer.result[num-1] == '' || this.currentAnswer.result[num-1] == undefined)){
        return true;
      }else{
        return false;
      }
    }
    
  }

  checkInput(item:any,value:any,fz:any):any{
    let itemArr = item.split('、');
    for(var i=0;i<itemArr.length;i++){
      let this_v = 0;
      if(itemArr[i] == '经常或总是'){
        this_v = 1;
        if(fz==2){
          this_v = 3;
        }
      }else if(itemArr[i] == '偶尔'){
        this_v = 2;
      }else{
        this_v = 3;
        if(fz==2){
          this_v = 1;
        }
      }
      if(this_v == value){
        return true;
      }
    }
    return false;
  }

  radioClickWorry(e: Event){
    let xu = Number((e.target as HTMLInputElement).getAttribute('xu'));//当前问题的序号，0开始
    let v:any = (e.target as HTMLInputElement).value;
    if(v!=1||!v){
      this.currentAnswer.worry[xu] = 1;
      (e.target as HTMLInputElement).setAttribute('value','1');
    }else{
      this.currentAnswer.worry[xu] = 0;
      (e.target as HTMLInputElement).setAttribute('value','0');
    }
    

    console.log(this.currentAnswer.worry,'---worry');
  }

  radioClick(e: Event) {

    let l = Number((e.target as HTMLInputElement).getAttribute('l'));//当前问题组的长度
    //let i = Number((e.target as HTMLInputElement).getAttribute('i')) - 1;//当前问题的序号，0开始
    let j = Number((e.target as HTMLInputElement).getAttribute('j'));//当前能区的序号，0开始
    let k = Number((e.target as HTMLInputElement).getAttribute('k'));//所有能区的长度
    
    let mutexSelf:any = (e.target as HTMLInputElement).getAttribute('mutexSelf');
    let mutexOther:any = (e.target as HTMLInputElement).getAttribute('mutexOther');
    let xu = Number((e.target as HTMLInputElement).getAttribute('xu'));//当前问题的序号，0开始
    let v:any = (e.target as HTMLInputElement).value;
    

    //console.log(xu,v,this.currentAnswer.answer.length,this.currentAnswer.answer,'---before');

    this.currentAnswer.answer[xu] = v;
    if(v==1){
      this.currentAnswer.worry[xu] = 0;
    }
    let isNull = false;
    for(var n=0;n<this.currentAnswer.answer.length;n++){
      if(this.currentAnswer.answer[n] == null){
        isNull = true;
        break;
      }
    }
    if (Object.keys(this.currentAnswer.answer).length == l && !isNull) {
      this.currentAnswer.nextStatus = true;
      this.currentAnswers[this.currentPage] = this.currentAnswer;
      //console.log('currentAnswers:', this.currentAnswers);
    }
    this.intQuestions[this.currentPage].answer = this.currentAnswer.answer;
    this.intQuestions[this.currentPage].worry = this.currentAnswer.worry;
    //console.log('intQuestions:', this.intQuestions,this.currentAnswers);
    //console.log(xu,v,Object.keys(this.currentAnswer.answer).length,l,this.currentAnswers,'---after');
    //console.log('radioClick',this.currentAnswer.answer);
    //console.log((e.target as HTMLInputElement).value,(e.target as HTMLInputElement).getAttribute('l'));
  }

  nextQuestions(e: Event) {
    if(this.At == '1'){
      for(var m=0;m<this.currentAnswer.answer.length;m++){
        if(this.intQuestions[this.currentPage].question[m+1][3] && this.checkRed(m+1,this.intQuestions[this.currentPage].question[m+1][3],this.currentAnswer.answer[m],this.intQuestions[this.currentPage].question[m+1][2])){
          alert("为了避免选择失误，请检查答案，尤其注意标红的题目");
          return
        }
      }
    }
    $("#asq-test").scrollTop(0);
    this.currentPage++;
    this.currentAnswer = this.currentAnswers[this.currentPage];
    //this.currentNengqu =  this.intQuestions[this.currentPage].question[0][0];
  }

  prevQuestions(e: Event) {
    this.currentPage--;
    this.currentAnswer = this.currentAnswers[this.currentPage];
    //this.currentNengqu =  this.intQuestions[this.currentPage].question[0][0];
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

  getScore(arr: any,warr: any, indexFa: any ,rearr: any,ns: any,ps: any,) {//界值状态转化
    let thisScore = 0;
    let thisScoreObj: any = {};
    let that = this;
    console.log('arr',arr);
    arr.map(function (item: any, index: any) {
      
      if (Number(item) == 1) {
        console.log('item',item);
        thisScore += that.setThisScore(1);
      } else if (Number(item) == 2) {
        console.log('item',item);
        thisScore += that.setThisScore(2);
      }else if (Number(item) == 3){
        thisScore += that.setThisScore(3);
      }
      if(warr[index] == 1){
        thisScore += 5;
      }
    })
    thisScoreObj.nextStatus = ns;
    thisScoreObj.prevStatus = ps;
    thisScoreObj.result = rearr;
    thisScoreObj.answer = arr;
    thisScoreObj.worry = warr;
    thisScoreObj.score = thisScore;
    //thisScoreObj.nengqu = this.nengQu[indexFa];
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
      this._toastrService.success('提交成功');
      console.log('res:', res, 'this.pageType', this.pageType);
    }
  }

  setCurrentAnswers() {
    let that = this;
    that.scoreArr = [];
    that.currentAnswers.map(function (item: any, index: any) {
      if ((index + 1) != that.currentAnswers.length) {
        that.scoreArr.push(that.getScore(item.answer,item.worry, index,item.result,item.nextStatus,item.prevStatus));
      }else{
        that.zonghe.question = that.intQuestions[index].question;
        that.zonghe.answer = item.answer;
        that.zonghe.worry = item.worry;
        that.zonghe.result = item.result;
      }
    });
    console.log('setCurrentAnswers',that.currentAnswers,that.scoreArr);
  }

  async submit() {
    //if(!this.checkStatus)return
    console.log('this._sessionStorage.questscore_submit',this._sessionStorage.questscore);
    if(this._sessionStorage.questscore != null){
      this._toastrService.error('不能重复答题，即将跳转到筛查页面！');
      if(this.source!=1){
        this._router.navigate(["/mlogin"])
      }else{
        this._router.navigate(["/neoballoon/neoballoon-manage/baby-add-manage"])
      }
     
    }else{
      
      if(this.source == 2){
        let this_uuid = this._sessionStorage.uuid;
        if(this_uuid == undefined){
          alert('链接已失效，请重新生成');
          return
        }
  
        let params:any = {};
        params.Uuid = this_uuid;
        let res:any = await this._business.checkUuid(params);
        console.log('res',res);
        if(!res){
          alert('链接已失效，请重新生成');
          return
        }
      }else if(this.source == 3){
  
        let params:any = {};
        params.seq = this._sessionStorage.seq;
        let res:any = await this._business.getStatus(params);
        console.log('res',res);
        if(!res){
          alert('问卷已完成，链接失效。');
          return
        }
      }

      this.setCurrentAnswers();
      console.log('scoreArr',this.scoreArr);
      let model = new Question();
      model.Id = "";
      model.Cid = this.user.Id;
      model.Cseq = this.user.Seq;
      model.Did = this.doctor.Id;
      model.Dseq = this.doctor.Seq;
      model.Mid = this.member.Id;
      model.Bid = this.bid;// 宝宝ID；
      model.Mphone = this.member.Phone;
      model.QuestType = this.questType;// asq3答卷
      model.QuestMonth = String(this.questMonth);//2月份
      //model.QuestResult = JSON.stringify(this.currentAnswers);// 答题结果
      model.ZongHe = JSON.stringify(this.zonghe);//综合能力结果
      model.QuestScore = JSON.stringify(this.scoreArr);// 运算结果
      model.Source = this.source;
      model.Am = this.Am;
      model.uuid = this._sessionStorage.uuid;
      model.seq = this._sessionStorage.seq;
      model.SurveyTime = this.baby.SurveyTime;
      model.Rectifyage = this.baby.Rectifyage;
      console.log('model',model);

      let params:any = {};
      params.uid = this.user.Id;
      params.type = 'AsqSe2Left';
      let updateLeft = await this._business.updateLeft(params);
      console.log('updateLeft',updateLeft);
      if(!updateLeft){
        this._toastrService.error('剩余次数不足！');
      }else{
        console.log('提交');
        let res = await this._business.create(model);
        if (res) {
          this._toastrService.success('提交成功');
          this._sessionStorage.questscore = this.scoreArr;
          this._sessionStorage.zonghe = this.zonghe;
          this.question = res;
          this.pageType = 2;
          //console.log('all:',this.user,this.baby,this.doctor,this.question);
          if(this.source !=1){
            let e:any = 1;
            this.gotoReport(e);
          }
          
        }
      }
    }

    

    
  }

  async getGames(TestId: any) {
    let that = this;

    let res = await this._business.getGames(TestId);
    if (res) {
      //this._toastrService.success('返回成功');
      that.gamesArr = res;
      console.log('getGames_res:', that.gamesArr);

    }
  }

  async getDividing(TestId: any,typeid:any) {
    let that = this;
    console.log('getDividing_res2:',that.questMonth,this.mouthArr[this.questMonth]);

    let res = await this._business.getDividing(TestId,typeid);
    if (res) {
      //this._toastrService.success('返回成功');
      that.dividingArr = res;
      console.log('getDividing_res:',that.questMonth,this.mouthArr[this.questMonth], that.dividingArr);
      this.init();
    }
  }

  printModel(str:any) {
    
  }

  gotoReport(e:Event){
    
    this._router.navigate(["/neoballoon/neoballoon-manage/baby-report"], {
      queryParams: {
        uid: this.user.Id,
        did: this.doctor.Id,
        mid: this.member.Id,
        bid: this.baby.Id,
        qid: this.question.Id
      }
    })
  }
  onSubmitFloat(e: any) {
    if(this.At == '1'){
      for(var m=0;m<this.currentAnswer.answer.length;m++){
        if(this.intQuestions[this.currentPage].question[m+1][3] && this.checkRed(m+1,this.intQuestions[this.currentPage].question[m+1][3],this.currentAnswer.answer[m],this.intQuestions[this.currentPage].question[m+1][2])){
          alert("为了避免选择失误，请检查答案，尤其注意标红的题目");
          return
        }
      }
    }
    console.log(e, 'onSubmitFloat');
    if (e == 1) {
      this.float = true;
    } else if (e == 2) {
      this.float = false;
      this.submit();
    } else if (e == 3) {
      this.currentPage = 0;
      this.currentAnswer = this.currentAnswers[this.currentPage];
      this.float = false;
      this.checkStatus = true;
    } else if (e == 4) {
      this.currentPage = 0;
      this.thisAnswers = [];
      this.ngOnInit();
      this.float = false;
    }else if (e == 5) {
      this.float = false;
    }
    
  }

  onHelperFloat(e: any) {
    console.log(e, 'onHelperFloat');
    if (e == 1) {
      this.helperfloat = true;
    } else if (e == 2) {
      this.helperfloat = false;
      this.helperAudio.pause();
    }
    
  }

  mutexFloat(e: any) {
    //console.log(e, 'mutexfloat');
    if (e == 1) {
      this.mutexfloat = true;
    } else if (e == 2) {
      this.mutexfloat = false;
      for(var y=0;y<(this.otherArr.length/2);y++){
        let other_v = 0;
        if(this.otherArr[y*2+1] == '是'){
          other_v = 1;
        }else if(this.otherArr[y*2+1] == '有时是'){
          other_v = 2;
        }else{
          other_v = 3;
        }
        //console.log('index',this.otherArr[y*2]-1,other_v);
        this.currentAnswer.answer[this.otherArr[y*2]-1] = String(other_v);
        this.currentAnswers[this.currentPage] = this.currentAnswer;
        this.intQuestions[this.currentPage].answer = this.currentAnswer.answer;
        
      }
    } else if (e == 3) {
      this.mutexfloat = false;
      this.currentAnswer.answer[this.currentXu] = null;
      this.currentAnswer.nextStatus = false;
    }
    
  }

}
