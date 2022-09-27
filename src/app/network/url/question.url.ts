import { BaseASQUrl } from "./base.url";

export class QuestionUrl {
  static get basic() {
    return `${BaseASQUrl}/question`;
  }

  static create() {
    return `${this.basic}.php`;
  }
  static list() {
    return `${this.basic}.php`;
  }
  static get() {
    return `${this.basic}.php?`;
  }
  static delete() {
    return `${this.basic}.php`;
  }
  static update() {
    return `${this.basic}.php`;
  }

}