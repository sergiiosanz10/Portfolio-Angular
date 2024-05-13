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
    children: [
      {
        path: '',
        component: ProjectsPageComponent
      },
      {
        path: 'weather',
        loadChildren: () => import('../weather/weather.module').then(m => m.WeatherModule)
      },
      {
        path: 'tasks',
        loadChildren: () => import('../tasks/task.module').then(m => m.TaskModule)
      },
      {
        path: 'countries',
        loadChildren: () => import('../countries/countries/countries.module').then(m => m.CountriesModule)
      },
      {
        path: 'flags',
        loadChildren: () => import('../flags/flags.module').then(m => m.FlagsModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('../maps/maps.module').then(m => m.MapsModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class PortfolioRoutingModule { }
