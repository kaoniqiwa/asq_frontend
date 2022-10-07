import { Injectable } from "@angular/core";
import { Member } from "../../model/member.model";
import { MemberUrl } from "../../url/member.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetMemberParams } from "./member.params";

@Injectable({
  providedIn: 'root'
})
export class MemberRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Member>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Member);
  }

  list(params: GetMemberParams = new GetMemberParams()) {
    params.Flow = 'listMember';
    return this.type.paged(MemberUrl.list(), params)
  }
  create(model: Member) {
    model.Flow = 'addMember';
    return this.type.post(MemberUrl.create(), model);
  }
  get(id: string) {
    return this.type.get(MemberUrl.get(id));
  }
  delete(params: GetMemberParams = new GetMemberParams()) {
    params.Flow = 'deleteMember';
    return this.type.post(MemberUrl.delete(), params)

  }
  update(model: Member) {
    model.Flow = 'editMember';
    return this.type.post(MemberUrl.update(), model)
  }
  export(params: GetMemberParams = new GetMemberParams()) {
    params.Flow = 'exportMember';
    return this.type.postArray(MemberUrl.export(), params)
  }


}