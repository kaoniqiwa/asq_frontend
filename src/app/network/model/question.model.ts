import { QuestType } from "../../enum/quest-type.enum";

export class Question {
  Id!: string;
  Cid!: string;
  Did!: string;
  Mid!: string;
  Bid!: string;
  QuestType!: QuestType;
  QuestMonth!: string;
  //QuestResult!: string;
  QuestScore!: string;
  ZongHe?:string;
  Source!:any;
  SurveyTime!: string;
  CreateTime?: string;
  UpdateTime?: string;
  Flow?: string;
}