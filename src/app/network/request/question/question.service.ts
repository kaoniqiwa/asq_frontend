import { Injectable } from "@angular/core";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { DoctorModel } from "../../model/doctor.model";
import { DoctorUrl } from "../../url/doctor.url";
import { GetQuestionParams } from "./question.params";
import { QuestionModel } from "src/app/network/model/question.model";
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
    model.Flow = 'addQuestion';
    return this.type.post(QuestionUrl.create(), model);
  }
  list(params: GetQuestionParams = new GetQuestionParams()) {
    params.Flow = 'listQuestion';
    return this.type.postArray(QuestionUrl.list(), params)
  }
  getQuestion(params: GetQuestionParams = new GetQuestionParams()) {
    params.Flow = 'getQuestion';
    return this.type.post(QuestionUrl.get(), params);
  }

}