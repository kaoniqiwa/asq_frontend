import { Injectable } from "@angular/core";
import { QuestType } from "src/app/enum/quest-type.enum";
import { Baby } from "src/app/network/model/baby.model";
import { Member } from "src/app/network/model/member.model";
import { Question } from "src/app/network/model/question.model";
import { GetBabyParams } from "src/app/network/request/baby/baby.params";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { GetMemberParams } from "src/app/network/request/member/member.params";
import { MemberRequestService } from "src/app/network/request/member/member.service";
import { GetQuestionParams } from "src/app/network/request/question/question.params";
import { QuestionRequestService } from "src/app/network/request/question/question.service";

import { CompanyRequestService } from "src/app/network/request/company/company.service";

@Injectable()
export class BabyAddManageBusiness {
  constructor(private _memberRequest: MemberRequestService, private _babyRequest: BabyRequestService, private _questionRequest: QuestionRequestService,private _userRequest: CompanyRequestService) {

  }
  getUuid(params:any){
    return this._userRequest.getUuid(params);
  }
  

}