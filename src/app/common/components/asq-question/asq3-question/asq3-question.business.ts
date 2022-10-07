import { Injectable } from "@angular/core";
import { Question } from "src/app/network/model/question.model";
import { GetQuestionParams } from "src/app/network/request/question/question.params";
import { QuestionRequestService } from "src/app/network/request/question/question.service";

@Injectable()
export class ASQ3QuestionBusiness {
  constructor(private questionRequest: QuestionRequestService) {

  }
  create(model: Question) {
    return this.questionRequest.create(model);
  }
  getQuestion(params: GetQuestionParams) {
    return this.questionRequest.getQuestion(params);
  }
}