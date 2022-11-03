import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { param } from "jquery";
import { GlobalStorageService } from "src/app/common/service/global-storage.service";
import { QuestType } from "src/app/enum/quest-type.enum";
import { Page, PagedList } from "src/app/network/model/page-list.model";
import { GetBabyParams } from "src/app/network/request/baby/baby.params";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { GetMemberParams } from "src/app/network/request/member/member.params";
import { MemberRequestService } from "src/app/network/request/member/member.service";
import { GetQuestionParams } from "src/app/network/request/question/question.params";
import { QuestionRequestService } from "src/app/network/request/question/question.service";
import { BabyLibModel, BabyLibSearchInfo, QuestionLibModel, QuestionLibSearchInfo } from "src/app/view-model/baby-lib.model";

@Injectable()
export class BabyReportBusiness {

  asq3mouthArr: any = [2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60];
  mouthArr:any = [];

  constructor(private _babyRequest: BabyRequestService,private _MemberRequest: MemberRequestService, private _questionRequest: QuestionRequestService, private _memberRequest: MemberRequestService,private _userRequest: CompanyRequestService) {

   

  }

  getQuestionByBaby(params: GetQuestionParams) {
    return this._questionRequest.getQuestionByBaby(params);
  }

  getBaby(id: string) {
    return this._babyRequest.get(id)
  }

  getMember(id: string) {
    return this._MemberRequest.get(id)
  }
  

  async init(searchInfo: QuestionLibSearchInfo) {

    let models: QuestionLibModel[] = [];
    let page: Page = {
      PageIndex: 0,
      PageSize: 0,
      RecordCount: 0,
      TotalRecordCount: 0,
      PageCount: 0,
    };
    let res = {
      Data: models,
      Page: page
    }
    //console.log('questions1',searchInfo.Uid, searchInfo.Did, searchInfo.QuestType, searchInfo.QuestMonth,searchInfo.PageIndex,searchInfo.PageSize);
    //let { Data: questions, Page } = await this._listQuestion(searchInfo.Uid, searchInfo.Dids, searchInfo.QuestType, searchInfo.QuestMonth,searchInfo.PageIndex,searchInfo.PageSize,searchInfo.Name);
    let { Data: questions, Page } = await this._questionRequest.list(searchInfo);
    res.Page = Page;
    //console.log('questions2',questions);
    for (let i = 0; i < questions.length; i++) {
      let model = new QuestionLibModel();

      let question:any = questions[i];
      if (question) {
        model.Id = question.Id;
        model.Uid = question.Cid;
        model.Did = question.Did;
        model.Bid = question.Bid;
        model.Name = question.Name;
        model.Mname = question.Mname;
        model.Status = question.Status;
        model.Birthday = formatDate(question.Birthday, 'yyyy-MM-dd', 'en');
        model.SurveyTime = formatDate(question.SurveyTime, 'yyyy-MM-dd', 'en');
        model.QuestMonth = this.mouthArr[question.QuestMonth];
        res.Data.push(model)
      }
    }

    return res;
  }

  async getUser(id: string) {
    return this._userRequest.get(id)
  }

  async changeStatus(params:any) {
    return await this._questionRequest.changeStatus(params);
  }

  
  private _listMember(dids: string[]) {
    let params = new GetMemberParams();
    params.Dids = dids

    return this._memberRequest.list(params)
  }
  private _listBaby(mids: string[], name: string) {

    let params: GetBabyParams = new GetBabyParams();
    params.Mids = mids;
    params.Name = name;
    return this._babyRequest.list(params);

  }
  private _listQuestion(Uid: string, Dids: [], questType: QuestType, questMonth = "0",PageIndex:number,PageSize:number,Name:string) {
    let params: GetQuestionParams = new GetQuestionParams();
    params.Dids = Dids;
    params.Uid = Uid;
    params.Name = Name;
    params.PageIndex = PageIndex;
    params.PageSize = PageSize;
    params.QuestType = questType;
    params.QuestMonth = questMonth;
    return this._questionRequest.list(params);
  }

}

