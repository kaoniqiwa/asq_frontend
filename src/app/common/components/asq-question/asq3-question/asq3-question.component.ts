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
import { ASQ3QuestionBusiness } from './asq3-question.business';
import printJS from 'print-js';

/* let url:any = 'src/assets/imgaudio/ASQ-3-audio/2-1.mp3';
import(${url}).then((res)=>{
  console.log('OK');
}).catch((e)=>{
  console.log('error');
}) */

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
  helperAudio:any = new Audio();
  helperImg:any = '';
  helperQuestion:any = '';
  helperAudioStatus:any = false;
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
  mouthArr: any = [2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54 ,60];
  gamesArr: any = [];
  dividingArr: any = [];

  pageType: PageType = PageType.dati;
  questType: QuestType = QuestType.ASQ3;
  questMonth: number = 0;
  bid: string = "";

  nengQu = ['沟通', '粗大动作', '精细动作', '解决问题', '个人-社会', '综合问题'];
  gaoArr: any = [];
  jieArr: any = [];
  diArr: any = [];
  fgaoArr: any = [];
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


  constructor(private _business: ASQ3QuestionBusiness, private _toastrService: ToastrService, private _sessionStorage: SessionStorageService, private _localStorage: LocalStorageService, private _activeRoute: ActivatedRoute, private _globalStorage: GlobalStorageService,private _router: Router) {
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
    

    console.log('this.model',this.model);

    this.scoreArr = this._sessionStorage.questscore || [];
    this.thisAnswers = this._sessionStorage.questscore || [];
    this.zonghe = this._sessionStorage.zonghe || {};

    console.log('constructor', this.user, this.doctor, this.member, this.baby, this.questMonth);
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
        

        console.log('scoreArr2',this.scoreArr,JSON.parse(res.QuestScore));
      }
    }

    this.getGames(this.mouthArr[this.questMonth]);
    this.getDividing(this.mouthArr[this.questMonth],1);
    this.currentNengqu =  this.intQuestions[this.currentPage].question[0][0];

    //console.log('this.currentNengqu',this.currentNengqu);


    this.helperAudio.addEventListener("playing", function(){
      //console.log('helperAudio_playing');
      that.helperAudioStatus = true;
    });
    this.helperAudio.addEventListener("pause", function(){
      //console.log('helperAudio_pause');
      that.helperAudioStatus = false;
    });

  }

  showHelper(e:Event){

    let l = Number((e.target as HTMLInputElement).getAttribute('l')) - 1;//当前问题组的长度
    let j = Number((e.target as HTMLInputElement).getAttribute('j'));//当前能区的序号，0开始
    let k = Number((e.target as HTMLInputElement).getAttribute('k'));//所有能区的长度
    let xu = Number((e.target as HTMLInputElement).getAttribute('xu'));//当前问题的序号，0开始

    let model = Number((e.target as HTMLInputElement).getAttribute('model'));//1为音乐，2为音乐+图片
    this.helperQuestion = (e.target as HTMLInputElement).getAttribute('question');//题目

    let num = j*k+xu+1;
    let img_url:any = 'ASQ-3-img/'+this.mouthArr[this.questMonth]+'-'+num+'.jpg';
    if(model == 2){
      this.helperImg = 'assets/imgaudio/'+img_url;
      this.onHelperFloat(1);
    }

    if(this.helperNum == num){
      if(this.helperAudioStatus){
        this.helperAudio.pause();
      }else{
        this.helperAudio.play();
      }
      return;
    }else{
      this.helperNum = num;
    }
    
    let audio_url:any = 'ASQ-3-audio/'+this.mouthArr[this.questMonth]+'-'+num+'.mp3';
    this.helperAudio.src = 'assets/imgaudio/'+audio_url;
    this.helperAudio.load();
    this.helperAudio.play();
    

  }

  init() {
    if (this.thisAnswers.length > 0) {
      this.zonghe.nextStatus = true;
      this.zonghe.prevStatus = true;
      this.thisAnswers[5] = this.zonghe;

      this.currentAnswers = this.thisAnswers;
      this.currentAnswer = this.currentAnswers[0];

      console.log('this.currentAnswer:', this.currentAnswer);

      //答案和题目合并
      for (let i = 0; i < this.intQuestions.length; i++) {
        if(this.currentAnswers[i]){
          this.intQuestions[i].answer = this.currentAnswers[i].answer;
          this.intQuestions[i].result = this.currentAnswers[i].result;
        }
        if(i==5){
          this.intQuestions[i].answer = this.zonghe.answer;
          this.intQuestions[i].result = this.zonghe.result;
          
        }
        
      }

      //this.setCurrentAnswers();
      console.log('intQuestions:', this.intQuestions);

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
        if (item.jiezhi != '高于界值') {
          that.fgaoArr.push(item);
        }
        
      })
      
      console.log('gaojiediarr', this.gaoArr, this.jieArr, this.diArr,that.fgaoArr);
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

  checkRed(num:any,item:any,value:any):any{
    if(this.At == '0'){
      return false;
    }else{
      //console.log('this.currentAnswer.result[num-1]',this.currentAnswer.result && this.currentAnswer.result[num-1]);
      if(this.checkInput(item,value) && (this.currentAnswer.result[num-1] == '' || this.currentAnswer.result[num-1] == undefined)){
        return true;
      }else{
        return false;
      }
    }
    
  }

  checkInput(item:any,value:any):any{
    let itemArr = item.split('、');
    for(var i=0;i<itemArr.length;i++){
      let this_v = 0;
      if(itemArr[i] == '是'){
        this_v = 1;
      }else if(itemArr[i] == '有时是'){
        this_v = 2;
      }else{
        this_v = 3;
      }
      if(this_v == value){
        return true;
      }
    }
    return false;
  }

  radioClick(e: Event) {

    let l = Number((e.target as HTMLInputElement).getAttribute('l')) - 1;//当前问题组的长度
    //let i = Number((e.target as HTMLInputElement).getAttribute('i')) - 1;//当前问题的序号，0开始
    let j = Number((e.target as HTMLInputElement).getAttribute('j'));//当前能区的序号，0开始
    let k = Number((e.target as HTMLInputElement).getAttribute('k'));//所有能区的长度
    
    let mutexSelf:any = (e.target as HTMLInputElement).getAttribute('mutexSelf');
    let mutexOther:any = (e.target as HTMLInputElement).getAttribute('mutexOther');
    let xu = Number((e.target as HTMLInputElement).getAttribute('xu'));//当前问题的序号，0开始
    let v:any = (e.target as HTMLInputElement).value;
    
    if(mutexSelf!=''){
      //console.log('mutexSelf',mutexSelf);
      let mutexSelfArr:any = mutexSelf.split('、');
      let mutexOtherArr:any = mutexOther.split('、');
      let currentStr = '';
      for(var z=0;z<mutexSelfArr.length;z++){
        currentStr += '“'+mutexSelfArr[z]+'”';
        if(mutexSelfArr.length>=2 && z==0){
          currentStr += '或';
        }
      }
      for(var x=0;x<mutexSelfArr.length;x++){
        let this_v = 0;
        if(mutexSelfArr[x] == '是'){
          this_v = 1;
        }else if(mutexSelfArr[x] == '有时是'){
          this_v = 2;
        }else{
          this_v = 3;
        }
        if(this_v == v){
          //console.log('检测是否互斥');
          let otherStr = '';
          for(var m=0;m<(mutexOtherArr.length/2);m++){
            otherStr+= '第'+mutexOtherArr[m*2]+'题请给予“'+mutexOtherArr[m*2+1]+'”';
            if(mutexOtherArr.length>=3 && m==0){
              otherStr+= '，';
            }
          }
          for(var y=0;y<(mutexOtherArr.length/2);y++){

            let other_v = 0;
            if(mutexOtherArr[y*2+1] == '是'){
              other_v = 1;
            }else if(mutexOtherArr[y*2+1] == '有时是'){
              other_v = 2;
            }else{
              other_v = 3;
            }
            if(this.currentAnswer.answer[mutexOtherArr[y*2]-1] != other_v){
              //console.log('弹框提示',this.currentAnswer.answer,xu);
              this.showStr = '注*：如果'+this.currentNengqu+'第'+(xu+1)+'题勾选了'+currentStr+'，那么'+this.currentNengqu+otherStr;

              this.mutexFloat(1);
              this.currentXu = xu;
              this.currentArr = mutexSelf;
              this.otherArr = mutexOtherArr;
              break;
            }
          }
          break;
        }
      }
    }

    //console.log(xu,v,this.currentAnswer.answer.length,this.currentAnswer.answer,'---before');

    this.currentAnswer.answer[xu] = v;
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
    //console.log('intQuestions:', this.intQuestions,this.currentAnswers);

    //console.log('radioClick',this.currentAnswer.answer);
    //console.log((e.target as HTMLInputElement).value,(e.target as HTMLInputElement).getAttribute('l'));
  }

  nextQuestions(e: Event) {
    if(this.At == '1'){
      for(var m=0;m<this.currentAnswer.answer.length;m++){
        if(this.intQuestions[this.currentPage].question[m+1][2] && this.checkRed(m+1,this.intQuestions[this.currentPage].question[m+1][2],this.currentAnswer.answer[m])){
          alert("为了避免选择失误，请检查答案，尤其注意标红的题目");
          return
        }
      }
    }
    this.helperAudio.pause();
    $("#asq-test").scrollTop(0);
    this.currentPage++;
    this.currentAnswer = this.currentAnswers[this.currentPage];
    this.currentNengqu =  this.intQuestions[this.currentPage].question[0][0];
  }

  prevQuestions(e: Event) {
    this.currentPage--;
    this.currentAnswer = this.currentAnswers[this.currentPage];
    this.currentNengqu =  this.intQuestions[this.currentPage].question[0][0];
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
      this._toastrService.success('提交成功');
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
      params.type = 'AsqLeft';
      let updateLeft = await this._business.updateLeft(params);
      console.log('updateLeft',updateLeft);
      if(!updateLeft){
        this._toastrService.error('剩余次数不足！');
      }else{
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
      console.log('gamesArr:',that.questMonth,this.mouthArr[this.questMonth], that.gamesArr);

    }
  }

  async getDividing(TestId: any,typeId: any) {
    let that = this;

    let res = await this._business.getDividing(TestId,typeId);
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
        if(this.intQuestions[this.currentPage].question[m+1][2] && this.checkRed(m+1,this.intQuestions[this.currentPage].question[m+1][2],this.currentAnswer.answer[m])){
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
    //console.log(e, 'onHelperFloat');
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
