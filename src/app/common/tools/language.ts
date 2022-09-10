import { formatDate } from '@angular/common';
import { Flags } from 'src/app/common/tools/flags';
import { EducateDegree } from 'src/app/enum/educate-degree.enum';
import { IdentityType } from 'src/app/enum/identity-type.enum';
import { MemberRole } from 'src/app/enum/member-role.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import language from './language.json';


export class Language {


  static Week(day: number) {
    let name = ['日', '一', '二', '三', '四', '五', '六', '日'];
    return `周${name[day]}`;
  }

  static Date(date: Date) {
    return formatDate(date, 'yyyy年MM月dd日', 'en');
  }

  static Duration(begin: Date, end: Date) {
    return `${Language.Date(begin)} 至 ${Language.Date(end)}`;
  }


  static Time(time: Date | number, full = true) {
    let result = '';
    if (typeof time === 'number') {
      const hours = parseInt((time / 60).toString());
      const minutes = parseInt((Math.ceil(time) % 60).toString());

      result = hours ? hours + Language.json.Time.hour : '';

      if (full || !result) {
        result += minutes ? minutes + Language.json.Time.minute : '';
      }
    } else {
      let t = new Date(time.getTime());
      let offset = t.getTimezoneOffset() / 60;
      t.setHours(t.getHours() + offset);

      if (t.getHours() > 0) {
        result = `${t.getHours()}${Language.json.Time.hour}${result}`;
      }
      if (full || !result) {
        let minutes = t.getMinutes();
        if (t.getSeconds() > 0) {
          minutes++;
        }
        if (minutes > 0) {
          result = `${result}${minutes}${Language.json.Time.minute}`;
        }
      }
    }
    if (!result) {
      result = `0${Language.json.Time.minute}`;
    }
    return result;
  }
  static IdentityInfo(type: IdentityType) {
    switch (type) {
      case IdentityType.Child:
        return Language.json.Identity.child;
      case IdentityType.Father:
        return Language.json.Identity.father;
      case IdentityType.Mother:
        return Language.json.Identity.mother;
      case IdentityType.MedicalCard:
        return Language.json.Identity.medicalcard;
      case IdentityType.MedicalRecord:
        return Language.json.Identity.medicalrecord;
      default:
        return ''
    }
  }
  static MemberRoleInfo(type: MemberRole) {
    switch (type) {
      case MemberRole.Father:
        return Language.json.MemberRole.father;
      case MemberRole.Mother:
        return Language.json.MemberRole.mother;
      case MemberRole.FatherAndMother:
        return Language.json.MemberRole.fatherandmother;
      case MemberRole.Teacher:
        return Language.json.MemberRole.teacher;
      case MemberRole.Caregiver:
        return Language.json.MemberRole.caregiver;
      case MemberRole.GrandParents:
        return Language.json.MemberRole.grandparents;
      case MemberRole.Other:
        return Language.json.MemberRole.other;
      default:
        return "";
    }
  }
  static EducateDegreeInfo(type: EducateDegree) {
    switch (type) {
      case EducateDegree.Doctor:
        return Language.json.EducateDegree.doctor;
      case EducateDegree.Master:
        return Language.json.EducateDegree.master;
      case EducateDegree.Bachelor:
        return Language.json.EducateDegree.bachelor;
      case EducateDegree.JuniorCollege:
        return Language.json.EducateDegree.juniorcollege;
      case EducateDegree.SeniorHighSchool:
        return Language.json.EducateDegree.seniorhighschool;
      case EducateDegree.JuniorHighSchool:
        return Language.json.EducateDegree.juniorhighschool;
      case EducateDegree.Primary:
        return Language.json.EducateDegree.primary;
      default:
        return "";
    }
  }


  static json = language;
}
