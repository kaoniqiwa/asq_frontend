import { Injectable } from "@angular/core";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { QuestionRequestService } from "src/app/network/request/question/question.service";
import { Question } from "src/app/network/model/question.model";
import { SurveyBtnModel } from "src/app/view-model/survey-manage.model";
import { GetBabyParams } from "src/app/network/request/baby/baby.params";

@Injectable()
export class SurveyManageBusiness {
  constructor(private _babyRequest: BabyRequestService, private _questionRequest: QuestionRequestService) { }

  listBaby(mid: string) {
    let params = new GetBabyParams();
    params.Mid = mid;
    return this._babyRequest.list(params);
  }
  getBaby(id: string) {
    return this._babyRequest.get(id)
  }
  create(model: Question) {
    return this._questionRequest.create(model);
  }
}
