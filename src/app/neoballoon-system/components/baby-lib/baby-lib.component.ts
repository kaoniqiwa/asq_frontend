import { Component, OnInit,ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { BabyManageBusiness as BabyInfoBusiness } from './baby-lib.business';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/network/model/page-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestType } from 'src/app/enum/quest-type.enum';
import { BabyLibModel, BabyLibSearchInfo, QuestionLibModel, QuestionLibSearchInfo } from 'src/app/view-model/baby-lib.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
//import { BabyLibFormComponent } from "src/app/neoballoon-system/components/baby-lib-form/baby-info-operate.component";

@Component({
  selector: 'app-baby-lib',
  templateUrl: './baby-lib.component.html',
  styleUrls: ['./baby-lib.component.less'],
  providers: [BabyInfoBusiness]
})
export class BabyLibComponent implements OnInit {

  

  dataSource: QuestionLibModel[] = [];
  questType: any = 'ASQ-3';
  fileType:any = 'personal';
  searchInfo: any = {
    Flow:'',
    BeginTime:'',
    EndTime:'',
    PageIndex: 1,
    PageSize: 8,
    Uid: '',
    Dids: [],
    Name:'',
    Status:'',
    QuestMonth: "",
    QuestType: ''
  }

  // Paginator
  page: Page | null = null;
  user:any = null;
  newUser:any = null;
  doctor:any = null;


  showToast = false;
  showSe2Print = false;
  thisE:any;

  /* @ViewChild('Operate', { static: false })
  public Operate!: BabyLibFormComponent; */

  constructor(private _business: BabyInfoBusiness, private _router: Router, private _sessionStorage: SessionStorageService, private _activeRoute: ActivatedRoute) { 
    this.searchInfo.QuestType = this._sessionStorage.searchType?this._sessionStorage.searchType:this.questType;
    this.questType = this._sessionStorage.searchType?this._sessionStorage.searchType:this.questType;
    this._sessionStorage.searchType = this.questType;
    //this.Operate.changeQuestType(this.questType);
    //console.log('this.searchInfo.QuestType',this.searchInfo.QuestType);
    this._activeRoute.queryParams.subscribe(params => {
      this.searchInfo.PageIndex = params['pageIndex']?params['pageIndex']:1;
    })
  }

  async ngOnInit() {
    
    this.user = this._sessionStorage.user;
    this.doctor = this._sessionStorage.doctor;
    this.onUpdateUser();
    if (this.doctor && this.fileType == 'personal') {
      this.chooseFather(0);
    }

  }

  async onUpdateUser(){
    this.newUser = await this._business.getUser(this.user.Id);
    this.user = this._sessionStorage.user = this.newUser;
    //console.log('lib_ngOnInit_user',this.user);
  }

  async chooseFather(num:number){
    
    this.searchInfo.QuestMonth = '';
    this.searchInfo.PageIndex = 1;
    this.searchInfo.BeginTime = '';
    this.searchInfo.EndTime = '';

    this.searchInfo.Uid = this.user.Id;
    if(num == 0){
      this.fileType = 'personal';
      this.searchInfo.Dids = [this.doctor.Id];
      //this.searchInfo.Uid = '';
    }else{
      this.fileType = 'total';
      //this.searchInfo.Uid = this.user.Id;
      this.searchInfo.Dids = [];
    }
    
    let res = await this._business.init(this.searchInfo);
    
    this.searchInfo.Name = '';
    this.page = res.Page;
    this.dataSource = res.Data;
    //console.log('dataSource',this.dataSource);
  }

  changeModel(e:Event){
    //this.questType = 
    this.searchInfo.QuestType = this.questType;
    this._sessionStorage.searchType = this.questType;
    //this.Operate.changeQuestType(this.questType);
    //console.log('searchInfo',this.searchInfo,this.questType);
    
    if(this.fileType == 'personal'){
      this.chooseFather(0);
    }else{
      this.chooseFather(1);
    }
  }

  chooseReport(e:Event,num:number,type:any){
    if(num == 0)return
    let thisUid = (e.target as HTMLInputElement).getAttribute('Uid');
    let thisDid = (e.target as HTMLInputElement).getAttribute('Did');
    let thisBid = (e.target as HTMLInputElement).getAttribute('Bid');
    let thisQid = (e.target as HTMLInputElement).getAttribute('Qid');
    //console.log('type',type);
    let this_href = window.location.href.split('#')[0];
    //console.log('num',num);
    if(type == 'ASQ-3'){
      window.open(this_href+'/#/asq3print?type='+num+'&uid='+thisUid+'&did='+thisDid+'&bid='+thisBid+'&qid='+thisQid,'_blank')
    }else if(type == 'ASQ:SE-2'){
      window.open(this_href+'/#/asqse2print?type='+num+'&uid='+thisUid+'&did='+thisDid+'&bid='+thisBid+'&qid='+thisQid,'_blank')
    }
    
  }

