import { Injectable } from "@angular/core";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { Doctor } from "../../model/doctor.model";
import { DoctorUrl } from "../../url/doctor.url";
import { GetQuestionParams } from "./question.params";
import { Question } from "src/app/network/model/question.model";
import { QuestionUrl } from "../../url/question.url";

@Injectable({
  providedIn: 'root'
})
export class QuestionRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Question>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Question);
  }

  create(model: Question) {
    model.Flow = 'addQuestion';
    return this.type.post(QuestionUrl.create(), model);
  }
  list(params: GetQuestionParams = new GetQuestionParams()) {
    params.Flow = 'listQuestion';
    return this.type.paged(QuestionUrl.list(), params)
  }
  getQuestion(params: GetQuestionParams = new GetQuestionParams()) {
    params.Flow = 'getQuestion';
    return this.type.post(QuestionUrl.get(), params);
  }

}