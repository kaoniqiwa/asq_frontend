import { QuestType } from "src/app/enum/quest-type.enum";

export class GetQuestionParams {
  PageIndex?: number;
  PageSize?: number;
  Ids?: string[];
  Bids?: string[];
  QuestType?: QuestType;
  QuestMonth?: string;
  Flow!: string;
}