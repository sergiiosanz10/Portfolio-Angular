import { Component, Input } from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import { taskType } from '../../../shared/interfaces/taskType.interface';
import { Task } from '../../../shared/interfaces/task.interface';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  constructor(private taskService: TaskService) {

    this.taskTypes = [taskType.Todas, taskType.Completadas, taskType.Pendientes, taskType.Bloqueadas ]

  }

  get tasks(): Task[] {
    return this.taskService.tasks;
  }


  // @Input()
  // taskTypes: number[]

  @Input()
  taskTypes: taskType[]


  onDeleteTask(id: string): void {
    this.taskService.deleteTaskById(id);
  }

  check(id: string): void {
    this.taskService.check(id);
  }

  modify(id: string, newName: string): void {
    this.taskService.taskModify(id, newName);
  }

  onNewTask(Task: Task) {
    this.taskService.addTask(Task);
  }

}
