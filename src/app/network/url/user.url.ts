/*
 * @Author: pmx
 * @Date: 2021-09-13 15:05:27
 * @Last Modified by: pmx
 * @Last Modified time: 2022-07-30 21:39:49
 */

import { BaseUserUrl } from "./base.url";


export class UserUrl {
  static basic() {
    return `${BaseUserUrl}/Users`;
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
