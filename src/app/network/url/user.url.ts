/*
 * @Author: pmx
 * @Date: 2021-09-13 15:05:27
 * @Last Modified by: pmx
 * @Last Modified time: 2022-08-15 16:43:19
 */

import { BaseASQUrl } from "./base.url";


export class UserUrl {
  static basic() {
    return `${BaseASQUrl}/Users`;
  }
  static login(username: string): string {
    return `${this.basic()}/Login/${username}`;
  }

  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }


}
