import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_COMPONENTS } from "./components";
import { CUSTOM_DIRECTIVES } from "./directive";

@NgModule({
  declarations: [
    ...CUSTOM_COMPONENTS,
    ...CUSTOM_DIRECTIVES
  ],
  imports: [
    ReactiveFormsModule
  ],
  exports: [...CUSTOM_COMPONENTS, ...CUSTOM_DIRECTIVES]
})
export class HowellModule {

}