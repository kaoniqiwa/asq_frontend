import { Injectable } from "@angular/core";
import { param } from "jquery";
import { GlobalStorageService } from "src/app/common/service/global-storage.service";
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

    let { Data: members } = await this._listMember(searchInfo.Dids)

    console.log(members);

    let params = new GetBabyParams();
    params.Name = searchInfo.Name;
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;

    let { Data: babys, Page } = await this._listBaby(params);
    let data = this._converter.iterateToModel(babys)

    let res: PagedList<BabyLibModel> = {
      Page: Page,
      Data: data,
    };

    return res;

  }

  private _listMember(dids: string[]) {
    let params = new GetMemberParams();
    params.Dids = dids;


    return this._memberRequest.list(params)
  }
  private _listBaby(params: GetBabyParams) {
    // params.Mid

    return this._babyRequest.list(params);

  }
  private _listQuestion(params: GetQuestionParams) {
    return this._questionRequest.list(params);
  }

}

