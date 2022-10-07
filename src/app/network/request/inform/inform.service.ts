import { Injectable } from "@angular/core";
import { Inform } from "../../model/inform.model";
import { InformUrl } from "../../url/inform.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetInformParams } from "./inform.params";

@Injectable({
  providedIn: 'root'
})
export class InformRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Inform>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Inform);
  }

  create(model: Inform) {
    model.Flow = 'addInform';
    return this.type.post(InformUrl.create(), model);
  }
  list(params: GetInformParams = new GetInformParams()) {
    params.Flow = 'listInform';
    return this.type.postArray(InformUrl.list(), params)
  }
  getLatestInform(params: GetInformParams = new GetInformParams()) {
    params.Flow = 'getLatestInform';
    return this.type.post(InformUrl.getLatest(), params)
  }

  delete(params: GetInformParams = new GetInformParams()) {
    params.Flow = 'deleteInform';
    return this.type.post(InformUrl.delete(), params)
  }


}