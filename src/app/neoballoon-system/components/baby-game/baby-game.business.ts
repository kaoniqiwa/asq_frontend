import { Injectable } from "@angular/core";
import { ASQ3_DATA, ASQ_SE2_DATA } from "./baby-game.data";

@Injectable()
export class BabyGameBusiness {
  constructor() {

  }
  getAsq3Data() {
    return ASQ3_DATA;
  }
  getAsqSe2Data() {
    return ASQ_SE2_DATA;
  }
}