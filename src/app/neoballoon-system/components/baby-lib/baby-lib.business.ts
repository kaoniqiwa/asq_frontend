import { Injectable } from "@angular/core";
import { GlobalStorageService } from "src/app/common/service/global-storage.service";
import { Page, PagedList } from "src/app/network/model/page-list.model";
import { GetBabyParams } from "src/app/network/request/baby/baby.params";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { GetQuestionParams } from "src/app/network/request/question/question.params";
import { QuestionRequestService } from "src/app/network/request/question/question.service";
import { BabyManageModel } from "src/app/view-model/baby-info.model";
import { BabyManageSearchInfo } from "src/app/view-model/baby-manage.model";

@Injectable()
export class BabyManageBusiness {

  constructor(private _babyRequest: BabyRequestService, private _questionRequest: QuestionRequestService, private _globalStorage: GlobalStorageService) {

  }
  async init(searchInfo: BabyManageSearchInfo, pageIndex = 1, pageSize = 9) {

    // let params = new GetQuestionParams();
    // params.PageIndex = pageIndex;
    // params.PageSize = pageSize;

    // let res = await this._listQuestion(params);

    // console.log(res);

    // let params = new GetBabyParams()
    // params.
  }

  private _listBaby() {

  }
  private _listQuestion(params: GetQuestionParams) {
    return this._questionRequest.list(params);
  }

}

