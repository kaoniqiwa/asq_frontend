import { Injectable } from "@angular/core";
import { QuestType } from "src/app/enum/quest-type.enum";
import { Baby } from "src/app/network/model/baby.model";
import { Member } from "src/app/network/model/member.model";
import { Question } from "src/app/network/model/question.model";
import { GetBabyParams } from "src/app/network/request/baby/baby.params";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { GetMemberParams } from "src/app/network/request/member/member.params";
import { MemberRequestService } from "src/app/network/request/member/member.service";
import { GetQuestionParams } from "src/app/network/request/question/question.params";
import { QuestionRequestService } from "src/app/network/request/question/question.service";

@Injectable()
export class BabyInfoManageBusiness {
  constructor(private _memberRequest: MemberRequestService, private _babyRequest: BabyRequestService, private _questionRequest: QuestionRequestService,private _userRequest: CompanyRequestService) {

  }
  updateLeft(params:any) {
    return this._userRequest.updateLeft(params);
  }
  addMember(member: Member) {
    return this._memberRequest.create(member)
  }
  addBaby(baby: Baby) {
    return this._babyRequest.create(baby);
  }

  getMember(id: string) {
    return this._memberRequest.get(id)
  }

  getMemberByPhone(phone: any) {
    let params:any = {};
    params.Phone = phone;
    return this._memberRequest.list(params);
  }
  updateMember(member: Member) {
    return this._memberRequest.update(member);
  }
  updateBaby(baby: Baby) {
    this._babyRequest.update(baby);
  }
  deleteBaby(baby: Baby) {
    let params = new GetBabyParams();
    params.Ids = [baby.Id];
    return this._babyRequest.delete(params);

  }
  listBaby(mid: any) {
    let params:any = {};
    params.Mid = mid;
    return this._babyRequest.list(params);
  }
  listMember(phone:any) {
    let params:any = {};
    params.Phone = phone;

    return this._memberRequest.list(params);
  }
  createQuestion() {
    let model = new Question();
    model.Id = "";
    model.Bid = "a26584f8-aa79-48b9-8fee-906025cd983c";
    model.QuestType = QuestType.ASQ3;
    model.QuestMonth = "5";
    //model.QuestResult = JSON.stringify([{ "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": false }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }]);



    this._questionRequest.create(model)
  }


}