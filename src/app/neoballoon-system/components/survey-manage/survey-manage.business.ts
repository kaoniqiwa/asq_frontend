import { Injectable } from "@angular/core";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { QuestionRequestService } from "src/app/network/request/question/question.service";
import { QuestionModel } from "src/app/view-model/question.model";
import { SurveyBtnModel } from "src/app/view-model/survey-manage.model";

@Injectable()
export class SurveyManageBusiness {
  constructor(private _babyRequest: BabyRequestService, private _questionRequest: QuestionRequestService) { }

  listBaby() {
    return this._babyRequest.list();
  }
  getBaby(id: string) {
    return this._babyRequest.get(id)
  }
  create(model: QuestionModel) {
    return this._questionRequest.create(model);
  }
}
