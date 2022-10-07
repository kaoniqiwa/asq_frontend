import { PagedParams } from "../IParams.interface";

export class GetOrderParams extends PagedParams {
  Ids?: string[];
  Phone?: string;
  BeginTime?: Date;
  EndTime?: Date;
  Flow!: string;
}