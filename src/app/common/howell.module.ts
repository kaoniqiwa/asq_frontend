import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { CUSTOM_COMPONENTS } from "./components";
import { CUSTOM_DIRECTIVES } from "./directive";
import { CUSTOM_PIPES } from "./pipes";

@NgModule({
  declarations: [
    ...CUSTOM_COMPONENTS,
    ...CUSTOM_DIRECTIVES,
    ...CUSTOM_PIPES
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [...CUSTOM_COMPONENTS, ...CUSTOM_DIRECTIVES, ...CUSTOM_PIPES]
})
export class HowellModule {

}