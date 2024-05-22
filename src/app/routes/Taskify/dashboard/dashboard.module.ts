import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { TareasAsignadasComponent } from './components/tasks-list/tareas-asignadas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GestionComponent } from './components/gestion/gestion.component';
import { RouterModule } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { SharedModule } from '../../../shared/shared.module';
import { SideNavComponent } from '../shared/components/side-nav/side-nav.component';
import { ModalComponent } from '../shared/components/modal/modal.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    TareasAsignadasComponent,
    CalendarioComponent,
    GestionComponent,
    ModalComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    SharedModule
  ]
})
export class DashboardModule { }
