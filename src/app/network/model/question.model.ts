import { QuestType } from "../../enum/quest-type.enum";

export class Question {
  Id!: string;
  Bid!: string;
  QuestType!: QuestType;
  QuestMonth!: string;
  QuestResult!: string;
  QuestScore!: string;
  ZongHe?:string;
  Source!:string;
  CreateTime?: string;
  UpdateTime?: string;
  Flow?: string;
}