  chooseReport2(num:any){
    //console.log('num',num);
    this.chooseReport(this.thisE,num,'ASQ:SE-2');
  }

  gotoReport(e:Event){
    e.stopImmediatePropagation();
    let thisUid = (e.target as HTMLInputElement).getAttribute('Uid');
    let thisDid = (e.target as HTMLInputElement).getAttribute('Did');
    let thisMid = (e.target as HTMLInputElement).getAttribute('Mid');
    let thisBid = (e.target as HTMLInputElement).getAttribute('Bid');
    let thisQid = (e.target as HTMLInputElement).getAttribute('Qid');
    let thisType = (e.target as HTMLInputElement).getAttribute('Type');
    this._router.navigate(["/neoballoon/neoballoon-manage/baby-report"], {
      queryParams: {
        uid: thisUid,
        did: thisDid,
        mid: thisMid,
        bid: thisBid,
        qid: thisQid,
        type: thisType,
        pageIndex: this.searchInfo.PageIndex
      }
    })

   /*  const url = this._router.serializeUrl(
      this._router.createUrlTree(['/neoballoon/neoballoon-manage/baby-report'], {
        queryParams: {
          uid: thisUid,
          did: thisDid,
          mid: thisMid,
          bid: thisBid,
          qid: thisQid,
          type: thisType
        }
      })
    );
    window.open(url, '_blank', 'noopener'); */
  }

  searchEvent(value:string){
    //console.log('searchEvent',value);
    this.searchInfo.Name = value;
    if(this.fileType == 'personal'){
      this.chooseFather(0);
    }else{
      this.chooseFather(1);
    }
  }

  async changeStatus(e:Event){
    let thisStatus:any = (e.target as HTMLInputElement).getAttribute('Status');
    let thisQid:any = (e.target as HTMLInputElement).getAttribute('Qid');
    let thisIndex:any = (e.target as HTMLInputElement).getAttribute('Index');
    let params:any = {};
    params.Qid = thisQid;
    if(thisStatus != 1){
      params.Status = 1;
    }else{
      params.Status = 0;
    }
    let res:any = await this._business.changeStatus(params);
    if(res.result){
      this.dataSource[thisIndex].Status = res.Status;
    }
    //console.log('changeStatus',res);
  }

  async searchCondition(params:any){

    //console.log('searchCondition2',params);

    this.searchInfo.Uid = this.user.Id;
    this.searchInfo.BeginTime = params.BeginTime;
    //console.log('BeginTime',this.searchInfo.BeginTime,params.BeginTime);
    this.searchInfo.EndTime = params.EndTime;
    this.searchInfo.QuestMonth = params.QuestMonth;
    this.searchInfo.Dids = params.Dids;
    this.searchInfo.Status = params.Status;
    //this.searchInfo.Uid = '';

    //console.log('searchCondition3', this.searchInfo);

    let res = await this._business.init(this.searchInfo);
    
    if(res){
      
      this.page = res.Page;
      this.dataSource = res.Data;

      /* this.searchInfo.Name = '';
      this.searchInfo.Dids = '';
      this.searchInfo.Status = 3;
      this.searchInfo.BeginTime = '';
      this.searchInfo.EndTime = '';
      this.searchInfo.QuestMonth = ''; */
      this.searchInfo.PageIndex = 1;

      this.closeEvent();
    }
    

    
  }

  test(num:number){
    console.log('test',num);
  }

  async pageEvent(pageInfo: PageEvent) {
    
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;
    let res = await this._business.init(this.searchInfo);
    this.page = res.Page;
    this.dataSource = res.Data;

    //console.log('pageEvent',pageInfo,this.searchInfo);
  }
  closeEvent() {
    this.showToast = false;
  }
  closeEvent2() {
    this.showSe2Print = false;
  }
  filterHandler() {
    this.showToast = !this.showToast;
  }
  filterHandler2(e:Event) {
    this.thisE = e;
    this.showSe2Print = !this.showSe2Print;
  }
  addBabyHandler() {
    this._router.navigateByUrl('/neoballoon/neoballoon-manage/baby-add-manage')
  }
}

