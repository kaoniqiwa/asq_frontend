import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountComponent } from './account/account.component';
import { BabyAddComponent } from './baby-add/baby-add.component';
import { BabyAgeComponent } from './baby-age/baby-age.component';
import { BabyGameComponent } from './baby-game/baby-game.component';
import { BabyInfoManageComponent } from './baby-info/baby-info-manage.component';
import { BabySettingComponent } from './baby-setting/baby-setting.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { NeoballoonManageComponent } from './neoballoon-manage/neoballoon-manage.component';
import { SelectAccountComponent } from './select-account/select-account.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NeoballoonManageComponent,
    SideNavComponent,
    HeaderNavComponent,
    BabySettingComponent,
    BabyGameComponent,
    BabyAgeComponent,
    SelectAccountComponent,
    AccountComponent,
    AccountInfoComponent,
    BabyAddComponent,
    BabyInfoManageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HowellModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class NeoballoonComponentModule { }
