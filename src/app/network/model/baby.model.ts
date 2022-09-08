import { Gender } from "src/app/enum/gender.enum";

export class BabyModel {
  id!: string;
  mid!: string;
  m_name!: string;
  name!: string;
  gender!: Gender;
  birthday!: string;
  survey_time!: string;
  premature!: string;
  create_time!: string;
  update_time!: string;
  flow?: string;

}