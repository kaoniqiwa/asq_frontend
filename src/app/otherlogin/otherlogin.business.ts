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
export class OtherloginBusiness {
  constructor(private _userRequest: CompanyRequestService,private _memberRequest: MemberRequestService,private _doctorRequest: DoctorRequestService,private _babyRequest: BabyRequestService, private _questionRequest: QuestionRequestService) { }

  getUser(id: string) {
    return this._userRequest.get(id)
  }

  getUserBySeq(params:any) {

    return this._userRequest.getUserBySeq(params);
  }

  sendSms(params:any) {
    return this._userRequest.sendSms(params);
  }
  getStatus(params:any) {
    return this._userRequest.getStatus(params);
  }
  checkUuid(params:any) {
    return this._userRequest.checkUuid(params);
  }

  getDoctor(id: string) {
    return this._doctorRequest.get(id)
  }
  getDoctorBySeq(params:any) {
    return this._doctorRequest.getDoctorBySeq(params);
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
  getMember( phone: string) {

    let params:any = {};
    params.Phone = phone;

    return this._memberRequest.list(params);

  }
  
}
