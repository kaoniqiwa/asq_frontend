import { EducateDegree } from "src/app/enum/educate-degree.enum";
import { MemberRole } from "src/app/enum/member-role.enum";
import { BabyModel } from "./baby.model";

export class MemberModel {
  id!: string;
  did!: string;
  name!: string;
  phone!: string;
  member_role!: string;
  province?: string;
  city?: string;
  county?: string;
  email?: string;
  post_code?: string;
  address?: string;
  mother_job?: string;
  father_job?: string;
  mother_degree?: EducateDegree;
  father_degree?: EducateDegree;
  other_degree?: EducateDegree;
  mother_birth?: string;
  father_birth?: string;
  create_time?: string;
  update_time?: string;
  babys!: BabyModel[];
  flow?: string;
}