import { Injectable } from "@angular/core";
import { Doctor } from "../../model/doctor.model";
import { DoctorUrl } from "../../url/doctor.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetDoctorParams } from "./doctor.params";

@Injectable({
  providedIn: 'root'
})
export class DoctorRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Doctor>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Doctor);
  }

  create(model: Doctor) {
    model.Flow = 'addDoctor';
    return this.type.post(DoctorUrl.create(), model);
  }
  list(params: GetDoctorParams = new GetDoctorParams()) {
    params.Flow = 'listDoctor';
    return this.type.paged(DoctorUrl.list(), params)
  }

  delete(params: GetDoctorParams = new GetDoctorParams()) {
    params.Flow = 'deleteDoctor';
    return this.type.post(DoctorUrl.delete(), params)
  }
  get(id: string) {
    return this.type.get(DoctorUrl.get(id));
  }

  update(model: Doctor) {
    model.Flow = 'editDoctor';
    return this.type.post(DoctorUrl.update(), model)

  }


}