import { Injectable } from "@angular/core";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { DoctorModel } from "../../model/doctor.model";
import { DoctorUrl } from "../../url/doctor.url";
import { GetQuestionParams } from "./question.params";
import { QuestionModel } from "src/app/view-model/question.model";
import { QuestionUrl } from "../../url/question.url";

@Injectable({
  providedIn: 'root'
})
export class QuestionRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<QuestionModel>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(QuestionModel);
  }

  create(model: QuestionModel) {
    model.flow = 'addQuestion';
    return this.type.post(QuestionUrl.create(), model);
  }
  list(params: GetQuestionParams = new GetQuestionParams()) {
    params.flow = 'listQuestion';
    return this.type.postArray(QuestionUrl.list(), params)
  }
  get(params: GetQuestionParams = new GetQuestionParams()) {

  }

}