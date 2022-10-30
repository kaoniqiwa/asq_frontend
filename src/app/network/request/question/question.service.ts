import { Injectable } from "@angular/core";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { Doctor } from "../../model/doctor.model";
import { DoctorUrl } from "../../url/doctor.url";
import { GetQuestionParams } from "./question.params";
import { Question } from "src/app/network/model/question.model";
import { QuestionUrl } from "../../url/question.url";
import { GetGamesParams } from "../games/games.params";
import { GamesUrl } from "../../url/games.url";
import { GetDividingParams } from "../games/dividing.params";
import { Games } from "../../model/games.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Question>;
  private gamesType: BaseTypeRequestService<Games>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Question);
    this.gamesType = this.basic.type(Games);
  }

  changeStatus(params:any){
    params.Flow = 'changeStatus';
    return this.type.post(QuestionUrl.create(), params);
  }
  create(model: Question) {
    model.Flow = 'addQuestion';
    return this.type.post(QuestionUrl.create(), model);
  }
  list(params: GetQuestionParams = new GetQuestionParams()) {
    params.Flow = 'listQuestion';
    return this.type.paged(QuestionUrl.list(), params)
  }//getQuestionByBaby
  getQuestion(params: GetQuestionParams = new GetQuestionParams()) {
    params.Flow = 'getQuestion';
    return this.type.post(QuestionUrl.getQ(), params);
  }
  getQuestionByBaby(params: GetQuestionParams = new GetQuestionParams()) {
    params.Flow = 'getQuestionByBaby';
    return this.type.post(QuestionUrl.getQ(), params);
  }
  get(id:string) {
    return this.type.get(QuestionUrl.get(id) );
  }
  getGames(params:GetGamesParams = new GetGamesParams()) {
    params.Flow = 'getGames';
    return this.gamesType.paged(GamesUrl.list(), params);
  }
  getDividing(params:GetDividingParams = new GetDividingParams()) {
    params.Flow = 'getDividing';
    return this.gamesType.paged(GamesUrl.listDividing(), params);
  }

}