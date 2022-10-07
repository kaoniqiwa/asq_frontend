import { PagedParams } from "../IParams.interface";

export class GetInformParams extends PagedParams {
  Content?: string;
  Id?: string;
  Flow!: string;
}