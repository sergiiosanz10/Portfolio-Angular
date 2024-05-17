import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlagsRoutingModule } from './flags-routing.module';
import { FlagPageComponent } from './pages/flag-page/flag-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ModalComponent } from './components/modal/modal.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { SharedModule } from '../countries/shared/shared.module';
import { FlagsComponent } from './components/flags/flags.component';


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
