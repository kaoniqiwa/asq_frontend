import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoutePath } from './enum/route-path.enum';
import { LoginComponent } from './login/login/login.component';
import { Asq3printComponent } from './print/asq3print/asq3print.component';
import { AuthorizationService } from './network/auth/auth-request.service';

const routes: Routes = [
  {
    path: "",
    redirectTo: RoutePath.login,
    pathMatch: 'full'
  },
  {
    path: RoutePath.login,
    component: LoginComponent
  },
  {
    path: RoutePath.asq3print,
    component: Asq3printComponent
  },
  {
    path: RoutePath.neoballoon,
    loadChildren: () =>
      import('./neoballoon-system/neoballoon.module').then((mod) => mod.NeoballoonModule),
    canActivate: [AuthorizationService],
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
