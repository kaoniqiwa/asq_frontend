import { Injectable } from "@angular/core";
import { Question } from "src/app/network/model/question.model";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { GetDividingParams } from "src/app/network/request/games/dividing.params";
import { GetGamesParams } from "src/app/network/request/games/games.params";
import { GetQuestionParams } from "src/app/network/request/question/question.params";
import { QuestionRequestService } from "src/app/network/request/question/question.service";

@Injectable()
export class ASQse2QuestionBusiness {
  constructor(private _questionRequest: QuestionRequestService,private _userRequest: CompanyRequestService) {

  }
  updateLeft(params:any) {
    return this._userRequest.updateLeft(params);
  }
  create(model: Question) {
    return this._questionRequest.create(model);
  }
  getQuestion(params: GetQuestionParams) {
    return this._questionRequest.getQuestion(params);
  }
  getQuestionsByMonth(params:any){
    return this._questionRequest.getQuestionsByMonth(params);
  }
  get(id:string) {
    return this._questionRequest.get(id);
  }

  getStatus(params:any) {
    return this._userRequest.getStatus(params);
  }
  checkUuid(params:any) {
    return this._userRequest.checkUuid(params);
  }
  
  getGames(testId:string) {
    let params = new GetGamesParams();
    params.TestId = testId;
    return this._questionRequest.getGames(params);
  }
  getDividing(testId:string,typeId:string) {
    let params = new GetDividingParams();
    params.TestId = testId;
    params.TypeId = typeId;
    return this._questionRequest.getDividing(params);
  }
}