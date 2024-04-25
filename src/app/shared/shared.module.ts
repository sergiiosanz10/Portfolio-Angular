import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadgingSpinerComponent } from './components/loadging-spiner/loadging-spiner.component';
import { RouterModule } from '@angular/router';
import { CustomCursorComponent } from './components/custom-cursor/cursor-component';



@NgModule({
  declarations: [
    NavbarComponent,
    LoadgingSpinerComponent,
    CustomCursorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    LoadgingSpinerComponent,
    CustomCursorComponent
  ]
})
export class SharedModule { }
