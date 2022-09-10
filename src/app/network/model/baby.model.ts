import { Gender } from "src/app/enum/gender.enum";
import { IdentityType } from "src/app/enum/identity-type.enum";

export class BabyModel {
  id!: string;
  mid!: string;
  name!: string;
  gender!: Gender;
  birthday!: string;
  survey_time!: string;
  premature!: boolean;
  is_shun!: boolean;
  identity_info?: string;
  identity_type?: IdentityType;
  weight?: string;
  is_help?: boolean;
  is_multi?: boolean;
  other_abnormal?: string;
  create_time?: string;
  update_time?: string;
  flow?: string;

}