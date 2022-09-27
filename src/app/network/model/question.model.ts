import { QuestType } from "../../enum/quest-type.enum";

export class QuestionModel {
  Id!: string;
  Bid!: string;
  QuestType!: QuestType;
  QuestMonth!: string;
  QuestResult!: Array<any>;
  CreateTime?: string;
  UpdateTime?: string;
  Flow?: string;
}