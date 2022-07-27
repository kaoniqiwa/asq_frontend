import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HowellModule } from "../common/howell.module";
import { BabyAgeComponent } from "./components/baby-age/baby-age.component";
import { BabyGameComponent } from "./components/baby-game/baby-game.component";
import { BabySettingComponent } from "./components/baby-setting/baby-setting.component";
import { HeaderNavComponent } from "./components/header-nav/header-nav.component";
import { NeoballoonManageComponent } from "./components/neoballoon-manage/neoballoon-manage.component";
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
    BabyAgeComponent
  ],
  imports: [
    CommonModule,
    NeoballoonRoutingModule,
    HowellModule
  ]
})
export class NeoballoonModule {

}