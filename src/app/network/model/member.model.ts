import { EducateDegree } from "src/app/enum/educate-degree.enum";
import { MemberRelation } from "src/app/enum/member-role.enum";
import { Baby } from "./baby.model";

export class Member {
  Id!: string;
  Did!: string;
  Name!: string;
  Phone!: string;
  Relation!: MemberRelation;
  Province?: string;
  City?: string;
  County?: string;
  Email?: string;
  PostCode?: string;
  Address?: string;
  MotherJob?: string;
  FatherJob?: string;
  MotherDegree?: EducateDegree;
  FatherDegree?: EducateDegree;
  OtherDegree?: EducateDegree;
  MotherBirth?: string;
  FatherBirth?: string;
  CreateTime?: string;
  UpdateTime?: string;
  IsHelp?: string;
  HelpInfo?: string;
  Flow?: string;
}