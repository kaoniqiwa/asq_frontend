import { QuestType } from "../../enum/quest-type.enum";

export class Question {
  Id!: string;
  Cid!: string;
  Cseq!:string;
  Did!: string;
  Dseq!:string;
  Mid!: string;
  Bid!: string;
  Mphone?:string;
  QuestType!: QuestType;
  QuestMonth!: string;
  //QuestResult!: string;
  QuestScore!: string;
  ZongHe?:string;
  Source!:any;
  Am!:any;
  seq?:any;
  uuid?:any;
  SurveyTime!: string;
  Rectifyage?:string;
  CreateTime?: string;
  UpdateTime?: string;
  Flow?: string;
}