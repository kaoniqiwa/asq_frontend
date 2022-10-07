import { PagedParams } from "../IParams.interface";

export class GetDoctorParams extends PagedParams {
  Name?: string;
  Ids?: string[];
  Cids?: string[];
  Flow!: string;
}