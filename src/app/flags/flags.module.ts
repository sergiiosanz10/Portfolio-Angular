import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlagsRoutingModule } from './flags-routing.module';
import { FlagPageComponent } from './pages/flag-page/flag-page.component';
import { MaterialModule } from '../material/material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FlagsComponent } from './components/flags/flags.component';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    FlagPageComponent,
    NavBarComponent,
    FlagsComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FlagsRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    FlagPageComponent
  ]
})
export class FlagsModule { }
