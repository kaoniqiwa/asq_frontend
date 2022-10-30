import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { Time } from 'src/app/common/tools/time';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate, getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'baby-info-operate',
  templateUrl: './baby-info-operate.component.html',
  styleUrls: ['./baby-info-operate.component.less']
})
export class BabyLibFormComponent implements OnInit {
  @Output() searchCondition = new EventEmitter<string>();
  @Output() closeEvent = new EventEmitter<string>();

  dateFormat: string = 'yyyy-MM-dd';
  today = new Date();
  doctors:any = null;

  transformDate = (date: Date | string) => {
    return formatDate(date, this.dateFormat, 'en')
  }

  searchInfo: any = {
    BeginTime: this.transformDate(this.today),
    EndTime: this.transformDate(this.today),
    QuestMonth:'',
    Dids: '',
    Status: 3,
  }


  AGE_DATE = [
    2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60
  ]

  

  constructor(private _sessionStorage: SessionStorageService,private _fb: FormBuilder) {
    this.doctors = this._sessionStorage.doctors;
    this.doctors.map(function(item:any,index:any){
      item.Status = false;
    })
  }

  ngOnInit(): void {
  }

  chooseDoctor(e:Event){
    
    let thisIndex:any = (e.target as HTMLInputElement).getAttribute('Index');
    if(this.doctors[thisIndex].Status){
      this.doctors[thisIndex].Status = false;
    }else{
      this.doctors[thisIndex].Status = true;
    }
    this._sessionStorage.doctors = this.doctors;
    let Dids:any = [];
    this.doctors.map(function(item:any,index:any){
      if(item.Status){
        Dids.push(item.Id);
      }
    })
    this.searchInfo.Dids = Dids;
    console.log('chooseDoctor',this.searchInfo);
  }

  changeQuestMonth(e:Event){
    console.log('changeQuestMonth',(e.target as HTMLInputElement).value);
  }

  chooseStatus(e:Event){
    let thisIndex:any = (e.target as HTMLInputElement).getAttribute('Index');
    this.searchInfo.Status = thisIndex;
  }

  onSubmit(){
    this.searchCondition.emit(this.searchInfo);
  }

  reSet(){
    this.doctors.map(function(item:any,index:any){
      item.Status = false;
    })
    this.searchInfo.Dids = '';
    this.searchInfo.Status = 3;
    this.searchInfo.BeginTime = this.transformDate(this.today);
    this.searchInfo.EndTime = this.transformDate(this.today);
    this.searchInfo.QuestMonth = '';


  }

  changeBegin(date: Date) {
    this.searchInfo.BeginTime = this.transformDate(date);
  }
  changeEnd(date: Date) {
    this.searchInfo.EndTime = this.transformDate(date);
  }
}
