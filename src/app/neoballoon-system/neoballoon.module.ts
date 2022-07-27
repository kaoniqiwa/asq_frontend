import { NgModule } from "@angular/core";
import { HowellModule } from "../common/howell.module";
import { NeoballoonManageComponent } from "./components/neoballoon-manage/neoballoon-manage.component";
import { NeoballoonRoutingModule } from "./neoballoon-routing.module";
import { NeoballoonComponent } from "./neoballoon.component";

@NgModule({
  declarations: [NeoballoonComponent, NeoballoonManageComponent],
  imports: [
    NeoballoonRoutingModule,
    HowellModule
  ]
})
export class NeoballoonModule {

}