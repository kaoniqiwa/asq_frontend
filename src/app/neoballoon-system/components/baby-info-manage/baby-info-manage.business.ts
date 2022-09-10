import { Injectable } from "@angular/core";
import { MemberModel } from "src/app/network/model/member.model";
import { MemberRequestService } from "src/app/network/request/member/member.service";

@Injectable()
export class BabyInfoManageBusiness {
  constructor(private _memberRequest: MemberRequestService) {

  }
  addMember(member: MemberModel) {
    return this._memberRequest.create(member)
  }

}