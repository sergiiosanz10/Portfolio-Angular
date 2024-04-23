import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadgingSpinerComponent } from './components/loadging-spiner/loadging-spiner.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    LoadgingSpinerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    LoadgingSpinerComponent
  ]
})
export class SharedModule { }
