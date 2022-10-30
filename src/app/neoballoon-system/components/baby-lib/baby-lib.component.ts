import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { BabyManageBusiness as BabyInfoBusiness } from './baby-lib.business';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/network/model/page-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestType } from 'src/app/enum/quest-type.enum';
import { BabyLibModel, BabyLibSearchInfo, QuestionLibModel, QuestionLibSearchInfo } from 'src/app/view-model/baby-lib.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';

@Component({
  selector: 'app-baby-lib',
  templateUrl: './baby-lib.component.html',
  styleUrls: ['./baby-lib.component.less'],
  providers: [BabyInfoBusiness]
})
export class BabyLibComponent implements OnInit {


  dataSource: QuestionLibModel[] = [];


  questType: QuestType = QuestType.ASQ3;

  fileType = 'personal';
  searchInfo: QuestionLibSearchInfo = {
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
    QuestType: this.questType
  }

  // Paginator
  page: Page | null = null;
  pageIndex = 1;
  pageSize = 9;
  user:any = null;
  doctor:any = null;


  showToast = false;

  constructor(private _business: BabyInfoBusiness, private _router: Router, private _sessionStorage: SessionStorageService) { 

  }

  async ngOnInit() {
    this.user = this._sessionStorage.user;
    this.doctor = this._sessionStorage.doctor;

    if (this.doctor && this.fileType == 'personal') {

      this.chooseFather(0);

    }

  }

  async chooseFather(num:number){
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
    console.log('chooseFather',res);
    this.searchInfo.Name = '';
    this.page = res.Page;
    this.dataSource = res.Data;
  }

  chooseReport(e:Event,num:number){
    let thisUid = (e.target as HTMLInputElement).getAttribute('Uid');
    let thisDid = (e.target as HTMLInputElement).getAttribute('Did');
    let thisBid = (e.target as HTMLInputElement).getAttribute('Bid');
    let thisQid = (e.target as HTMLInputElement).getAttribute('Qid');
    console.log('thisUid',thisUid);
    if(num == 0){
      window.open('/#/asq3print?type=1&uid='+thisUid+'&did='+thisDid+'&bid='+thisBid+'&qid='+thisQid,'_blank')
    }else{
      window.open('/#/asq3print?type=2&uid='+thisUid+'&did='+thisDid+'&bid='+thisBid+'&qid='+thisQid,'_blank')
    }
  }

  searchEvent(value:string){
    console.log('searchEvent',value);
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
    console.log('changeStatus',res);
  }

  async searchCondition(params:any){

    this.searchInfo.Uid = this.user.Id;
    this.searchInfo.BeginTime = params.BeginTime;
    this.searchInfo.EndTime = params.EndTime;
    this.searchInfo.QuestMonth = params.QuestMonth;
    this.searchInfo.Dids = params.Dids;
    this.searchInfo.Status = params.Status;
    //this.searchInfo.Uid = '';

    let res = await this._business.init(this.searchInfo);
    if(res){
      
      this.page = res.Page;
      this.dataSource = res.Data;

      this.searchInfo.Name = '';
      this.searchInfo.Dids = '';
      this.searchInfo.Status = 3;
      this.searchInfo.BeginTime = '';
      this.searchInfo.EndTime = '';
      this.searchInfo.QuestMonth = '';

      this.closeEvent();
    }
    

    console.log('searchCondition', this.searchInfo,res);
  }

  test(num:number){
    console.log('test',num);
  }

  pageEvent(pageInfo: PageEvent) {
    // if (this.pageIndex == pageInfo.pageIndex + 1) return;
    // this.pageIndex = pageInfo.pageIndex + 1;
    // this._init();
    console.log(pageInfo)
  }
  closeEvent() {
    this.showToast = false;
  }
  filterHandler() {
    this.showToast = !this.showToast;
  }
  addBabyHandler() {
    this._router.navigateByUrl('/neoballoon/neoballoon-manage/baby-add-manage')
  }
}

