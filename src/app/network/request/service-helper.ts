/*
 * @Author: zzl
 * @Date: 2021-09-16 10:11:01
 * @Last Modified by: pmx
 * @Last Modified time: 2022-08-26 16:08:28
 */
import { ClassConstructor, plainToClass } from 'class-transformer';
import { HowellResponse } from '../model/howell-response.model';
import { PagedList } from '../model/page_list.model';

export class ServiceHelper {
  static ResponseProcess<T>(
    response: HowellResponse<PagedList<T>>,
    t: ClassConstructor<T>
  ): Promise<PagedList<T>>;
  static ResponseProcess<T>(
    response: HowellResponse<T>,
    t: ClassConstructor<T>
  ): Promise<T>;
  static ResponseProcess<T>(
    response: HowellResponse<T[]>,
    t: ClassConstructor<T>
  ): Promise<T[]>;

  static async ResponseProcess<T>(
    response: HowellResponse<T | T[] | PagedList<T>>,
    t: ClassConstructor<T>
  ) {
    // 如果返回码不为0
    if (response.faultCode != 0) {
      console.error(response.faultReason, response.innerException);
      throw new Error(response.faultReason);
    }
    if (response.data) {
      if ((response.data as PagedList<T>).page) {
        let result = response.data as PagedList<T>;
        result.data = plainToClass(
          t,
          (response.data as PagedList<T>).data
        ) as unknown as T[];
        return result;
      } else {
        return plainToClass(t, response.data);
      }

    }
    return plainToClass(t, response.data);;

  }
}
