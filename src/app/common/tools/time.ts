// new Date(time)不影响 time
export class Time {
  // 任意一天的开始时间
  static beginTime(time: Date) {
    return new Date(new Date(time).setHours(0, 0, 0, 0));
  }
  // 任意一天的结束时间
  static endTime(time: Date) {
    return new Date(new Date(time).setHours(23, 59, 59, 999));
  }
  // 后退n天
  static backDate(time: Date, n: number) {
    return new Date(new Date(time).getTime() - n * 24 * 60 * 60 * 1000)
  }
  // 前进n天
  static forwardDate(time: Date, n: number) {
    return new Date(new Date(time).getTime() + n * 24 * 60 * 60 * 1000)

  }
  // 当前日期所在的周
  static curWeek(time: Date, firstDay = 1) {
    let offset = time.getDay() - firstDay;
    let beginTime = Time.beginTime(this.backDate(time, offset));
    let endTime = Time.endTime(Time.forwardDate(beginTime, 6))
    return {
      beginTime,
      endTime
    }
  }
  // 当前日期所在的月
  static curMonth(t: Date) {
    let beginTime = new Date(t.getFullYear(), t.getMonth(), 1, 0, 0, 0, 0);
    let endTime = new Date(t.getFullYear(), t.getMonth() + 1, 1, 0, 0, 0, 0);
    endTime = Time.endTime(Time.backDate(endTime, 1));
    return {
      beginTime,
      endTime
    }
  }
  static diff(start: Date, end: Date) {
    let timer = end.getTime() - start.getTime();

    let secondUnit = 1000;
    let minuteUnit = 60 * secondUnit;
    let hourUnit = 60 * minuteUnit;
    let dayUnit = 24 * hourUnit;
    let monthUnit = 30 * dayUnit;


    let month = Math.floor(timer / monthUnit);
    timer = timer - month * monthUnit;

    let day = Math.floor(timer / dayUnit);
    timer = timer - day * dayUnit;

    let hour = Math.floor(timer / hourUnit);
    timer = timer - hour * hourUnit;

    let minute = Math.floor(timer / minuteUnit);
    timer = timer - minute * minuteUnit;

    let second = Math.floor(timer / secondUnit);

    // console.log(month, day, hour, minute, second);

    return {
      month,
      day,
      hour,
      minute,
      second
    } as TimerDiff

  }
}

export interface TimerDiff {
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number
}