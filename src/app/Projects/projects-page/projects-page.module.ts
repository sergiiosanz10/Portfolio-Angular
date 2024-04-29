import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsPageRoutingModule } from './projects-page-routing.module';
import { MaterialModule } from '../../material/material.module';
import { ProjectsPageComponent } from './projects-page.component';


@NgModule({
  declarations: [
    ProjectsPageComponent
  ],
  imports: [
    CommonModule,
    ProjectsPageRoutingModule,
    MaterialModule
  ]
})
export class ProjectsPageModule { }
