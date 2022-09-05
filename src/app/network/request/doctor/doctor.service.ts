import { Injectable } from "@angular/core";
import { BaseRequestService, BaseTypeRequestService } from "../../base-request.service";
import { HowellAuthHttpService } from "../../howell-auth-http.service";
import { DoctorModel } from "../../model/doctor.model";
import { DoctorUrl } from "../../url/doctor.url";
import { GetDoctorParams } from "./doctor.params";

@Injectable({
  providedIn: 'root'
})
export class DoctorRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<DoctorModel>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(DoctorModel);
  }

  list(params: GetDoctorParams = new GetDoctorParams()) {
    params.flow = 'listDoctor';
    return this.type.postArray(DoctorUrl.list(), params)
  }

}