import { Component, inject, OnInit, signal } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../../../../shared/services/dashboard.service';
import { TaskResponse } from '../../../../../shared/interfaces/taskify.interface';

@Component({
  selector: 'app-tareas-asignadas',
  templateUrl: './tareas-asignadas.component.html',
  styleUrl: './tareas-asignadas.component.css'
})
export class TareasAsignadasComponent implements OnInit {


  private DashboardService = inject(DashboardService);
  private activatedRoute = inject(ActivatedRoute);

  public groupedTasks = signal<Map<string, TaskResponse[]> | undefined>(undefined);
  public tasksList = signal<TaskResponse[]>([]);
  public uniqueColors = signal<string[]>([]);
  public uniqueLabels = signal<string[]>([]);
  public filterParam = signal<string>('');
  public type = signal<string>('');
  public listDate = signal<string[]>([]);
  public isLoading = signal<boolean>(false);


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.type.set(params.type)
      if (this.type() == "all" || this.type() == "pending" || this.type() == "complete") {
        this.filterParam.set('');
        this.loadTasks();
      }
      this.tasksList.set([]);
      this.listDate.set([]);
      this.isLoading.set(true);
    });
  }

  loadTasks() {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.groupedTasks.set(new Map());
    this.DashboardService.getTasks(token)
      .subscribe(tasks => {
        this.tasksList.set(tasks)
        this.groupTasksByDate();
        this.sortTasks();
        this.uniqueColors.set([...new Set(this.tasksList().map(task => task.color))]);
        this.uniqueLabels.set([...new Set(this.tasksList().map(task => task.label))]);
        this.isLoading.set(false);
      });
  }

  groupTasksByDate() {
    //Limpio el Map
    this.groupedTasks.set(new Map());

    //Limpio la lista de fechas
    this.listDate.set([])

    this.tasksList().forEach(task => {
      const date = task.date || '';
      var list = this.getTaskListInTheDay(date);
      if (list.length > 0) {
        this.listDate().push(date);
        this.groupedTasks()?.set(date, list);
      }
    })
  }

  getTaskListInTheDay(date: string) {

    let list = this.tasksList().filter(task => {

      if ((this.type() === "all" || this.type == undefined) && task.date === date) {
        return true;
      } else if (this.type() === "pending" && task.date === date && task.status === false) {
        return true;
      } else if (this.type() === "complete" && task.date === date && task.status === true) {
        return true;
      }
      return false;
    });

    if (this.filterParam() != "") {
      list = list.filter(task => task.label === this.filterParam());
    }
    return list
  }


  deleteTask(id: string) {
    this.isLoading.set(true);
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.DashboardService.deleteTask(id, token)
      .subscribe(() => {
        this.tasksList.set(this.tasksList().filter(task => task.taskId !== id))
        this.groupTasksByDate();
        this.sortTasks();
        this.uniqueColors.set([...new Set(this.tasksList().map(task => task.color))]);
        this.uniqueLabels.set([...new Set(this.tasksList().map(task => task.label))]);
        this.isLoading.set(false);
      });
  }

  modifyTask(task: TaskResponse) {
    const token = sessionStorage.getItem('token');

    if (!token) return;

    this.DashboardService.modifyTask(token, task)
      .subscribe(updatedTask => {
        const index = this.tasksList().findIndex(t => t.taskId === updatedTask.taskId);
        if (index !== -1) {
          this.tasksList()[index] = updatedTask;
          this.groupTasksByDate();
          this.sortTasks();
          this.uniqueColors.set([...new Set(this.tasksList().map(task => task.color))]);
          this.uniqueLabels.set([...new Set(this.tasksList().map(task => task.label))]);
        }
      });
  }


  sortTasks() {
    this.tasksList().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  filterByLabel(label: string) {
    this.isLoading.set(true);
    this.filterParam.set(label)
    this.groupedTasks.set(new Map());
    this.loadTasks();
  }

  actualizarDato(data: TaskResponse[]): void {
    this.tasksList.set(data);
    this.ngOnInit()
  }

}