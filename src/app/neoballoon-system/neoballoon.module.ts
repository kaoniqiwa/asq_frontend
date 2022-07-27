import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HowellModule } from "../common/howell.module";
import { HeaderNavComponent } from "./components/header-nav/header-nav.component";
import { NeoballoonManageComponent } from "./components/neoballoon-manage/neoballoon-manage.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { NeoballoonRoutingModule } from "./neoballoon-routing.module";
import { NeoballoonComponent } from "./neoballoon.component";

@NgModule({
  declarations: [NeoballoonComponent,
    NeoballoonManageComponent,
    SideNavComponent,
    HeaderNavComponent],
  imports: [
    CommonModule,
    NeoballoonRoutingModule,
    HowellModule
  ]
})
export class NeoballoonModule {

}