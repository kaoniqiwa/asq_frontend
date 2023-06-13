import { BaseASQUrl } from "./base.url";

export class CompanyUrl {
  static get basic() {
    return `${BaseASQUrl}/company`;
  }

  static get code() {
    return `${BaseASQUrl}/captcha`;
  }

  static create() {
    return `${this.basic}.php`;
  }
  static list() {
    return `${this.basic}.php`;
  }
  static getCode(rand:any) {
    return `${this.code}.php?r=${rand}`
  }
  static checkCode() {
    return `${this.basic}.php`
  }
  static get(id: string) {
    return `${this.basic}.php?Id=${id}`
  }
  static sendSms() {
    return `${this.basic}.php`
  }
  static delete() {
    return `${this.basic}.php`;
  }
  static update() {
    return `${this.basic}.php`;
  }
  static export() {
    return `${this.basic}.php`;
  }
  static getUuid() {
    return `${this.basic}.php`;
  }
}