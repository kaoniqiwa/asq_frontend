import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { PageType } from 'src/app/enum/page-type.enum';
import { QuestType } from 'src/app/enum/quest-type.enum';

@Component({
  selector: 'asq-entry',
  templateUrl: './asq-entry.component.html',
  styleUrls: ['./asq-entry.component.less']
})
export class Asq3EntryComponent implements OnInit {

  pageType: PageType = PageType.dati;
  questType: QuestType = QuestType.ASQ3;
  questMonth: number = 0;
  bid:number = 0;
  mouthArr: any = [2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54,60];
  monthWorkBook :any = null;
  check1 = false;
  check2 = false;
  check3 = false;
  check4 = false;
  source:any = 1;

  helperTopAudio:any = new Audio();
  helperTopAudioStatus:any = false;
  
  constructor(private _sessionStorage: SessionStorageService,private _activeRoute: ActivatedRoute,private _router: Router ,private _toastrService: ToastrService,) { 
    this.monthWorkBook = this._sessionStorage.monthWorkBook;
    this._activeRoute.queryParams.subscribe(params => {
      this.pageType = params['pageType'];
      this.questType = params['questType'];
      this.questMonth = params['questMonth'];
      this.bid = params['bid'];
    })
    this.source = this._sessionStorage.source;
  }

  ngOnInit(): void {
    var that = this;
    this.helperTopAudio.addEventListener("playing", function(){
      that.helperTopAudioStatus = true;
    });
    this.helperTopAudio.addEventListener("pause", function(){
      that.helperTopAudioStatus = false;
    });
  }

  ngOnDestroy():void{
    this.helperTopAudio.pause();
  }

  helperPlay(e:Event){
    if(!this.helperTopAudioStatus){
      this.helperTopAudio.src = 'assets/imgaudio/ASQ-3-audio/start-2.mp3';
      this.helperTopAudio.load();
      this.helperTopAudio.play();
    }else{
      this.helperTopAudio.pause();
    }
    
  }

  gotoQuest(e: Event) {
    e.stopPropagation();
    console.log('this._sessionStorage.questscore_gotoQuest',this._sessionStorage.questscore);
    if(this._sessionStorage.questscore != null){
      this._toastrService.error('不能重复答题，即将跳转到筛查页面！');
      if(this.source!=1){
        this._router.navigate(["/mlogin"])
      }else{
        this._router.navigate(["/neoballoon/neoballoon-manage/baby-add-manage"])
      }
    }else{
      if(this.check1 && this.check2 && this.check3 && this.check4){
        this._router.navigate(["/neoballoon/neoballoon-manage/asq3-question", this.bid], {
          queryParams: {
            pageType: this.pageType,
            questType: this.questType,
            questMonth: this.questMonth,
            bid:this.bid
          }
        })
      }else{
        this._toastrService.warning('请阅读并勾选注意事项。');
      }
    }
    
   
    
  }

  goBack() {
    console.log('asq-entry-goBack');
    window.history.back();
    //history.back();
    //this._router.navigate(["/neoballoon/neoballoon-manage/baby-info-manage"])
  }

}
