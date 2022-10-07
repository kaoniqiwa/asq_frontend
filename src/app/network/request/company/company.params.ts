import { PagedParams } from "../IParams.interface";

export class GetCompanyParams extends PagedParams {
  Ids?: string[];
  Name?: string;
  BeginTime?: Date;
  EndTime?: Date;
  Flow!: string;
}