import { Injectable } from "@angular/core";
import { BabyModel } from "src/app/network/model/baby.model";
import { MemberModel } from "src/app/network/model/member.model";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { MemberRequestService } from "src/app/network/request/member/member.service";

@Injectable()
export class BabyInfoManageBusiness {
  constructor(private _memberRequest: MemberRequestService, private _babyRequest: BabyRequestService) {

  }
  addMember(member: MemberModel) {
    return this._memberRequest.create(member)
  }
  addBaby(baby: BabyModel) {
    return this._babyRequest.create(baby);
  }

}