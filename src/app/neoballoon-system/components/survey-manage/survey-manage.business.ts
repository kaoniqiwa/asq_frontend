import { Injectable } from "@angular/core";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { QuestionRequestService } from "src/app/network/request/question/question.service";
import { Question } from "src/app/network/model/question.model";
import { SurveyBtnModel } from "src/app/view-model/survey-manage.model";
import { GetBabyParams } from "src/app/network/request/baby/baby.params";
import { GetQuestionParams } from "src/app/network/request/question/question.params";

@Injectable()
export class SurveyManageBusiness {
  constructor(private _babyRequest: BabyRequestService, private _questionRequest: QuestionRequestService) { }

  listBaby(mid: string) {
    let params = new GetBabyParams();
    params.Mids = [];
    mid && params.Mids.push(mid);
    return this._babyRequest.list(params);
  }
  getQuestionByBaby(params: GetQuestionParams) {
    return this._questionRequest.getQuestionByBaby(params);
  }
  getBaby(id: string) {
    return this._babyRequest.get(id)
  }
  create(model: Question) {
    return this._questionRequest.create(model);
  }
}
