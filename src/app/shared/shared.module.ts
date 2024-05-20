import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadgingSpinerComponent } from './components/loadging-spiner/loadging-spiner.component';
import { RouterModule } from '@angular/router';
import { CustomCursorComponent } from './components/custom-cursor/cursor.component';
import { SergioSanzComponent } from './components/sergio-sanz/sergio-sanz.component';
import { SkillsIconsComponent } from './components/skills-icons/skills-icons.component';
import { HeaderImageComponent } from './components/header-image/header-image.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LoadgingSpinerComponent,
    CustomCursorComponent,
    SergioSanzComponent,
    SkillsIconsComponent,
    HeaderImageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    LoadgingSpinerComponent,
    CustomCursorComponent,
    SergioSanzComponent,
    SkillsIconsComponent,
    HeaderImageComponent
  ]
})
export class SharedModule { }
