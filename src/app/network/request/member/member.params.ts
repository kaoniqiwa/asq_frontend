import { PagedParams } from "../IParams.interface";

export class GetMemberParams extends PagedParams {
  Ids?: string[];
  Dids?: string[];
  Name?: string;
  Phones?: string[];
  BeginTime?: Date;
  EndTime?: Date;
  Flow!: string;
}