import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListComponent } from './components/list/list.component';
import { MainPageComponent } from './pages/main-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [
    MainPageComponent,
    AddTaskComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    TaskRoutingModule
  ],
  exports: [
    MainPageComponent,
  ]
})
export class TaskModule { }
