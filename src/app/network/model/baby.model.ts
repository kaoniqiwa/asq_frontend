import { Gender } from "src/app/enum/gender.enum";
import { IdentityType } from "src/app/enum/identity-type.enum";

export class Baby {
  Id!: string;
  Mid!: string;
  Name!: string;
  Gender!: Gender;
  Relation!: string;
  Birthday!: string;
  SurveyTime!: string;
  Premature!: boolean;
  IsShun!: boolean;
  IdentityInfo?: string;
  IdentityType?: IdentityType;
  Weight?: string;
  IsHelp?: boolean;
  IsMulti?: boolean;
  OtherAbnormal?: string;
  CreateTime?: string;
  UpdateTime?: string;
  Flow?: string;

}