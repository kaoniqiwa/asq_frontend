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
  getSurvey() {
    let data: SurveyBtnModel[] = [
      {
        title: "年龄与发育进程问卷——第三版",
        normalIcon: "ASQ-3_1.png",
        activeIcon: "ASQ-3_2.png",

      },
      {
        title: "年龄与发育进程问卷：社交——情绪",
        normalIcon: "ASQ-SE_1.png",
        activeIcon: "ASQ-SE_2.png",

      },
      {
        title: "年龄与发育进程问卷——第三版",
        normalIcon: "ASQ-SE_1.png",
        activeIcon: "ASQ-SE_2.png",
        version: "-2及其联结"
      }
    ]

    return data;

  }
}
