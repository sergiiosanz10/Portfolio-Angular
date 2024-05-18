import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { TareasAsignadasComponent } from './components/tasks-list/tareas-asignadas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GestionComponent } from './components/gestion/gestion.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../components/modal/modal.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { AlertComponent } from '../components/alert/alert.component';
import { SideNavComponent } from '../components/side-nav/side-nav.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    TareasAsignadasComponent,
    CalendarioComponent,
    GestionComponent,
    ModalComponent,
    AlertComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,

  ]
})
export class DashboardModule { }
