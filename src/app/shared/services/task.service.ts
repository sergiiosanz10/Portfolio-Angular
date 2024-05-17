import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid'
import { Task } from '../interfaces/task.interface';
// import { taskType } from '../interfaces/taskType.interface';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  public tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  loadTasks(): void {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  addTask(task: Task): void {
    const newTask: Task = { id: uuid(), ...task }

    this.tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }


  check(id: string | undefined): void {

    const task = this.tasks.find((t: Task) => t.id === id);

    if (task?.check === false) {
      task.check = true;
    } else {
      task!.check = false;
    }

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  block(id: string):void{
    const task = this.tasks.find((t: Task) => t.id === id);

    if (task?.isBlocked === false) {
      task.isBlocked = true;
    } else {
      task!.isBlocked = false;
    }

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  taskModify(id: string, newName: string) {

    const taskModify = this.tasks.findIndex((t: Task) => t.id === id);

    console.log({ newName });



    if (taskModify !== -1) {
      this.tasks[taskModify].name = newName;
    }

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter(Task => Task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}
