import { Injectable } from "@angular/core";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { SurveyBtnModel } from "src/app/view-model/survey-manage.model";

@Injectable()
export class SurveyManageBusiness {
  constructor(private _babyRequest: BabyRequestService) { }

  listBaby() {
    return this._babyRequest.list();
  }
  getBaby(id: string) {
    return this._babyRequest.get(id)
  }
}
