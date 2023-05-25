import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Conf from 'src/assets/json/header-nav.json'

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.less']
})
export class HeaderNavComponent implements OnInit {

  models = Conf.data;
  //@ViewChild('menu', { static: false }) menu!: ElementRef;


  constructor() { }

  ngOnInit(): void {
  }

  menuShow(){
    console.log('menuShow',$('#menu').css('display'));
    if($('#menu').css('display') == 'none'){
      $('#menu').show();
    }else{
      $('#menu').hide();
    }
    
  }

}
