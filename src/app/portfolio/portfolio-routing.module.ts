import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutmePageComponent } from './pages/aboutme-page/aboutme-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'about',
    component: AboutmePageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'projects',
    component: ProjectsPageComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes)
  ],
  exports: [
    RouterModule
  ],
})
export class PortfolioRoutingModule { }
