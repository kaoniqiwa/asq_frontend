import { Injectable } from "@angular/core";
import { MemberModel } from "../../model/member.model";
import { MemberUrl } from "../../url/member.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetMemberParams } from "./member.params";

@Injectable({
  providedIn: 'root'
})
export class MemberRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<MemberModel>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(MemberModel);
  }

  list(params: GetMemberParams = new GetMemberParams()) {
    params.flow = 'listMember';
    return this.type.paged(MemberUrl.list(), params)
  }
  create(model: MemberModel) {
    model.flow = 'addMember';
    return this.type.post(MemberUrl.create(), model);
  }
  get(id: string) {
    return this.type.get(MemberUrl.get(id));
  }
  delete(params: GetMemberParams = new GetMemberParams()) {
    params.flow = 'deleteMember';
    return this.type.post(MemberUrl.delete(), params)

  }
  update(model: MemberModel) {
    model.flow = 'editMember';
    return this.type.post(MemberUrl.update(), model)
  }
  export(params: GetMemberParams = new GetMemberParams()) {
    params.flow = 'exportMember';
    return this.type.postArray(MemberUrl.export(), params)
  }


}