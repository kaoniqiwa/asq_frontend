import { PagedParams } from "../IParams.interface";

export class GetBabyParams extends PagedParams {
  Name?: string;
  Ids?: string[];
  Mids!: string[];
  Flow!: string;
}