import { Injectable } from "@angular/core";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { QuestionRequestService } from "src/app/network/request/question/question.service";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { DoctorRequestService } from "src/app/network/request/doctor/doctor.service";
import { GetGamesParams } from "src/app/network/request/games/games.params";

@Injectable()
export class MloginBusiness {
  constructor(private _userRequest: CompanyRequestService,private _doctorRequest: DoctorRequestService,private _babyRequest: BabyRequestService, private _questionRequest: QuestionRequestService) { }

  getUser(id: string) {
    return this._userRequest.get(id)
  }

  getDoctor(id: string) {
    return this._doctorRequest.get(id)
  }

  getBaby(id: string) {
    return this._babyRequest.get(id)
  }

  getQuestion(id: string) {
    return this._questionRequest.get(id)
  }

  getGames(testId:string) {
    let params = new GetGamesParams();
    params.TestId = testId;
    return this._questionRequest.getGames(params);
  }
  
}
