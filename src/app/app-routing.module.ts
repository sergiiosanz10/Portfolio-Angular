import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'portfolio',
    loadChildren: () => import('./routes/portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  {
    path: '',
    redirectTo: 'portfolio',
    pathMatch: 'full'
  },
  {
    path:'**',
    loadComponent: () => import('./shared/components/error404/error404.component').then(m => m.Error404Component)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableViewTransitions: true, })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
