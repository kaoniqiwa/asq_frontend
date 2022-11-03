import { Injectable } from "@angular/core";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { QuestionRequestService } from "src/app/network/request/question/question.service";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { DoctorRequestService } from "src/app/network/request/doctor/doctor.service";
import { GetGamesParams } from "src/app/network/request/games/games.params";
import { param } from "jquery";
import { GetMemberParams } from "../network/request/member/member.params";
import { MemberRequestService } from "../network/request/member/member.service";

@Injectable()
export class MloginBusiness {
  constructor(private _userRequest: CompanyRequestService,private _memberRequest: MemberRequestService,private _doctorRequest: DoctorRequestService,private _babyRequest: BabyRequestService, private _questionRequest: QuestionRequestService) { }

  getUser(id: string) {
    return this._userRequest.get(id)
  }

  sendSms(params:any) {
    return this._userRequest.sendSms(params);
  }
  checkUuid(params:any) {
    return this._userRequest.checkUuid(params);
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
  getMember(did: string, phone: string) {

    let params = new GetMemberParams();
    params.Phones = [phone];
    params.Dids = [did]

    return this._memberRequest.list(params);

  }
  
}
