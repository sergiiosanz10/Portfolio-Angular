import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'portfolio',
    loadChildren: () => import('./Projects/portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./Projects/projects-page/projects-page.module').then(m => m.ProjectsPageModule)
  },
  {
    path: 'weather',
    loadChildren: () => import('./Projects/weather/weather.module').then(m => m.WeatherModule)
  },
  {
    path: '**',
    redirectTo: 'portfolio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
