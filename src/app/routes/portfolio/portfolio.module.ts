import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutmePageComponent } from './pages/aboutme-page/aboutme-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../countries/shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';




@NgModule({
  declarations: [
    AboutmePageComponent,
    ContactPageComponent,
    ProjectsPageComponent,
    HomePageComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    PortfolioRoutingModule,
    MatCardModule

  ]
})
export class PortfolioModule { }
