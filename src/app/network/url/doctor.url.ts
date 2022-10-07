import { BaseASQUrl } from "./base.url";

export class DoctorUrl {
  static get basic() {
    return `${BaseASQUrl}/doctor`;
  }

  static create() {
    return `${this.basic}.php`;
  }
  static list() {
    return `${this.basic}.php`;
  }
  static get(id: string) {
    return `${this.basic}.php?Id=${id}`
  }
  static delete() {
    return `${this.basic}.php`;
  }
  static update() {
    return `${this.basic}.php`;
  }

}