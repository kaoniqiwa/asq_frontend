import { Gender } from "src/app/enum/gender.enum";
import { IdentityType } from "src/app/enum/identity-type.enum";

export class Baby {
  Id!: string;
  Mid!: string;
  Name!: string;
  Gender!: Gender;
  Birthday!: string;
  SurveyTime!: string;
  Premature!: string;
  Prematureweek?: string;
  Prematureday?: string;
  Rectifyage?: any;
  IsShun!: string;
  IdentityInfo?: string;
  IdentityType?: IdentityType;
  Weight?: string;
  IsChanqian?: string;
  IsMulti?: string;
  OtherAbnormal?: string;
  Isanswer:any;
  CreateTime?: string;
  UpdateTime?: string;
  Flow?: string;

}