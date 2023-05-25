import { Injectable } from "@angular/core";
import { GetMemberParams } from "src/app/network/request/member/member.params";
import { MemberRequestService } from "src/app/network/request/member/member.service";
import { LocalStorageService } from "../../service/local-storage.service";

@Injectable()
export class BabyInMemberBusiness {

  constructor(private _memberRequest: MemberRequestService,) {

  }
  getMember( phone: string) {

    let params:any = {};
    params.Phone = phone;
    //params.Dids = [did]

    return this._memberRequest.list(params);

  }
}