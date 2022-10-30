import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  // 当前时间
  today = new Date();

  @Input() disabled = false;
  
  // 年月日提示文字
  @Input() titleYear = "年";
  @Input() titleMonth = "月";
  @Input() titleDay = "日";

  // 年份范围
  @Input() startYear = 2010;
  @Input() endYear = this.today.getFullYear();


  // 默认日期
  private _year = this.today.getFullYear();
  @Input()
  set year(year: number) {
    this._year = year;
    this.month = 1;
  }
  get year() {
    return this._year;
  }

  private _month = this.today.getMonth() + 1;
  @Input()
  set month(month: number) {
    this._month = month;

    this.date = 1;
    this._generateDate();
  }
  get month() {
    return this._month;
  }

  private _date = this.today.getDate();
  @Input()
  set date(date: number) {
    this._date = date;
  }
  get date() {
    return this._date;
  }

  @Output() pickerChange = new EventEmitter();

  @ViewChild('yearEle') yearEle!: ElementRef<HTMLSelectElement>;
  @ViewChild('monthEle') monthEle!: ElementRef<HTMLSelectElement>;
  @ViewChild('dateEle') dateEle!: ElementRef<HTMLSelectElement>;


  // 数据源
  yearSource: number[] = [];
  monthSource: number[] = [];
  dateSource: number[] = [];


  // 每个月份有几天
  monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // 当前月份有几天
  monthNum = 0;



  constructor() { }

  ngOnInit(): void {

    if (this.startYear > this.endYear) {
      this.startYear = this.startYear ^ this.endYear;
      this.endYear = this.startYear ^ this.endYear;
      this.startYear = this.startYear ^ this.endYear;
    }

    for (let i = this.startYear; i <= this.endYear; i++) {
      this.yearSource.push(i);
    }
    this.yearSource.reverse();
    for (let i = 1; i <= 12; i++) {
      this.monthSource.push(i);
    }
    this._generateDate();

  }
  changeHandler() {
    let { year, month, date } = this;
    this.pickerChange.emit({
      year,
      month,
      date
    } as DatePickerModel)
  }

  private _generateDate() {

    this.monthNum = this.monthDays[this.month - 1];

    if (this.month == 2 && this._isLeapYear(this.year)) {
      this.monthNum++;
    }
    this.dateSource = Array.from(
      Array(this.monthNum),
      (v, i) => i + 1
    )
  }
  private _isLeapYear(year: number) {
    return year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)
  }
}

export interface DatePickerModel {
  year: number;
  month: number;
  date: number;
}