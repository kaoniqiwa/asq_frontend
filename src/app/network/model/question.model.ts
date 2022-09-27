import { QuestType } from "../../enum/quest-type.enum";

export class QuestionModel {
  Id!: string;
  Bid!: string;
  QuestType!: QuestType;
  QuestMonth!: string;
  QuestResult!: Array<any>;
  QuestScore!: string;
  CreateTime?: string;
  UpdateTime?: string;
  Flow?: string;
}