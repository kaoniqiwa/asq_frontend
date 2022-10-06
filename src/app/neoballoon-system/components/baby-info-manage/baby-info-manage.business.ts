import { Injectable } from "@angular/core";
import { QuestType } from "src/app/enum/quest-type.enum";
import { Baby } from "src/app/network/model/baby.model";
import { Member } from "src/app/network/model/member.model";
import { Question } from "src/app/network/model/question.model";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { MemberRequestService } from "src/app/network/request/member/member.service";
import { GetQuestionParams } from "src/app/network/request/question/question.params";
import { QuestionRequestService } from "src/app/network/request/question/question.service";

@Injectable()
export class BabyInfoManageBusiness {
  constructor(private memberRequest: MemberRequestService, private babyRequest: BabyRequestService, private questionRequest: QuestionRequestService) {

  }
  addMember(member: Member) {
    return this.memberRequest.create(member)
  }
  addBaby(baby: Baby) {
    return this.babyRequest.create(baby);
  }

  getQuestion() {
    let params = new GetQuestionParams();
    params.Bid = "a26584f8-aa79-48b9-8fee-906025cd983c";
    params.QuestType = "asq3";
    // params.questMonth = "0";
    return this.questionRequest.getQuestion(params);
  }
  createQuestion() {
    let model = new Question();
    model.Id = "";
    model.Bid = "a26584f8-aa79-48b9-8fee-906025cd983c";
    model.QuestType = QuestType.ASQ3;
    model.QuestMonth = "5";
    model.QuestResult = [{ "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": false }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }, { "answer": ["1", "1", "1", "1", "1", "1"], "nextStatus": true, "prevStatus": true }];



    this.questionRequest.create(model)
  }


}