import { QuestType } from "../../enum/quest-type.enum";

export class Question {
  Id!: string;
  Bid!: string;
  QuestType!: QuestType;
  QuestMonth!: string;
  QuestResult!: Array<any>;
  QuestScore!: string;
  Source!:string;
  CreateTime?: string;
  UpdateTime?: string;
  Flow?: string;
}