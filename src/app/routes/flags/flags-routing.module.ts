import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlagPageComponent } from './pages/flag-page/flag-page.component';

const routes: Routes = [
  {
    path: '',
    component: FlagPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlagsRoutingModule { }
