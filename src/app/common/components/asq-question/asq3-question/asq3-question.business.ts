import { Injectable } from "@angular/core";
import { QuestionRequestService } from "src/app/network/request/question/question.service";
import { QuestionModel } from "src/app/view-model/question.model";

@Injectable()
export class ASQ3QuestionBusiness {
  constructor(private questionRequest: QuestionRequestService) {

  }
  create(model: QuestionModel) {
    return this.questionRequest.create(model);
  }
}