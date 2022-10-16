import { Injectable } from "@angular/core";
import { Question } from "src/app/network/model/question.model";
import { GetDividingParams } from "src/app/network/request/games/dividing.params";
import { GetGamesParams } from "src/app/network/request/games/games.params";
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
  getGames(testId:string) {
    let params = new GetGamesParams();
    params.TestId = testId;
    return this.questionRequest.getGames(params);
  }
  getDividing(testId:string) {
    let params = new GetDividingParams();
    params.TestId = testId;
    return this.questionRequest.getDividing(params);
  }
}