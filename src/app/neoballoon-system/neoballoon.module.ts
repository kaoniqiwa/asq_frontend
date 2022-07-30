import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HowellModule } from "../common/howell.module";
import { AccountInfoComponent } from "./components/account-info/account-info.component";
import { AccountComponent } from "./components/account/account.component";
import { BabyAgeComponent } from "./components/baby-age/baby-age.component";
import { BabyGameComponent } from "./components/baby-game/baby-game.component";
import { BabySettingComponent } from "./components/baby-setting/baby-setting.component";
import { HeaderNavComponent } from "./components/header-nav/header-nav.component";
import { NeoballoonManageComponent } from "./components/neoballoon-manage/neoballoon-manage.component";
import { SelectAccountComponent } from "./components/select-account/select-account.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { NeoballoonRoutingModule } from "./neoballoon-routing.module";
import { NeoballoonComponent } from "./neoballoon.component";

@NgModule({
  declarations: [
    NeoballoonComponent,
    NeoballoonManageComponent,
    SideNavComponent,
    HeaderNavComponent,
    BabySettingComponent,
    BabyGameComponent,
    BabyAgeComponent,
    SelectAccountComponent,
    AccountComponent,
    AccountInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NeoballoonRoutingModule,
    HowellModule
  ]
})
export class NeoballoonModule {

}