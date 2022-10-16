import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { param } from "jquery";
import { GlobalStorageService } from "src/app/common/service/global-storage.service";
import { QuestType } from "src/app/enum/quest-type.enum";
import { Page, PagedList } from "src/app/network/model/page-list.model";
import { GetBabyParams } from "src/app/network/request/baby/baby.params";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { GetMemberParams } from "src/app/network/request/member/member.params";
import { MemberRequestService } from "src/app/network/request/member/member.service";
import { GetQuestionParams } from "src/app/network/request/question/question.params";
import { QuestionRequestService } from "src/app/network/request/question/question.service";
import { BabyLibModel, BabyLibSearchInfo } from "src/app/view-model/baby-lib.model";
import { BabyLibConverter } from "./baby-lib.converter";

@Injectable()
export class BabyManageBusiness {

  constructor(private _babyRequest: BabyRequestService, private _questionRequest: QuestionRequestService, private _memberRequest: MemberRequestService, private _converter: BabyLibConverter) {

  }
  async init(searchInfo: BabyLibSearchInfo) {

    // let { Data: questions, Page } = await this._listQuestion(searchInfo.QuestType, searchInfo.QuestMonth)
    // console.log(questions)
    // let babyIds = questions.map(question => question.Bid);
    // let { Data: babys } = await this._listBaby(babyIds);

    // let mids = babys.map(baby => baby.Mid);

    // let res = await this._listMember(mids)

    let models: BabyLibModel[] = [];
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

    let { Data: members } = await this._listMember(searchInfo.Dids);

    if (members.length) {
      searchInfo.Mids = members.map(member => member.Id);

      let { Data: babys } = await this._listBaby(searchInfo.Mids, searchInfo.Name)
      console.log(babys)

      if (babys.length) {
        searchInfo.Bids = babys.map(baby => baby.Id)

        let { Data: questions, Page } = await this._listQuestion(searchInfo.Bids, searchInfo.QuestType, searchInfo.QuestMonth);

        console.log(questions)
        res.Page = Page

        for (let i = 0; i < questions.length; i++) {
          let model = new BabyLibModel();

          let question = questions[i];
          let babyId = question.Bid;
          let baby = babys.find(baby => baby.Id == babyId)
          console.log(baby)
          if (baby) {
            model.Id = baby.Id;
            model.Name = baby.Name;
            model.Birthday = formatDate(baby.Birthday, 'yyyy-MM-dd', 'en');
            model.SurveyTime = formatDate(baby.SurveyTime, 'yyyy-MM-dd', 'en');
            model.FileId = question.Id;
            let member = members.find(member => member.Id == baby!.Mid)
            if (member) {
              model.Member = member;
            }
            res.Data.push(model)
          }
        }
      }


    }





    return res;
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
  private _listQuestion(bids: string[], questType: QuestType, questMonth = "0") {
    let params: GetQuestionParams = new GetQuestionParams();
    params.Bids = bids;
    params.QuestType = questType;
    params.QuestMonth = questMonth;
    return this._questionRequest.list(params);
  }

}

