import { QuestType } from "../enum/quest-type.enum";

export class SurveyBtnModel {
  normalIcon!: string;
  activeIcon!: string;
  content!: string;
  questType!: QuestType;
  subIcon?: string;
}
