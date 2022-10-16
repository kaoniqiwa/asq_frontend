import { BaseASQUrl } from "./base.url";

export class GamesUrl {
  static get basic() {
    return `${BaseASQUrl}/games`;
  }

  static list() {
    return `${this.basic}.php`;
  }

  static listDividing() {
    return `${this.basic}.php`;
  }
 

}