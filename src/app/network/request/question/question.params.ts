import { QuestType } from "src/app/enum/quest-type.enum";

export class GetQuestionParams {
  PageIndex?: number;
  PageSize?: number;
  Ids?: string[];
  Bid?: string;
  Uid?: string;
  Did?: string;
  Name?:string;
  Dids?: string[];
  Bids?: string[];
  QuestType?: QuestType;
  QuestMonth?: string;
  SurveyTime?:string;
  Flow!: string;
}