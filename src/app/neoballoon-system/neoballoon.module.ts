import { NgModule } from "@angular/core";
import { NeoballoonComponentModule } from "./components/neoballoon-component.module";
import { NeoballoonRoutingModule } from "./neoballoon-routing.module";
import { NeoballoonComponent } from "./neoballoon.component";

@NgModule({
  declarations: [
    NeoballoonComponent,

  ],
  imports: [
    NeoballoonComponentModule,
    NeoballoonRoutingModule,
  ]
})
export class NeoballoonModule {

}