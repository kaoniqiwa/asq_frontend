import { Injectable } from "@angular/core";
import { QuestionModel } from "src/app/network/model/question.model";
import { QuestionRequestService } from "src/app/network/request/question/question.service";

@Injectable()
export class ASQ3QuestionBusiness {
  constructor(private questionRequest: QuestionRequestService) {

  }
  create(model: QuestionModel) {
    return this.questionRequest.create(model);
  }
}