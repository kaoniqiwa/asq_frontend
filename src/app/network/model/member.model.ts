import { BabyModel } from "./baby.model";

export class MemberModel {
  id!: string;
  name!: string;
  gender!: string;
  phone!: string;
  email!: string;
  post_code?: string;
  address?: string;
  survey_left?: number;
  create_time?: string;
  update_time?: string;
  babys!: BabyModel[];
  flow?: string;
}